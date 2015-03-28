#coding=utf-8
from django.conf.urls import patterns, include, url
# from django.contrib import admin
from dlnubuy import urls
import os

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'dlnuFHX.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'', include('dlnubuy.urls')),
)

static_dir = os.path.join(os.path.dirname(__file__))

urlpatterns += patterns('',
         (r'^static/(?P<path>.*)$','django.views.static.serve',{'document_root':static_dir}),
)
