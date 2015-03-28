#coding=utf-8
from django.conf.urls import patterns, include, url
import os

urlpatterns = patterns('dlnubuy.views',
       url(r'^$', "index"),
       url(r'^index.html', "index"),
       url(r'^product_list.html', "product_list"),
       url(r'^product.html', "product"),
       url(r'^register.html', "register"),
       url(r'^login.html',"login"),
       url(r'^users.html', "users")
)
urlpatterns += patterns('dlnubuy.ajax_views',
       url(r'^ajax/registeruser', 'register'),
       url(r'^ajax/loginuser', 'loginuser'),
       url(r'^ajax/loginTag', 'loginTag'),
       url(r'^ajax/addproduct', 'addproduct'),
       url(r'^ajax/get_classification', 'getClassification'),
       url(r'^ajax/modifypassword', 'modifyPassword'),
       url(r'^ajax/modifyphone', 'modifyPhone'),
       url(r'^ajax/modifyuserinfo', 'modifyuserinfo')
)
