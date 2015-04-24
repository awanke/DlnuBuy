#coding=utf-8
from django.db import models
from django.utils import timezone

# Create your models here.


# 用户信息表
class Users(models.Model):

    # 用户表的主键，自动增长
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, null=False)
    password = models.CharField(max_length=100, null=False)
    userphone = models.CharField(max_length=50, null=False)

    # 注册时间，如果没有保存就为当前系统时间
    registration_date = models.DateTimeField(default=timezone.now())

    # 注册用户的地址，由于现在系统不完善，目前在注册的时候默认添加为金石滩校区
    schoolAddress = models.CharField(max_length=200, default='金石滩校区')

    # 这个保存的是用户的头像
    userimg = models.ImageField(default='static/images/users/user.jpg')


# 出售宝贝的信息表
class Product(models.Model):
    id = models.AutoField(primary_key=True)
    userid = models.IntegerField(max_length=100, null=False)
    pdname = models.CharField(max_length=200, null=False)
    money = models.IntegerField(max_length=100, null=False)

    # 宝贝上架的时间
    begintime = models.DateTimeField(default=timezone.now())

    # 宝贝的描述
    description = models.TextField()

    # 卖家对宝贝的留言
    requirement = models.TextField()

    # 有多少人喜欢这个宝贝
    likes = models.IntegerField(max_length=999, default=0)

    # 这个是宝贝的分类，以数字的形式保存，另外会有一张种类表来保存具体的种类
    category = models.IntegerField()

    # 下面这3个字段保存的是对宝贝描述的3张图片，由于目前系统不完善，就只限制用户上传的照片数量了
    pdimg = models.ImageField(default='static/images/warp/000001.jpg')
    pdimg2 = models.ImageField(default='static/images/warp/000001.jpg')
    pdimg3 = models.ImageField(default='static/images/warp/000001.jpg')


# 交易记录表
class Buy(models.Model):
    id = models.AutoField(primary_key=True)
    pdid = models.IntegerField(null=False)
    buytime = models.DateTimeField(default=timezone.now())

    # 交易状态，当为1的时候是交易完成，0的时候是交易正在进行
    transaction_status = models.CharField(max_length=10, default=0)

    # 卖家id
    buyid = models.IntegerField(null=False)

    # 买家id
    esllid = models.IntegerField(null=False)

    # 成交价格
    buymoney = models.IntegerField(null=False)


# 宝贝分类表
class Classification(models.Model):
    id = models.AutoField(primary_key=True)

    # 这个是分类的具体名称
    CFname = models.CharField(max_length=300, null=False)

    # 分类编号
    CFnumber = models.IntegerField(null=False)

    #分类等级
    level = models.IntegerField(null=False)

    #上级代码
    parent = models.IntegerField(null=False)
