/**
 * Created by Jonny on 3/12/2015.
 */
$(function(){

    //从cookie中取得用户名
    var username = $.cookie('username');
    var uid = $.cookie('userid');

    if(username!=null && uid!=null){
        $.post('ajax/loginTag',{
            username:username,
            uid:uid
        },function(data){
            if(data['ret']=='online'){
                $('#loginTags').attr('href','users.html?id='+data['id']).text('['+data['username']+']');
            }else{
                loacation.href = 'login.html';
            }
        },"json");
    }

    //页面加载完成后开始首页的轮播
    lunbo();

    //根据下拉判断是否显示隐藏导航
    $(window).scroll(function(){
        if($(window).scrollTop()>70){
            $(".topBox").show();
        }else{
            $(".topBox").hide();
        }
    });

    //自动返回顶端
    $('.returnTop').click(function(){
        retunTop();
    });

    //左侧商品展示
    $("li:has('.nav_list')").hover(function(){
        $(this).addClass('active');
        $(this).find('ul').css('display','block');
        $(this).next().find('ul').css('display','none');
    },function(){
        $(this).removeClass('active');
        $(this).find('ul').css('display','none');
        $(this).next().find('ul').css('display','none');
    });

    //在滚动的时候动态加载新的瀑布图片
    waterfall();

    //加载测试的数据
    var dataInt={
        'data':[
            {'src':'warp_030_226.jpg',
            'money':'￥155.00',
            'pic_load':'#','title':'这个是新添加的测试','title_href':'#','volume':'0','span':'666',
            'user_img':'images/icon/collection.png','user_name':'我的名字叫做测试',
            'user_info':'         分享了一个宝贝      ',
            'user_href':'#','user_id':'110'},
            {'src':'warp_020_226.jpg',
                'money':'￥355.00',
                'pic_load':'#','title':'这个是新添加的测试2','title_href':'#','volume':0,'span':'666',
                'user_img':'images/icon/collection.png','user_name':'我的名字叫做测试2',
                'user_info':'         分享了一个宝贝       ',
                'user_href':'#','user_id':'110'},
            {'src':'warp_044_226.jpg',
                'money':'￥455.00',
                'pic_load':'#','title':'这个是新添加的测试3','title_href':'#','volume':0,'span':'666',
                'user_img':'images/icon/collection.png','user_name':'我的名字叫做测试3',
                'user_info':'         分享了一个宝贝       ',
                'user_href':'#','user_id':'110'},
            {'src':'warp_027_226.jpg',
                'money':'￥151.00',
                'pic_load':'#','title':'这个是新添加的测试4','title_href':'#','volume':0,'span':'666',
                'user_img':'images/icon/collection.png','user_name':'我的名字叫做测试4',
                'user_info':'         分享了一个宝贝       ',
                'user_href':'#','user_id':'110'},
            {'src':'warp_087_226.jpg',
                'money':'￥155.00',
                'pic_load':'#','title':'这个是新添加的测试5','title_href':'#','volume':0,'span':'666',
                'user_img':'images/icon/collection.png','user_name':'我的名字叫做测试5',
                'user_info':'         分享了一个宝贝       ',
                'user_href':'#','user_id':'110'}
        ]};

    window.onscroll=function(){
        if(checkscrollside()){
            addpubuliu(dataInt);
            waterfall();
        };
    }
});

//动态添加瀑布图片的功能函数
function waterfall(){
    var $boxs = $( "#main>div" );
    var w = $boxs.eq( 0).outerWidth();// 一个块框pin的宽
    var cols = Math.floor( $( window ).width() / w );//每行中能容纳的pin个数【窗口宽度除以一个块框宽度】

    $('#main').width(w*cols).css('margin','o auto');

    var hArr=[];//用于存储 每列中的所有块框相加的高度。

    $boxs.each( function( index, value ){
        var h = $boxs.eq( index).outerHeight();
        if( index < cols ){
            hArr[ index ] = h; //第一行中的num个块框pin 先添加进数组pinHArr
        }else{
            var minH = Math.min.apply( null, hArr );//数组pinHArr中的最小值minH
            var minHIndex = $.inArray( minH, hArr );
            $( value).css({
                'position':'absolute','top':minH+'px', 'left':minHIndex*w + 'px'
            });
            //数组 最小高元素的高 + 添加上的aPin[i]块框高
            hArr[ minHIndex ] += $boxs.eq( index).outerHeight();//更新添加了块框后的列高
        }
    });
}

