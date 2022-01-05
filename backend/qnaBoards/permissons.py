from rest_framework.permissions import BasePermission


class IsWriter(BasePermission):
    def has_object_permission(self, request, view, post):

        return post.writer == request.user
