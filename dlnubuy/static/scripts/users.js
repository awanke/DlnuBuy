/**
 * Created by Jonny on 3/14/2015.
 */
$(function(){

    //从cookie中取得用户名
    var username = $.cookie('username');
    var uid = $.cookie('userid');

    if (username==undefined) {
        location.href = 'login.html';
    } else{
        $.post('ajax/loginTag', {uid: uid,username:username}, function(data) {
            $('.ibx-uc-itool-phone').text('联系电话：'+data['phone']);
            $('.ibx-uc-itool-name').text(data['username']);
            $('.ibx-uc-itool-school').text(data['school']);
            $('.ibx-uc-img').attr('src',data['img']);
            $('#loginTags').text('['+data['username']+']');
        },"json");

        $('#buyporduct').click(function () {
            $('#addproduct').show();
            addproduct();
            $('#uid').attr('value',uid).css('display','none');
        });

        $('#school').click(function() {
            $('#addproduct').hide();
        });
    };

    // 加载现在的日期到资料中展示
    var nowtimes = nowtime();
    $('#nowtime').text(nowtimes);

    // 绑定修改密码的事件
    $('#mpassword').click(function() {
        Modify_the_password ();
    });

    // 绑定修改个人信息的事件
    $('#muserinfo').click(function() {
        Modify_the_info()
    });

    // 绑定修改个人电话的事件
    $('#muserphone').click(function() {
        // body...
        Modify_the_phone()
    });

    //加载测试的数据
    var dataInt = {
        'data':[
            {'buyphoto':'user.jpg',
                'buyname':'fuhuixiang',
                'buyphone':'18888888',
                'buyschool':'金石滩校区',
                'buylevel':0,'buyschooling':'开发区校区','succeedtime':'剩余1小时',
                'begintime':'14-4-2','pdimg':'static/images/warp/warp_002_226.jpg',
                'pdimg2':'static/images/warp/warp_002_226.jpg','pdimg3':'static/images/warp/warp_002_226.jpg',
                'money':'33.00','pdname':'快学Scala','eval':1,'message':'宝贝很好哦'}
        ]
    };

    //根据下拉判断是否显示隐藏导航
    $(window).scroll(function(){

        if($(window).scrollTop()>86){
            $(".us-header-2").show();
        }else{
            $(".us-header-2").hide();
        }
    });

    if(buycheckscrollside()){
        buyaddpubuliu(dataInt);
    }

    $('#buytext').focus(function(){
        $(this).empty();
    });
    $('#buytext').blur(function(){
        $(this).text('在这里留下您要说的话~');
    });

});