//判断是否需要继续加载瀑布流
function checkscrollside(){
    var $lastBox = $('#main>div').last();
    var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight()/2);
    var scrollTop = $(window).scrollTop();
    var documentH = $(window).height();
    return (lastBoxDis<scrollTop+documentH)?true:false;
}

//返回顶部的函数
function retunTop(){
    $('body,html').animate({scrollTop:0},1000);
    return false;
}

//轮播函数
function lunbo(){
    var container = $('#container');
    var list = $('#list');
    var buttons = $('#buttons span');
    var prev = $('#prev');
    var next = $('#next');
    var index = 1;
    var len = 5;
    var interval = 3000;
    var timer;

    function animate(offset){
        var left = parseInt(list.css('left')) + offset;
        if(offset>0){
            offset = '+=' + offset;
        }else{
            offset = '-=' + Math.abs(offset);
        }
        list.animate({'left': offset}, 500, function () {
            if(left > -1000){
                list.css('left', -2000 * len);
            }
            if(left < (-2000 * len)) {
                list.css('left', -2000);
            }
        });
    }

    function showButton(){
        buttons.eq(index-1).addClass('on').siblings().removeClass('on');
    }

    function play(){
        timer = setTimeout(function () {
            next.trigger('click');
            play();
        },interval);
    }
    function stop(){
        clearTimeout(timer);
    }

    next.bind('click', function(){
        if(list.is(':animated')){
            return;
        }
        if(index == 5){
            index = 1;
        }else{
            index += 1;
        }
        animate(-2000);
        showButton();
    });

    prev.bind('click', function () {
        if (list.is(':animated')) {
            return;
        }
        if (index == 1) {
            index = 5;
        }
        else {
            index -= 1;
        }
        animate(2000);
        showButton();
    });

    buttons.each(function(){
        $(this).bind('click', function(){
            if(list.is(':animated') || $(this).attr('class')=='on'){
                return;
            }
            var myIndex = parseInt($(this).attr('index'));
            var offset = -2000 * (myIndex - index);

            animate(offset);
            index = myIndex;
            showButton();
        })
    });

    container.hover(stop(),play());

    play();
}

//加载新的瀑布流内容
function addpubuliu(dataInt){
    $.each( dataInt.data, function( index, value ){
        //第一级
        var Pin = $('<div>').addClass('pin').appendTo($('#main'));

        //第二级
        var Box = $('<div>').addClass('box new_poster').appendTo($(Pin));

        //第三级
        var Pic = $('<div>').addClass('np_pic').appendTo($(Box));
        $('<div>').addClass('price').text($(value).attr('money')).appendTo($(Pic));
        var a_load = $('<a>').addClass('pic_load').attr('target','_blank').attr('href',$(value).attr('pic_load')).appendTo($(Pic));
        $('<img>').attr('src','static/images/warp/' +$(value).attr('src')).appendTo($(Pic));

        //第三级
        var title = $('<div>').addClass('title').appendTo($(Box));
        var p1 = $('<p>').appendTo($(title));
        $('<a>').attr('target','_blank').attr('href',$(value).attr('title_href')).text($(value).attr('title')).appendTo($(p1));

        //第三级
        $('<div>').addClass('clear_f').appendTo($(Box));

        //第三级
        var comm = $('<div>').addClass('comm_num').appendTo($(Box));
        if($(value).attr('volume') == 1){
            $('<a>').addClass('fr').text('出售中').appendTo($(comm));
        }else{
            $('<a>').addClass('fr red_f').text('正在交易').appendTo($(comm));
        }
        var likes = $('<a>').addClass('fl poster_likes likes').attr('href','javascript:void(0)').appendTo($(comm));
        $('<b>').addClass('likes_status').text('喜  欢').appendTo($(likes));
        $('<span>').addClass('red_f poster_like_num').text($(value).attr('span')).appendTo($(likes));

        //第三级
        var share = $('<div>').addClass('np_share').appendTo($(Box));
        var user = $('<a>').addClass('avatar32_f trans07').attr('target','_blank').attr('href','static/'+$(value).attr('user_href'))
            .attr('user_id',$(value).attr('user_id')).appendTo($(share));
        $('<img>').attr('src','static/'+$(value).attr('user_img')).appendTo($(user));
        var p2 = $('<p>').attr('style','margin-left: 42px;').appendTo($(share));
        $('<a>').attr('target','_blank').attr('href','static/'+$(value).attr('user_href')).text($(value).attr('user_name')).appendTo($(p2));
        $('<p>').addClass('t_idt').text($(value).attr('user_info')).appendTo($(share));
        $('<div>').addClass('clear_f').appendTo($(share));
    });
}