from rest_framework.routers import DefaultRouter
from . import views


app_name = "qnaboards"


router = DefaultRouter()
router.register("", views.QnaBoardViewSet)

urlpatterns = router.urls