//加载新的瀑布流内容
function buyaddpubuliu(dataInt){
    $(dataInt.data).each(function(index, value){

        //第一级
        var us_panel = $('<div>').addClass('us-panel').appendTo($('.us-main'));

        //第二级
        var span51 = $('<div>').addClass('col span_5_1').appendTo($(us_panel));

        //第三级
        var ibx_uc = $('<div>').addClass('ibx-uc').appendTo($(span51));

        //第四级
        var ibx_inner = $('<div>').addClass('ibx-inner').appendTo($(ibx_uc));

        //第五级
        var ibx_uc_uimg = $('<div>').addClass('ibx-uc-uimg').appendTo($(ibx_inner));
        $('<img>').addClass('ibx-uc-img').attr('src','static/images/users/'+$(value).attr('buyphoto')).appendTo($(ibx_uc_uimg));

        var ibx_uc_unick = $('<div>').addClass('ibx-uc-unick').appendTo($(ibx_inner));
        $('<a>').addClass('ibx-uc-nick').text($(value).attr('buyname')).appendTo($(ibx_uc_unick));

        var ibx_uc_utool = $('<div>').addClass('ibx-uc-utool').appendTo($(ibx_inner));
        $('<span>').addClass('ibx-uc-utool-cover').appendTo($(ibx_uc_utool));
        $('<div>').addClass('ibx-uc-itool-phone').text($(value).attr('buyphone')).appendTo($(ibx_uc_utool));
        $('<div>').addClass('ibx-uc-itool-school').text($(value).attr('buyschool')).appendTo($(ibx_uc_utool));
        $('<div>').addClass('ibx-uc-itool-name').text($(value).attr('buyname')).appendTo($(ibx_uc_utool));

        //第二级
        var span54 = $('<div>').addClass('col span_5_4').appendTo($(us_panel));

        //第三级
        var ibx_cal = $('<div>').addClass('ibx-cal').appendTo($(span54));

        //第四级
        var ibx_inner2 = $('<div>').addClass('ibx-inner').appendTo($(ibx_cal));

        //第五级
        var ibx_cal_box = $('<div>').addClass('ibx-cal-box').appendTo($(ibx_inner2));

        //第六级
        var ibx_cal_box2 = $('<div>').addClass('ibx-cal-box').appendTo($(ibx_cal_box));

        //第七级
        var ibx_cal_box_L = $('<div>').addClass('ibx-cal-box-l').appendTo($(ibx_cal_box2));
        if($(value).attr('buylevel') == 1){
            $('<a>').addClass('ibx-weather-quality level1').attr('href','#').attr('title','商品名称')
                .text('交易完成').appendTo($(ibx_cal_box_L));
        }else{
            $('<a>').addClass('ibx-weather-quality level2').attr('href','#').attr('title','商品名称')
                .text('正在交易').appendTo($(ibx_cal_box_L));
        }
        $('<a>').addClass('ibx-location').attr('href','#').attr('title',$(value).attr('buyschooling'))
            .text($(value).attr('buyschooling')).appendTo($(ibx_cal_box_L));
        $('<div>').addClass('ibx-date').text($(value).attr('succeedtime')).appendTo($(ibx_cal_box_L));
        var ibx_lunar = $('<div>').addClass('ibx-lunar clr').appendTo($(ibx_cal_box_L));
        $('<span>').addClass('ibx-day').text('开始').appendTo($(ibx_lunar));
        $('<span>').addClass('ibx-lunar-ctx').text($(value).attr('begintime')).appendTo($(ibx_lunar));

        //第七级
        var ibx_cal_box_R = $('<div>').addClass('ibx-cal-box-r').appendTo($(ibx_cal_box2));
        var ibx_cal_img = $('<div>').addClass('ibx-cal-img fl').appendTo($(ibx_cal_box_R));
        $('<img>').attr('alt','宝贝展示').attr('src',$(value).attr('pdimg')).appendTo($(ibx_cal_img));
        var ibx_cal_img2 = $('<div>').addClass('ibx-cal-img fl').appendTo($(ibx_cal_box_R));
        $('<img>').attr('alt','宝贝展示').attr('src',$(value).attr('pdimg2')).appendTo($(ibx_cal_img2));
        var ibx_cal_img3 = $('<div>').addClass('ibx-cal-img fl').appendTo($(ibx_cal_box_R));
        $('<img>').attr('alt','宝贝展示').attr('src',$(value).attr('pdimg3')).appendTo($(ibx_cal_img3));

        var ibx_cal_pay = $('<div>').addClass('ibx-cal-pay').appendTo($(ibx_cal_box_R));
        $('<span>').addClass('money').text($(value).attr('money')).appendTo($(ibx_cal_pay));
        $('<span>').addClass('ibx_cal_name').text($(value).attr('pdname')).appendTo($(ibx_cal_pay));

        var ibx_cal_operate = $('<div>').addClass('ibx-cal-operate').appendTo($(ibx_cal_box_R));
        if($(value).attr('eval') == 1){
            $('<a>').addClass('delete').attr('href','#').text('取消交易').appendTo($(ibx_cal_operate));
        }else{
            $('<a>').addClass('succeed').attr('href','#').text('交易已完成').appendTo($(ibx_cal_operate));
        }
        $('<span>').addClass('ibx-cal-name').text($(value).attr('message')).appendTo($(ibx_cal_operate));

        return false;
    });
}

//判断是否需要继续加载瀑布流
function buycheckscrollside(){
    return true;
}

