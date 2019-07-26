#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.contrib import admin
from django.contrib.admin import AdminSite
from django.http import HttpResponse
from django.conf.urls import url, include
# Register your models here.
from .models import *
from .views import *
from django.contrib.auth.models import User
from functools import update_wrapper
admin.autodiscover()


class UserAdmin(admin.ModelAdmin):

    list_display = ('username', 'email', 'is_active',
                    'is_staff', 'is_superuser')

    def get_urls(self):
        # this is just a copy paste from the admin code
        def wrap(view):
            def wrapper(*args, **kwargs):
                return self.admin_site.admin_view(view)(*args, **kwargs)
            return update_wrapper(wrapper, view)
        # get the default urls
        urls = super(UserAdmin, self).get_urls()

        # define my own urls

        urlpatterns = [
            url(r'^inactive/$', wrap(self.changelist_view),
                name="inactive_users")
        ]

        # return the complete list of urls
        return urlpatterns + urls

    def get_changelist(self, request):
        """
        This method must return the view to be used for listing the model
        """
        # for inactive users use the InactiveUsersView
        if request.resolver_match.url_name == "inactive_users":
            return InactiveUsersView
        return super(UserAdmin, self).get_changelist(request)


class PersonaAdmin(admin.ModelAdmin):
    # TODO: Consultar por que filtro desea buscar?
    search_fields = ('nombre', 'apellido', 'cedula', )
    list_filter = ('estado_civil', 'sexo')
    list_display = ('nombre', 'apellido', 'cedula')
    list_display_links = ('nombre', 'apellido', 'cedula')


class MyAdminSite(AdminSite):

    def custom_view(self, request):
        return HttpResponse("Test")

    def get_urls(self):
        from django.conf.urls import url
        urls = super(MyAdminSite, self).get_urls()
        urls += [
            url(r'^custom_view/$', self.admin_view(self.custom_view))
        ]
        return urls


admin_site = MyAdminSite()
@admin.register(JuntaComunal, site=admin_site)
class JuntaComunalAdmin(admin.ModelAdmin):
    list_display = ('nombre',)


admin.site.site_header = 'Administración'
admin.site.site_title = 'Coffeehouse admin'
admin.site.site_url = 'http://coffeehouse.com/'
admin.site.index_title = 'Coffeehouse administration'
admin.empty_value_display = '**Empty**'

# admin.site.register(JuntaComunal)
admin.site.register(Persona, PersonaAdmin)
# admin.site.register(Atributo)
# admin.site.register(AtributoAPersona)
# admin.site.register(Profile)
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
