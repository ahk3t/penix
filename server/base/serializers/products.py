from rest_framework import serializers

from base.models.products import SalePoint, TurnoverMember


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