//添加宝贝的函数
function addproduct(){
    //验证表单提交数据的合法性
    $('#AddProductFrom').validate({
        rules:{
            baomoney:{
                required:true,number:true, min:0
            },
            baoname:{
                required:true
            },
            img1:{
                accept:"jpg"
            },
            img2:{
                accept:"jpg"
            },
            img3:{
                accept:"jpg"
            }
        }
    });

    //第一次向后台请求取得第一大类信息
    $.post('ajax/get_classification',
        {"parent":0,"level":1},
        function (data) {
            if(data['ret']!='success'){
                alert('后台数据异常(๑-﹏-๑)');
                return
            }
            var all_cf = data['cf'];
            for(var i=0;i<all_cf.length;i++){
                var $html = String.format('<option value="{1}">{0}</option>',all_cf[i][0],all_cf[i][1]);
                $('#cf1').append($html);
            }
        },"json");

    //监听点击第一级类
    $('#cf1').change(function () {
        var parent = $(this).val();

        //通过请求取得第二级分类
        $.post('ajax/get_classification',
            {"parent":parent,"level":2},
            function (data) {
                if(data['ret']!='success'){
                    alert('后台数据异常(๑-﹏-๑)');
                    return
                }

                var $cf2 = $('#cf2').empty();
                $cf2.append('<option selected value="">请选择</option>');
                var $cf3 = $('#cf3').empty();
                $cf3.append('<option selected value="">请选择</option>');
                var $cf4 = $('#cf4').empty();
                $cf4.append('<option selected value="">请选择</option>');

                var all_cf = data['cf'];
                for(var i=0;i<all_cf.length;i++){
                    var $html = String.format('<option value="{1}">{0}</option>',all_cf[i][0],all_cf[i][1]);
                    $cf2.append($html);
                }
            },"json");
    });

    //监听点击第二级类
    $('#cf2').change(function () {
        var parent = $(this).val();

        //通过请求取得第二级分类
        $.post('ajax/get_classification',
            {"parent":parent,"level":3},
            function (data) {
                if(data['ret']!='success'){
                alert('后台数据异常(๑-﹏-๑)');
                return
            }

            var $cf3 = $('#cf3').empty();
            $cf3.append('<option selected value="">请选择</option>');
            var $cf4 = $('#cf4').empty();
            $cf4.append('<option selected value="">请选择</option>');

            var all_cf = data['cf'];
            for(var i=0;i<all_cf.length;i++){
                var $html = String.format('<option value="{1}">{0}</option>',all_cf[i][0],all_cf[i][1]);
                $cf3.append($html);
            }
            },"json");
    });

    //监听点击第三级类
    $('#cf3').change(function () {
        var parent = $(this).val();

        //通过请求取得第二级分类
        $.post('ajax/get_classification',
            {"parent":parent,"level":4},
            function (data) {
                if(data['ret']!='success'){
                alert('后台数据异常(๑-﹏-๑)');
                return
            }

            var $cf4 = $('#cf4').empty();
            $cf4.append('<option selected value="">请选择</option>');

            var all_cf = data['cf'];
            for(var i=0;i<all_cf.length;i++){
                var $html = String.format('<option value="{1}">{0}</option>',all_cf[i][0],all_cf[i][1]);
                $cf4.append($html);
            }
            },"json");
    });

    //向后台提交宝贝详情
    $('#AddProductFrom').submit(function () {
        function showRequest(formData, jqForm){
            var form = jqForm[0];
            if(!form.baoname.value && !form.baomoney.value){
                return true;
            }
            return false;
            alert('请仔细确认您的信息是否填写正确');
        }

        function showResponse(data){
            if(data.ret=='success'){
                alert('恭喜您！╰(*´︶`*)╯♡宝贝已成功发布~');
            }else{
                alert('发布失败（╯‵□′）╯︵┴─┴请仔细检查您提交的宝贝信息');
            }
        }

        $(this).ajaxSubmit({
            beforSubmit:showRequest(),
            success:showResponse(),
            dataType:'json'
        });
        return false;
    });
}

// 计算当前时间
function nowtime(){
    var matetime = new Date();
    var nowmonth = matetime.getMonth() + 1;
    var nowday = matetime.getDate()
    return nowmonth + ' 月 ' + nowday + ' 日';
}

// 修改密码
function Modify_the_password () {
    // body...
    var mp = $('#mpassword').parent().empty();
    
    $('<input>').attr({'type':'password','class':'baomoney','placeholder':'请输入原密码：',
                                            'id':'oldpassword'}).css('margin-left','0px').appendTo(mp);
    $('<input>').attr({'type':'password','class':'baoname','placeholder':'请输入新密码：',
                                            'id':'newpassword'}).css('margin-left','0px').appendTo(mp);
    var divp= $('<div>').css({'margin-top':'30px','text-align':'left','font-size':'20px'}).appendTo(mp);

    var yes = $('<span>').text('确认').addClass('fl')
                .css({'height':'30px','width':'50px','cursor':'pointer','color':'red'}).appendTo(divp);
    var no = $('<span>').text('取消').addClass('fr')
                .css({'height':'30px','width':'50px','cursor':'pointer','color':'#00FF00'}).appendTo(divp);
    yes.click(function() {
        /* Act on the event */
        var oldp = $('#oldpassword').val();
        var newp = $('#newpassword').val();
        var uid = $.cookie('userid');
        $.post('ajax/modifypassword',{uid:uid,oldp:oldp,newp:newp},
            function(data) {
                // body...
                if(data.ret=='success'){
                    alert('恭喜您！╰(*´︶~密码修改成功!');
                    returnm();
                }else if(data.ret=='passerror') {
                    alert('请检查您的密码是否输入正确！')
                }else{
                    alert('（╯‵□′）╯︵┴─┴网络错误，修改失败...');
                }
            },"json");
    });

    no.click(function() {
        /* Act on the event */
        returnm();
    });

    // 返回修改
    function returnm () {
        // body...
        var mp = $('#oldpassword').parent().empty();
        var newa = $('<a>').addClass('ibx-cal-ditem-addbtn')
                        .attr('id','mpassword').text('修改密码')
                            .css('cursor','pointer').appendTo(mp);
        newa.click(function() {
            /* Act on the event */
            Modify_the_password ();
        });
    }
}

