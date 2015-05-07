#coding=utf-8
from dlnubuy import models
from django.template import Context
from django.shortcuts import render_to_response
import json,pdb
from haystack.forms import SearchForm
from search_indexes import ProductIndex

# Create your views here.


def index(request):
    return render_to_response('index.html',)


def product_list(request):
    return render_to_response('product_list.html')


def product(request):
    products = {}
    user = {}
    pdimg_list = []
    pid = request.GET.get('pid')
    try:
        product = models.Product.objects.get(id=pid)
        products['name'] = product.pdname
        products['money'] = product.money
        products['description'] = product.description
        products['requirement'] = product.requirement
        products['pdimg'] = str(product.pdimg)
        pdimg_list.append(product.pdimg)
        if str(product.pdimg2)[-10:] != '000001.jpg':
            pdimg_list.append(str(product.pdimg2))
        if str(product.pdimg3)[-10:] != '000001.jpg':
            pdimg_list.append(str(product.pdimg3))
        u = models.Users.objects.get(id=product.userid)
        user['name'] = u.username
        user['userphone'] = u.userphone
        user['school'] = u.schoolAddress
        template = 'product.html'
        c = Context({'product': products, 'user': user, 'pdimg_list':pdimg_list})
    except:
        template = 'index.html'
        c = Context()
    return render_to_response(template, c)


def register(request):
    return render_to_response('register.html')


def login(request):
    return render_to_response('login.html')


def users(request):
    return render_to_response('users.html')

# 全局搜索
def full_search(request):
    keywords = request.GET['q'].encode('utf-8')
    sform = SearchForm(request.GET)
    posts = sform.search()
    template = 'product_search_list.html'
    c = Context({'posts': posts, 'list_header': '关键字 \'{}\' 搜索结果'.format(keywords)})
    return render_to_response(template, c)