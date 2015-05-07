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