from rest_framework.serializers import ValidationError
from base.exceptions import HttpException


class SafeModelMixin:
    @classmethod
    def get_by_pk(cls, pk):
        try:
            return cls.objects.get(pk=pk)
        except cls.DoesNotExist as error:
            raise HttpException(error, 404)

    def validate(self):
        try:
            self.full_clean()
        except ValidationError as error:
            raise HttpException(dict(error), 400)
