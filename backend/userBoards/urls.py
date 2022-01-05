from rest_framework.routers import DefaultRouter
from . import views


app_name = "userboards"


router = DefaultRouter()
router.register("", views.UserBoardViewSet)

urlpatterns = router.urls
