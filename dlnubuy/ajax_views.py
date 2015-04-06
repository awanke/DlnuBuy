#coding=utf-8
from dlnubuy import models
from django.http import HttpResponse
from django.conf import settings
import redis
import json, pdb
from django.utils import timezone


# Create your views here.
def register(request):
    rsdic = {}

    mobile = request.POST[u'mobile']
    password = request.POST[u'password']
    nickname = request.POST[u'nickname']
    user = models.Users()
    user.userphone = mobile
    user.username = nickname
    user.password = password

    try:
        user.save()
        rsdic['ret'] = 'success'
    except:
        rsdic['ret'] = 'error'

    return HttpResponse(json.dumps(rsdic))


def loginuser(request):
    rsdic = {}
    mlsUser = request.POST['mlsUser'].encode('utf-8')
    password = request.POST['password'].encode('utf-8')
    username = models.Users.objects.all().filter(password=password, username=mlsUser)
    if(username.count() != 0):
        rsdic['ret'] = 'success'
        Uid = models.Users.objects.get(username=mlsUser).id
        write_to_cache(Uid)
        rsdic['id'] = Uid
    else:
        rsdic['ret'] = 'error'
    return HttpResponse(json.dumps(rsdic))


def loginTag(request):
    rsdic = {}
    user_id = int(request.POST['uid'])
    user = models.Users.objects.all().filter(id=user_id)
    rdata = read_from_cache(user_id)
    if(rdata is not None):
        rsdic['ret'] = 'online'
        for u in user:
            rsdic['phone'] = u.userphone
            rsdic['school'] = u.schoolAddress
            rsdic['img'] = str(u.userimg)
            rsdic['id'] = u.id
            rsdic['username'] = u.username
    else:
        rsdic['ret'] = 'outline'
    return HttpResponse(json.dumps(rsdic))


def addproduct(request):
    rsdic = {}
    baomoney = request.POST['productmoney']
    baoname = request.POST['productname']
    buytext = request.POST['producttext']
    user_id = request.POST['userid']
    category = int(request.POST['productcf'])
    files = request.FILES.getlist('img')
    i = 0
    fads = []
    for f in files:
        uid = user_id + '_' + str(i)
        fad = write_to_infoimg(f, uid, 'product')
        fads.append(fad)
        i += 1
    try:
        products = models.Product()
        if len(fads) < 4:
            fads.append('0')
        products.pdimg = fads[0]
        if fads[1] != '0':
            products.pdimg2 = fads[1]
        else:
            products.pdimg2 = fads[0]
        if fads[2] != '0':
            products.pdimg3 = fads[2]
        else:
            products.pdimg3 = fads[0]
        products.userid = user_id
        products.pdname = baoname
        products.money = baomoney
        products.description = buytext
        products.requirement = buytext
        products.category = category
        products.save()
        rsdic['ret'] = 'success'
    except:
        rsdic['ret'] = 'error'

    return HttpResponse(json.dumps(rsdic))


def modifyPassword(request):
    rsdic = {}
    uid = int(request.POST['uid'])
    oldpassword = request.POST['oldp'].encode('utf-8')
    newpassword = request.POST['newp'].encode('utf-8')
    try:
        user = models.Users.objects.get(id=uid)
        if(oldpassword == user.password):
            user.password = newpassword
            user.save()
            rsdic['ret'] = 'success'
        else:
            rsdic['ret'] = 'passerror'
    except:
        rsdic['ret'] = 'error'
    return HttpResponse(json.dumps(rsdic))


def modifyPhone(request):
    rsdic = {}
    uid = int(request.POST['uid'])
    uphone = request.POST['newphone'].encode('utf-8')
    try:
        user = models.Users.objects.get(id=uid)
        user.userphone = uphone
        user.save()
        rsdic['ret'] = 'success'
    except:
        rsdic['ret'] = 'error'
    return HttpResponse(json.dumps(rsdic))


def modifyuserinfo(request):
    rsdic = {}
    uid = int(request.POST['uid'])
    uschool = request.POST['news'].encode('utf-8')
    img = request.FILES['newuserimg']
    import re
    pattern1 = re.compile(r'开发区')
    match = pattern1.match(uschool)
    if match is not None:
        newschooladd = '开发区校区'
    else:
        newschooladd = '金石滩校区'
    userimgadd = write_to_infoimg(img, request.POST['uid'].encode('utf-8'), 'user')
    try:
        usernew = models.Users.objects.get(id=uid)
        usernew.userimg = userimgadd
        usernew.schoolAddress = newschooladd
        usernew.save()
        rsdic['ret'] = 'success'
    except:
        rsdic['ret'] = 'error'
    return HttpResponse(json.dumps(rsdic))


# 取得宝贝分类的方法
def getClassification(request):

    rsdic = {}
    try:
        parent = int(request.POST['parent'])
        level = int(request.POST['level'])
        cfobjs = models.Classification.objects.all().filter(parent=parent, level=level)
        cf = []
        for cfobj in cfobjs:
            temp = []
            temp.append(cfobj.CFname)
            temp.append(cfobj.CFnumber)
            cf.append(temp)
        rsdic['cf'] = cf
        rsdic['ret'] = 'success'
    except:
        rsdic['ret'] = 'error'
    return HttpResponse(json.dumps(rsdic))


