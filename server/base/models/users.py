from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

from base.managers import EmailUserManager
from base.utils import SafeModelMixin
from base.validators import password_validator


class User(AbstractUser, SafeModelMixin):
    name = models.CharField(max_length=128, null=True, blank=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128, validators=[password_validator])
    last_login = models.DateTimeField(default=timezone.now, blank=True)
    is_admin = models.BooleanField(default=False)
    is_manager = models.BooleanField(default=False)
    username = None
    first_name = None
    last_name = None
    date_joined = None
    is_staff = None
    is_active = None
    is_superuser = None
    groups = None
    user_permissions = None

    objects = EmailUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        ordering = ["id"]

    @property
    def is_active(self):
        return True

    def update_last_login(self):
        self.last_login = timezone.now()
        self.save()
