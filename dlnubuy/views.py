#coding=utf-8
from django.shortcuts import render
from dlnubuy import models
from django.http import HttpResponse
from django.template import Context, loader,RequestContext
from django.shortcuts import render,render_to_response
from django.core.context_processors import csrf
from django.conf import settings
import json,pdb

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