#read cache user id
def read_from_cache(user_id):
    host = settings.REDIS_HOST
    port = settings.REDIS_PORT
    db = settings.REDIS_DB
    r = redis.StrictRedis(host=host, port=port, db=db)
    key = 'user_id_of_'+str(user_id)
    value = r.get(key)
    if value is None:
        data = None
    else:
        data = value
    return data


#write cache user id
def write_to_cache(user_id):
    host = settings.REDIS_HOST
    port = settings.REDIS_PORT
    db = settings.REDIS_DB
    r = redis.StrictRedis(host=host, port=port, db=db)
    key = 'user_id_of_' + str(user_id)
    r.set(key, key)


# 保存用户上传的图片
def write_to_infoimg(file, uid, type):
    if type == 'user':
        with open(settings.USERIMG + 'user_'+uid+'.jpg', 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)
            destination.close()
            return 'static/images/users/user_'+uid+'.jpg'
    if type == 'product':
        with open(settings.WARP+uid+'.jpg', 'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)
            destination.close()
            return 'static/images/warp/'+uid+'.jpg'


def get_user_buyinfo(request):
    rsdic = {}
    uid = int(request.POST['uid'])
    try:
        models.Product.objects.all().filter(userid=uid)
        rsdic['ret'] = 'have'
    except:
        rsdic['ret'] = 'no'
    return HttpResponse(json.dumps(rsdic))


def get_buyinfo(request):
    rsdic = {}
    uid = request.POST['uid']
    buyinfos = models.Product.objects.all().filter(userid=uid)
    users = models.Users.objects.get(id=uid)
    try:
        arry = []
        for buyinfo in buyinfos:
            data = {}
            data['buyphoto'] = str(users.userimg)
            data['buyname'] = users.username
            data['buyphone'] = users.userphone
            data['buyschool'] = users.schoolAddress
            status = models.Buy.objects.get(pdid=int(buyinfo.id))
            data['buylevel'] = status.transaction_status
            data['buyschooling'] = users.schoolAddress
            time = int(((timezone.now() - buyinfo.begintime)).total_seconds() // 3600)
            data['succeedtime'] = '剩余'+str(time)+'小时'
            data['begintime'] = str(buyinfo.begintime)[2:10]
            data['pdimg'] = str(buyinfo.pdimg)
            data['pdimg2'] = str(buyinfo.pdimg2)
            data['pdimg3'] = str(buyinfo.pdimg3)
            data['money'] = buyinfo.money
            data['pdname'] = buyinfo.pdname
            data['eval'] = status.transaction_status
            data['message'] = buyinfo.requirement
            data['pdid'] = buyinfo.id
            arry.append(data)
        rsdic['data'] = arry
        rsdic['ret'] = 'success'
    except:
        rsdic['ret'] = 'error'
    return HttpResponse(json.dumps(rsdic))


def delete_buy_info(request):
    rsdic = {}
    pdid = int(request.POST['pdid'])
    try:
        models.Product.objects.get(id=pdid).delete()
        models.Buy.objects.get(pdid=pdid).delete()
        rsdic['ret'] = 'success'
        rsdic['pdid'] = pdid
    except:
        rsdic['ret'] = 'error'
    return HttpResponse(json.dumps(rsdic))


def get_Allbuyinfo(request):
    rsdic = {}

    cate = request.POST['cate'][:2]
    try:
        products = models.Product.objects.filter(category__startswith=cate)
        arry = []
        for product in products:
            data = {}
            data['src'] = str(product.pdimg)
            data['money'] = '￥' + str(product.money)
            data['title'] = product.description
            volume = models.Buy.objects.get(pdid=product.id)
            data['volume'] = int(volume.transaction_status)
            data['span'] = int(product.likes)
            data['pic_load'] = '#'
            user = models.Users.objects.get(id=product.userid)
            data['user_img'] = str(user.userimg)
            data['user_name'] = user.username
            data['user_info'] = product.requirement
            data['user_href'] = '#'
            data['user_id'] = user.id
            arry.append(data)
        rsdic['data'] = arry
        rsdic['ret'] = 'succsee'
    except:
        rsdic['ret'] = 'error'
        rsdic['data'] = ''
    return HttpResponse(json.dumps(rsdic))












# 添加测试数据
def input_db_user (request):

    i = 1
    for j in range(10):
        username = 'test'+str(i)
        password = '123456'
        userphone = '18642636963'
        user = models.Users(username=username, password=password, userphone=userphone)
        user.save()
        i += 1
    return HttpResponse()


def input_db_product(request):
    i = 1
    m = 100
    for j in range(35):
        user_id = '1'
        baoname = 'test'+str(i)
        baomoney = 150 + i
        buytext = '这些是导入的测试数据'
        category = 101015
        products = models.Product()
        products.userid = user_id
        products.pdname = baoname
        products.money = baomoney
        products.description = buytext
        products.requirement = buytext
        products.category = category
        products.pdimg = 'static/images/warp/warp_'+str(m)+'_226.jpg'
        products.pdimg2 = 'static/images/warp/warp_'+str(m+1)+'_226.jpg'
        products.save()
        i += 1
        m += 1
    return HttpResponse()


def input_db_buy(request):

    i = 1
    for j in range(10):
        pdid = 48 + i
        buy = models.Buy()
        buy.pdid = pdid
        buy.transaction_status = str(0)
        buy.buyid = 3
        buy.esllid = 4
        buy.buymoney = 150 + i
        buy.save()
        i += 1
    return HttpResponse()
