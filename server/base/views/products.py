from django.forms import model_to_dict
from rest_framework.response import Response
from rest_framework.views import APIView

from base.exceptions import HttpException
from base.filters import MemberFilterSet, StandardResultsSetPagination
from base.models.products import Product, SalePoint, TurnoverMember
from base.serializers.products import MemberSerializer


class MemberList(APIView, StandardResultsSetPagination):
    def get(self, request):
        qs = SalePoint.objects.select_related("inn")
        qs = MemberFilterSet(request.GET, qs).qs
        page = self.paginate_queryset(qs, request, view=self)
        serializer = MemberSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)


class MemberDetail(APIView):
    def get(self, request, pk):
        try:
            point = SalePoint.objects.select_related("inn").get(pk=pk)
        except SalePoint.DoesNotExist as error:
            raise HttpException(error, 404)
        serializer = MemberSerializer(point)
        return Response(serializer.data)
