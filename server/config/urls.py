from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
import debug_toolbar
from sqlalchemy.engine import url


urlpatterns = [
    path("api/", include("base.urls")),
    path("__debug__/", include(debug_toolbar.urls)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# if settings.DEBUG:
#     urlpatterns += [
#     ]
