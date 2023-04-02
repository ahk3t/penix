from django_filters import NumberFilter, FilterSet, CharFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import models

from base.models.products import SalePoint


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 1000


class MemberFilterSet(FilterSet):
    location_region_code = NumberFilter(field_name="region_code")
    register_region_code = NumberFilter(field_name="inn__region_code")
    inn = CharFilter(field_name="inn", lookup_expr="inn__icontains")

    class Meta:
        model = SalePoint
        exclude = ["region_code"]
        filter_overrides = {
            models.CharField: {
                "filter_class": CharFilter,
                "extra": lambda f: {
                    "lookup_expr": "icontains",
                },
            },
        }
