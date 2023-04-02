from django.db.models import Q
from django.forms import model_to_dict
from rest_framework.response import Response
from rest_framework.views import APIView

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
