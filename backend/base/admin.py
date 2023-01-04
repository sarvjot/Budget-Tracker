from django.contrib import admin

# Register your models here.

from .models import Transaction, FriendshipKey

admin.site.register(Transaction)
admin.site.register(FriendshipKey)
