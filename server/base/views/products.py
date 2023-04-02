from django.db.models import Q
from django.forms import model_to_dict
from rest_framework.response import Response
from rest_framework.views import APIView
import csv
import pandas as pd
from prophet import Prophet

from base.exceptions import HttpException
from base.filters import MemberFilterSet, StandardResultsSetPagination
from base.models.products import Product, ProductWithdrawal, SalePoint, TurnoverMember
from base.serializers.products import MemberSerializer, MemberSerializerWithFuture


class MemberList(APIView, StandardResultsSetPagination):
    def get(self, request):
        inn = request.GET.get("inn", None)
        city_with_type = request.GET.get("city_with_type", None)
        qs = SalePoint.objects.select_related("inn").filter(
            (Q(inn__inn__icontains=inn) if inn else Q())
            | (Q(city_with_type__icontains=city_with_type) if city_with_type else Q())
        )
        page = self.paginate_queryset(qs, request, view=self)
        serializer = MemberSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)


class MemberDetail(APIView):
    def get(self, request, pk):
        try:
            point = SalePoint.objects.select_related("inn").get(pk=pk)
        except SalePoint.DoesNotExist as error:
            raise HttpException(error, 404)
        serializer = MemberSerializerWithFuture(point)
        return Response(serializer.data)


# Используется для подсчета коэффициентов
class EstimateRating(APIView):
    def get(self, request, pk):
        products = pd.read_csv('/content/drive/MyDrive/Справочник продукции.csv')
        output_products = pd.read_csv('/content/drive/MyDrive/Данные о выводе товаров из оборота с 2021-11-22 по 2022-11-21.csv', nrows=25_000_000)

        output_products['y'] = output_products['price'] * output_products['cnt']
        output_products['brand'] = output_products.merge(products, on=['inn', 'gtin'])['brand']

        outs_series = output_products.sort_values(by='dt').groupby(['inn', 'dt']).agg({'y': 'sum'})

        sales_per_month = output_products.loc[output_products['dt'].str.contains(r'2021-11')].groupby(['inn', 'brand']).agg({'y': 'sum'})
        sales_pm_brand = sales_per_month.loc[(slice(None), bn), :]

        headerList = ['INN', 'Gtin', 'Perspectives', 'Brands for share', 'Shares', 'Rating']
        with open('../../.data/perspectives.csv', 'w', newline='') as csvfile:
            writer = csv.writer(csvfile, delimiter=';',
                                quotechar='|', quoting=csv.QUOTE_MINIMAL)
            writer.writerow(headerList)
            for inn, gtin in output_products[['inn', 'gtin']].values:
                y_tr = outs_series.loc[inn]
                y_tr = y_tr[(y_tr > 0).values]
                y_t = pd.DataFrame()
                y_t['ds'] = y_tr.index
                y_t['y'] = y_tr['y'].values
                m = Prophet(seasonality_mode='multiplicative')
                m.fit(y_t)
                future = m.make_future_dataframe(periods=100, freq='D')
                future['cap'] = 20
                fcst = m.predict(future)
                sh = fcst['trend'][0]
                perspectives = fcst['trend'] + (fcst['yhat_upper'] - sh)
                bn = output_products.loc[output_products['gtin']==gtin].loc[output_products['inn']==inn]['brand']
                sales_per_month = output_products.loc[output_products['dt'].str.contains(r'2021-11')].groupby(['inn', 'brand']).agg({'y': 'sum'})
                sales_pm_brand = sales_per_month.loc[(slice(None), bn), :]
                shares = sales_pm_brand.loc[inn] / sales_per_month.sum()
                rating = 60 + ((list(perspectives.values)[1] - list(perspectives.values)[0]) / list(perspectives.values)[1]) * 20
                rating = max(35, rating)
                rating = min(95, rating)
                writer.writerow([inn, gtin,
                                 list(perspectives.values),
                                 list(shares.index),
                                 list(shares.values * 100), rating])
        return Response("ok")


