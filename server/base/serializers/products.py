from rest_framework import serializers
import pandas as pd
from prophet import Prophet
from rest_framework.views import Response

from base.models.products import ProductWithdrawal, Prospect, SalePoint, Scam, TurnoverMember


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalePoint
        exclude=["region_code"]

    location_region_code = serializers.SerializerMethodField()
    register_region_code = serializers.SerializerMethodField()

    def get_location_region_code(self, point):
        return point.region_code

    def get_register_region_code(self, point):
        return point.inn.region_code


class MemberSerializerWithFuture(MemberSerializer):
    Meta = MemberSerializer.Meta

    future = serializers.SerializerMethodField()
    quality_factor = serializers.SerializerMethodField()
    prospect_factor = serializers.SerializerMethodField()

    def get_future(self, point):
        qs = ProductWithdrawal.objects.filter(inn=point.inn.inn)
        output_products = pd.DataFrame.from_records(qs.values())
        output_products["y"] = output_products["price"] * output_products["cnt"]
        y_tr = output_products.sort_values(by="dt").groupby(["dt"]).agg({"y": "sum"})

        y_tr = y_tr[(y_tr > 0).values]
        y_t = pd.DataFrame()
        y_t["ds"] = y_tr.index
        y_t["y"] = y_tr["y"].values

        m = Prophet(seasonality_mode="multiplicative")
        m.fit(y_t)
        future = m.make_future_dataframe(periods=100, freq="D")
        future["cap"] = 20
        fcst = m.predict(future)

        fcst["ds"] = pd.to_datetime(fcst['ds']).dt.date

        return fcst[["ds", "trend"]].to_dict(orient="records")

    def get_quality_factor(self, point):
        return Scam.objects.get(inn=point.inn.inn)

    def get_prospect_factor(self, point):
        return Prospect.objects.get(inn=point.inn.inn)
