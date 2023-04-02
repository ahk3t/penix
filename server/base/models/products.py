from django.db.models import CASCADE
from rest_framework.views import models
from rest_framework.views import models


class TurnoverMember(models.Model):
    inn = models.CharField(max_length=64, primary_key=True)
    region_code = models.IntegerField()


class Product(models.Model):
    class Meta:
        unique_together = (("gtin", "inn"),)

    gtin = models.CharField(max_length=64)
    inn = models.ForeignKey(to=TurnoverMember, on_delete=CASCADE, db_column="inn")
    product_name = models.CharField(max_length=64)
    product_short_name = models.CharField(max_length=64)
    tnved = models.CharField(max_length=64)
    tnved10 = models.CharField(max_length=64)
    brand = models.CharField(max_length=64)
    country = models.CharField(max_length=64, null=True, blank=True)
    volume = models.DecimalField(
        max_digits=32, decimal_places=12, null=True, blank=True
    )


class SalePoint(models.Model):
    id_sp = models.CharField(max_length=64, primary_key=True)
    inn = models.ForeignKey(to=TurnoverMember, on_delete=CASCADE, db_column="inn")
    region_code = models.IntegerField()
    city_with_type = models.CharField(max_length=64, null=True, blank=True)
    city_fias_id = models.CharField(max_length=64, null=True, blank=True)
    postal_code = models.IntegerField(null=True, blank=True)


class ProductIntro(models.Model):
    dt = models.DateField()
    inn = models.ForeignKey(
        to=TurnoverMember, on_delete=CASCADE, related_name="intro_inn", db_column="inn"
    )
    gtin = models.CharField(max_length=64)
    prid = models.ForeignKey(
        to=TurnoverMember,
        on_delete=CASCADE,
        related_name="intro_prid",
        db_column="prid",
    )
    operation_type = models.CharField(max_length=64)
    cnt = models.IntegerField()


class ProductMovement(models.Model):
    dt = models.DateField()
    gtin = models.CharField(max_length=64)
    prid = models.ForeignKey(
        to=TurnoverMember,
        on_delete=CASCADE,
        related_name="movement_prid",
        db_column="prid",
    )
    sender_inn = models.ForeignKey(
        to=TurnoverMember,
        on_delete=CASCADE,
        related_name="movement_sender",
        db_column="sender_inn",
    )
    receiver_inn = models.ForeignKey(
        to=TurnoverMember,
        on_delete=CASCADE,
        related_name="movement_receiver",
        db_column="receiver_inn",
    )
    cnt_moved = models.IntegerField()


class ProductWithdrawal(models.Model):
    dt = models.DateField()
    gtin = models.CharField(max_length=64)
    prid = models.ForeignKey(
        to=TurnoverMember,
        on_delete=CASCADE,
        related_name="withdrawal_prid",
        db_column="prid",
    )
    inn = models.ForeignKey(
        to=TurnoverMember,
        on_delete=CASCADE,
        related_name="withdrawal_inn",
        db_column="inn",
    )
    id_sp = models.ForeignKey(
        to=SalePoint, on_delete=CASCADE, db_column="id_sp", null=True, blank=True
    )
    type_operation = models.CharField(max_length=128)
    price = models.DecimalField(max_digits=32, decimal_places=12)
    cnt = models.IntegerField()


# Промежуточный подсчет
class Prospect(models.Model):
    inn = models.ForeignKey(
        to=TurnoverMember,
        on_delete=CASCADE,
        related_name="prospect_inn",
        db_column="inn",
    )
    prospect_factor = models.DecimalField(max_digits=32, decimal_places=12)


class Scam(models.Model):
    inn = models.ForeignKey(
        to=TurnoverMember,
        on_delete=CASCADE,
        related_name="scam_inn",
        db_column="inn",
    )
    quality_factor = models.DecimalField(max_digits=32, decimal_places=12)
