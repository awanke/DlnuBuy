#coding=utf-8
from django.conf.urls import patterns, url


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
       url(r'^ajax/modifyuserinfo', 'modifyuserinfo'),
       url(r'^test/input_db_user', 'input_db_user'),
       url(r'^test/input_db_product', 'input_db_product'),
       url(r'^test/input_db_buy', 'input_db_buy'),
       url(r'^ajax/get_user_buyinfo', 'get_user_buyinfo'),
       url(r'^ajax/get_buyinfo', 'get_buyinfo'),
       url(r'^ajax/delete_buy_info', 'delete_buy_info')
)
