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
    return render_to_response('product.html')

def register(request):
    return render_to_response('register.html')

def login(request):
    return render_to_response('login.html')

def users(request):
    return render_to_response('users.html')