class EstimateScam(APIView):
    def get(self, request, pk):
        outlets = pd.read_csv('/content/drive/MyDrive/Копия Справочник торговых точек.csv')
        turn_of_goods = pd.read_csv('/content/drive/MyDrive/Копия Справочник участников оборота товаров.csv')
        input_products = pd.read_csv('/content/drive/MyDrive/Копия Данные о вводе товаров в оборот с 2021-11-22 по 2022-11-21.csv', nrows=5000)
        output_products = pd.read_csv('/content/drive/MyDrive/Данные о выводе товаров из оборота с 2021-11-22 по 2022-11-21.csv', nrows=5000)
        transport_products = pd.read_csv('/content/drive/MyDrive/Данные о перемещениях товаров между участниками с 2021-11-22 по 2022-11-21.csv', nrows=5000)


        # Словарь с каждым товаром
        product_count = {}
        for index, row in input_products.iterrows():
            product_count[row['gtin']] = row['cnt']
            
        counterfeit_products = pd.DataFrame(columns=['dt', 'prid', 'sender', 'receiver', 'quantity'])
        # Перебор всех товаров
        for index, row in transport_products[~transport_products['receiver_inn'].isin(outlets['inn'])][transport_products['prid'] != transport_products['sender_inn']].iterrows():
            sender = row['sender_inn']
            receiver = row['receiver_inn']
            product = row['gtin']
            quantity = row['cnt_moved']
            dt = row['dt']
            
            # Если отправитель не является производителем или получатель не является розничным продавцом, то перемещение может быть подозрительным
            if product in product_count:
                # Если товар в введен, то вычитаем его
                product_count[product] -= quantity
                if product_count[product] < 0:
                    counterfeit_products.loc[len(counterfeit_products.index)] = [dt, product, sender, receiver, quantity]



                    input_products["dt"] = pd.to_datetime(input_products["dt"])
        transport_products["dt"] = pd.to_datetime(transport_products["dt"])
        output_products["dt"] = pd.to_datetime(output_products["dt"])

        distr_data = pd.merge(input_products, transport_products, on=['gtin', 'prid'])
        distr_data = distr_data[distr_data['operation_type'] == 'РФ']
        # удаляем продажи в ТТ
        distr_data = distr_data[~distr_data['receiver_inn'].isin(outlets['inn'])]
        # удаляем производителей
        distr_data = distr_data[distr_data['prid'] != distr_data['sender_inn']]
        distr_data['storage_time'] = distr_data['dt_x'] - distr_data['dt_y']
        distr_data['storage_time'].value_counts()



        distr_data['dt_y'] = pd.to_datetime(distr_data["dt_y"])

        distr_data.set_index('dt_y', inplace=True)
        mean_distr_data_year = distr_data.groupby([pd.Grouper(freq='12M'), 'inn','gtin']).agg({'storage_time': 'mean'})
        distr_data = distr_data.groupby([pd.Grouper(freq='3M'), 'inn','gtin']).agg({'storage_time': 'sum'})

        distr_data = distr_data.reset_index()
        mean_distr_data_year = mean_distr_data_year.reset_index()

        distr_data = pd.merge(distr_data, mean_distr_data_year, on=['inn','gtin'])
        distr_data['percent_storage_time_3m_1y'] = distr_data['storage_time_x'] / distr_data['storage_time_y']

        outlets_transport_products_info = pd.DataFrame()
        outlets_transport = transport_products[transport_products['receiver_inn'].isin(outlets['inn'])]

        outlets_transport_products_info = pd.merge(outlets_transport, products, left_on=['gtin', 'prid'], right_on=['gtin', 'inn'])
        outlets_transport_products_info = pd.merge(outlets_transport_products_info, turn_of_goods, left_on=['sender_inn'], right_on=['inn'])

        outlets_transport_products_info['dt'] = pd.to_datetime(outlets_transport_products_info["dt"])

        outlets_transport_products_info.set_index('dt', inplace=True)
        mean_sales_distr_year = outlets_transport_products_info.groupby([pd.Grouper(freq='12M'), 'sender_inn','region_code']).agg({'cnt_moved': 'mean'})
        outlets_transport_products_info = outlets_transport_products_info.groupby([pd.Grouper(freq='3M'), 'sender_inn','region_code']).agg({'cnt_moved': 'sum'})

        outlets_transport_products_info = outlets_transport_products_info.reset_index()
        mean_sales_distr_year = mean_sales_distr_year.reset_index()

        outlets_transport_products_info = pd.merge(outlets_transport_products_info, mean_sales_distr_year, on=['sender_inn', 'region_code']).drop(columns='dt_y')

        outlets_transport_products_info['percent_sale_3m_1y'] = outlets_transport_products_info['cnt_moved_x'] / outlets_transport_products_info['cnt_moved_y'] 


        distr_returns = input_products[input_products['operation_type'] == 'Возврат']
        distr_returns = distr_returns[~distr_returns['inn'].isin(outlets['inn'])]
        # удаляем производителей
        # distr_returns = distr_returns[distr_returns['prid'] != distr_returns['inn']]

        distr_returns['dt'] = pd.to_datetime(distr_returns["dt"])

        distr_returns.set_index('dt', inplace=True)
        mean_returns_distr_year = distr_returns.groupby([pd.Grouper(freq='12M'), 'inn','prid']).agg({'cnt': 'mean'})
        distr_returns = distr_returns.groupby([pd.Grouper(freq='3M'), 'inn','prid']).agg({'cnt': 'sum'})
        distr_returns = pd.merge(distr_returns, mean_returns_distr_year, on=['dt', 'inn', 'prid'])
        distr_returns = distr_returns.reset_index()
        distr_returns['percent_returns_3m_1y'] = distr_returns['cnt_x'] / distr_returns['cnt_y']


        distr_returns = distr_returns[['dt', 'inn', 'percent_returns_3m_1y']]
        distr_returns.head()

        counterfeit_products = counterfeit_products[['dt_x', 'sender', 'percent_counterfeit_products_3m_1y']]
        counterfeit_products.rename(columns = {'sender': 'inn', 'dt_x': 'dt'}, inplace=True)

        counterfeit_products.head()


        outlets_transport_products_info = outlets_transport_products_info.groupby(['dt_x', 'sender_inn']).agg({'percent_sale_3m_1y': 'mean'})
        outlets_transport_products_info = outlets_transport_products_info.reset_index()
        outlets_transport_products_info.rename(columns = {'sender_inn': 'inn', 'dt_x': 'dt'}, inplace=True)
        outlets_transport_products_info.head()

        distr_data = distr_data[['dt_y_y', 'inn', 'percent_storage_time_3m_1y']]
        distr_data.rename(columns = {'dt_y_y': 'dt'}, inplace=True)
        distr_data.head()

        finally_data = pd.DataFrame()
        finally_data = transport_products[['dt', 'sender_inn', 'receiver_inn', 'prid']]
        # удаляем продажи в ТТ
        finally_data = finally_data[~finally_data['receiver_inn'].isin(outlets['inn'])]
        # удаляем производителей
        finally_data = finally_data[finally_data['prid'] != finally_data['sender_inn']]
        finally_data.rename(columns = {'sender_inn': 'inn'}, inplace=True)



        coef_returns = 0.2
        coef_share_sales = 0.3
        coef_time_stock = 0.2
        coef_nan_sales = 0.3


        finally_data = pd.concat([distr_returns, counterfeit_products], ignore_index=True)
        finally_data = pd.concat([finally_data, outlets_transport_products_info], ignore_index=True)
        finally_data = pd.concat([finally_data, distr_data], ignore_index=True)
        finally_data = finally_data.groupby('inn').sum()
        finally_data['result'] = coef_returns * finally_data['percent_returns_3m_1y'] + coef_share_sales * finally_data['percent_sale_3m_1y'] \
                                + coef_time_stock * finally_data['percent_storage_time_3m_1y'] + coef_nan_sales * finally_data['percent_counterfeit_products_3m_1y']


        finally_data = finally_data.reset_index()
        finally_data = finally_data[['inn', 'result']].sort_values(by='result', ascending=False)
        finally_data

        return Response("ok")
