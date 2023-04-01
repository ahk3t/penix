from django.urls import path
from base.views import products

urlpatterns = [
    # path("register", auth.register),
    # path("login", auth.login),
    # path("logout", auth.logout),
    # path("tokens/refresh", auth.refresh_tokens),
    #
    # path("users", user.UserList.as_view()),
    # path("users/<int:id>", user.UserDetail.as_view()),
    # path("users/authenticated", user.AuthenticatedUserDetail.as_view()),

    path("members", products.TurnoverMemberList.as_view()),
]
