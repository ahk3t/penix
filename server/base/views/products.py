from rest_framework.response import Response
from rest_framework.views import APIView

from base.models.products import Product, TurnoverMember


class TurnoverMemberList(APIView):
    def get(self, request):
        members = TurnoverMember.objects.all()[:10]
        return Response(members.values())