// 修改个人电话
function Modify_the_phone () {
    // body...
    var mp = $('#muserphone').parent().empty();
    
    $('<input>').attr({'type':'text','class':'baoname','placeholder':'请输入新电话：',
                                            'id':'newphone'}).css('margin-left','0px').appendTo(mp);
    var divp= $('<div>').css({'margin-top':'30px','text-align':'left','font-size':'20px'}).appendTo(mp);

    var yes = $('<span>').text('确认').addClass('fl')
                .css({'height':'30px','width':'50px','cursor':'pointer','color':'red'}).appendTo(divp);
    var no = $('<span>').text('取消').addClass('fr')
                .css({'height':'30px','width':'50px','cursor':'pointer','color':'#00FF00'}).appendTo(divp);
    yes.click(function() {
        /* Act on the event */
        var newp = $('#newphone').val();
        var uid = $.cookie('userid');
        if(newp.length>11 || newp.length<7){
            alert('请输入正确的电话格式!!!');
            return;
        }
        $.post('ajax/modifyphone',{newphone:newp,uid:uid},
            function(data) {
                // body...
                if(data.ret=='success'){
                    alert('恭喜您！╰(*´︶~电话修改成功!');
                    returnm();
                }else{
                    alert('（╯‵□′）╯︵┴─┴网络错误，修改失败...');
                }
            },"json");
    });

    no.click(function() {
        /* Act on the event */
        returnm();
    });

    // 返回修改
    function returnm () {
        // body...
        var mp = $('#newphone').parent().empty();
        var newa = $('<a>').addClass('ibx-cal-ditem-addbtn')
                        .attr('id','muserphone').text('修改联系电话')
                            .css('cursor','pointer').appendTo(mp);
        newa.click(function() {
            /* Act on the event */
            Modify_the_phone();
        });
    }
}

// 修改个人信息
function Modify_the_info () {
    // body...
    var mp = $('#muserinfo').parent().empty();
    
    $('<input>').attr({'type':'file','class':'baomoney','id':'newuserimg','name':'newuserimg'}).css('margin-left','0px').appendTo(mp);
    $('<span>').text('请选择你的头像').appendTo(mp);
    $('<input>').attr({'type':'text','class':'baoname','placeholder':'请输入新的校区',
                                            'id':'newschool'}).css('margin-left','0px').appendTo(mp);
    $('<span>').text('请输入你所在的校区，例如：金石滩，开发区').appendTo(mp);
    var divp= $('<div>').css({'margin-top':'6px','text-align':'left','font-size':'20px'}).appendTo(mp);

    var yes = $('<span>').text('确认').addClass('fl')
                .css({'height':'30px','width':'50px','cursor':'pointer','color':'red'}).appendTo(divp);
    var no = $('<span>').text('取消').addClass('fr')
                .css({'height':'30px','width':'50px','cursor':'pointer','color':'#00FF00'}).appendTo(divp);
    yes.click(function() {
        /* Act on the event */
        var oldp = $('#newuserimg').val();
        var point = oldp.lastIndexOf(".");
        var news = $('#newschool').val();
        var uid = $.cookie('userid');
        var type = oldp.substr(point);

        if(type != '.jpg' && type != '.JPG'){
            alert('(๑¯ω¯๑)请选择jpg的图片格式~');
            return;
        }

        $.ajaxFileUpload({
            url:'ajax/modifyuserinfo',
            type:'post',
            data:{uid:uid,news:news},
            secureuri: false,
            fileElementId: 'newuserimg',
            dataType:'json',
            success:function (data, status) {
                console.log(data);
                // body...
                if(data.ret=='success'){
                    alert('恭喜您！╰(*´︶~信息修改成功!');
                    returnm();
                }else{
                    alert('（╯‵□′）╯︵┴─┴网络错误，修改失败...');
                }
            },
            error: function (data, status) {
                // body...
                alert('（╯‵□′）╯︵┴─┴网络错误，修改失败...');
            }
        })

    });

    no.click(function() {
        /* Act on the event */
        returnm();
    });

    // 返回修改
    function returnm () {
        // body...
        var mp = $('#newuserimg').parent().empty();
        var newa = $('<a>').addClass('ibx-cal-ditem-addbtn')
                        .attr('id','muserinfo').text('修改个人信息')
                            .css('cursor','pointer').appendTo(mp);
        newa.click(function() {
            /* Act on the event */
            Modify_the_info ();
        });
    }
}