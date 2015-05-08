/**
 * Created by Jonny on 5/7/2015.
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

    waterfall();
    add_proudctlike();

    //根据下拉判断是否显示隐藏导航
    $(window).scroll(function(){

        //这里我的顶部导航栏的top为116，所以监听的高度就为116了
        if($(window).scrollTop()>116){
            $(".topBox").show();
        }else{
            $(".topBox").hide();
        }
    });

    //自动返回顶端
    $('.returnTop').click(function(){
        retunTop();
    });

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

    $boxs.each(function(index, value){
        var h = $boxs.eq(index).outerHeight();
        if( index < cols ){
            hArr[index] = h; //第一行中的num个块框 先添加进数组HArr
        }else{
            var minH = Math.min.apply( null, hArr );//数组HArr中的最小值minH
            var minHIndex = $.inArray( minH, hArr );
            $( value).css({
                'position':'absolute','top':minH+'px', 'left':minHIndex*w + 'px'
            });
            //数组 最小高元素的高 + 添加上的展示框[i]块框高
            hArr[minHIndex] += $boxs.eq(index).outerHeight();//更新添加了块框后的列高
        }
    });
}

function add_proudctlike() {
    $('a[name=pdname]').click(function (event) {
        var events = event.target.parentElement;
        var pid = $(events).attr('pid');

        $.post('../add/proudctlike',{pid:pid},function (data) {
            if(data.ret == 'success'){
                $(events).children('span').text(data['num']);
                $(events).children('b').css('background-color','#ccc');
            }
        }, 'json');
    });
}