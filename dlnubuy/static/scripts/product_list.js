/**
 * Created by Jonny on 3/14/2015.
 */
$(function(){

    //根据下拉判断是否显示隐藏导航
    $(window).scroll(function(){

        //这里我的顶部导航栏的top为116，所以监听的高度就为116了
        if($(window).scrollTop()>116){
            $(".topBox").show();

            //当满足条件时就显示出右侧的信息栏
            $("#sidebar").show();
        }else{
            $(".topBox").hide();

            //当条件不满足的时候就隐藏右侧的信息栏
            $("#sidebar").hide();
            $('.nav-content').removeClass('sidebar-move-left');
        }
    });


    //自动返回顶端
    $('.returnTop').click(function(){
        retunTop();
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

    //监听滚动条
    window.onscroll=function(){
        if(checkscrollside()){
            addpubuliu(dataInt);
            waterfall();
        };
    }

    //隐藏的信息栏
    Sidebar();
});

//返回顶部的函数
function retunTop(){
    $('body,html').animate({scrollTop:0},1000);
    return false;
}

//动态添加瀑布图片的功能函数
function waterfall(){

    //取得展示框对象
    var $boxs = $( "#main>div" );

    // 一个块框的宽
    var w = $boxs.eq( 0).outerWidth();

    //每行中能容纳的展示框个数【窗口宽度除以一个块框宽度】
    var cols = Math.floor( ($( window ).width()-30) / w );

    //给最外围的main元素设置宽度和外边距
    $('#main').width(w*cols).css('margin','o auto');

    //用于存储 每列中的所有块框相加的高度。
    var hArr=[];

    $boxs.each( function( index, value ){
        var h = $boxs.eq( index).outerHeight();
        if( index < cols ){
            hArr[ index ] = h; //第一行中的num个块框 先添加进数组HArr
        }else{
            var minH = Math.min.apply( null, hArr );//数组HArr中的最小值minH
            var minHIndex = $.inArray( minH, hArr );
            $( value).css({
                'position':'absolute','top':minH+'px', 'left':minHIndex*w + 'px'
            });
            //数组 最小高元素的高 + 添加上的展示框[i]块框高
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

//加载新的瀑布流内容
function addpubuliu(dataInt) {
    $.each(dataInt.data, function (index, value) {
        //第一级
        var Pin = $('<div>').addClass('pin').appendTo($('#main'));

        //第二级
        var Box = $('<div>').addClass('box new_poster').appendTo($(Pin));

        //第三级
        var Pic = $('<div>').addClass('np_pic').appendTo($(Box));
        $('<div>').addClass('price').text($(value).attr('money')).appendTo($(Pic));
        var a_load = $('<a>').addClass('pic_load').attr('target', '_blank').attr('href', $(value).attr('pic_load')).appendTo($(Pic));
        $('<img>').attr('src', 'static/images/warp/' + $(value).attr('src')).appendTo($(Pic));

        //第三级
        var title = $('<div>').addClass('title').appendTo($(Box));
        var p1 = $('<p>').appendTo($(title));
        $('<a>').attr('target', '_blank').attr('href', 'static/'+$(value).attr('title_href')).text($(value).attr('title')).appendTo($(p1));

        //第三级
        $('<div>').addClass('clear_f').appendTo($(Box));

        //第三级
        var comm = $('<div>').addClass('comm_num').appendTo($(Box));
        if ($(value).attr('volume') == 1) {
            $('<a>').addClass('fr').text('出售中').appendTo($(comm));
        } else {
            $('<a>').addClass('fr red_f').text('正在交易').appendTo($(comm));
        }
        var likes = $('<a>').addClass('fl poster_likes likes').attr('href', 'javascript:void(0)').appendTo($(comm));
        $('<b>').addClass('likes_status').text('喜  欢').appendTo($(likes));
        $('<span>').addClass('red_f poster_like_num').text($(value).attr('span')).appendTo($(likes));

        //第三级
        var share = $('<div>').addClass('np_share').appendTo($(Box));
        var user = $('<a>').addClass('avatar32_f trans07').attr('target', '_blank').attr('href', 'static/'+ $(value).attr('user_href'))
            .attr('user_id', $(value).attr('user_id')).appendTo($(share));
        $('<img>').attr('src', 'static/'+ $(value).attr('user_img')).appendTo($(user));
        var p2 = $('<p>').attr('style', 'margin-left: 42px;').appendTo($(share));
        $('<a>').attr('target', '_blank').attr('href',  'static/'+$(value).attr('user_href')).text($(value).attr('user_name')).appendTo($(p2));
        $('<p>').addClass('t_idt').text($(value).attr('user_info')).appendTo($(share));
        $('<div>').addClass('clear_f').appendTo($(share));
    });
}

//右侧信息栏
function Sidebar(){

    //首先先取到每个按钮的对象
    var prof = $('#prof');
    var asset = $('#asset');
    var brand = $('#brand');
    var broadcast = $('#broadcast');
    var foot = $('#foot');
    var calendar = $('#calendar');

    var close = $('.nav-con-close');

    //接下来就是给每个按钮绑定对应的click事件了
    close.click(function(){
        $('.nav-content').removeClass('sidebar-move-left');
        $('#sidebar').css('border-left','');
        $('.nav-content').addClass('sidebar-move-right');
    });

    prof.click(function(){
        var prof_content = $('#prof-content');

        if($('.nav-content').is('.sidebar-move-left')){
            $('.nav-content').removeClass('sidebar-move-left');
        }

        prof_content.addClass('sidebar-move-left');
        $('#sidebar').css('border-left','1px dotted #000');

        if(prof_content.is('.sidebar-move-right')){
            prof_content.removeClass('sidebar-move-right');
        }
    });

    asset.click(function(){
        var asset_content = $('#asset-content');

        if($('.nav-content').is('.sidebar-move-left')){
            $('.nav-content').removeClass('sidebar-move-left');
        }

        asset_content.addClass('sidebar-move-left');
        $('#sidebar').css('border-left','1px dotted #000');
        if(asset_content.is('.sidebar-move-right')){
            asset_content.removeClass('sidebar-move-right');
        }
    });

    brand.click(function(){
        var brand_content = $('#brand-content');

        if($('.nav-content').is('.sidebar-move-left')){
            $('.nav-content').removeClass('sidebar-move-left');
        }

        brand_content.addClass('sidebar-move-left');
        $('#sidebar').css('border-left','1px dotted #000');
        if(brand_content.is('.sidebar-move-right')){
            brand_content.removeClass('sidebar-move-right');
        }
    });

    broadcast.click(function(){
        var broadcast_content = $('#broadcast-content');

        if($('.nav-content').is('.sidebar-move-left')){
            $('.nav-content').removeClass('sidebar-move-left');
        }

        broadcast_content.addClass('sidebar-move-left');
        $('#sidebar').css('border-left','1px dotted #000');
        if(broadcast_content.is('.sidebar-move-right')){
            broadcast_content.removeClass('sidebar-move-right');
        }
    });

    foot.click(function(){
        var foot_content = $('#foot-content');

        if($('.nav-content').is('.sidebar-move-left')){
            $('.nav-content').removeClass('sidebar-move-left');
        }

        foot_content.addClass('sidebar-move-left');
        $('#sidebar').css('border-left','1px dotted #000');
        if(foot_content.is('.sidebar-move-right')){
            foot_content.removeClass('sidebar-move-right');
        }
    });

    calendar.click(function(){
        var calendar_content = $('#calendar-content');

        if($('.nav-content').is('.sidebar-move-left')){
            $('.nav-content').removeClass('sidebar-move-left');
        }

        calendar_content.addClass('sidebar-move-left');
        $('#sidebar').css('border-left','1px dotted #000');
        if(calendar_content.is('.sidebar-move-right')){
            calendar_content.removeClass('sidebar-move-right');
        }
    });

}