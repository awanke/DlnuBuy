/**
 * Created by Jonny on 3/16/2015.
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
            }
        },"json");
    }

    Countdowntime();
    //监听滚动条
    $(window).scroll(function(){
        //导航栏的高度
        //var detail = $('.module-sf').outerHeight();
        if($(window).scrollTop()>836){
            $('.detail-for-remind').css('position','fixed').css('left','80.5px');
        }else{
            $('.detail-for-remind').css('position','relative').css('left','');
        }

        Positioning();

        // 计算剩余时间
        remainTime();
    });
})

//网页定位导航特效
function Positioning(){
    var top = $(document).scrollTop();
    var menu = $('.tab-menu');
    var item = $('#J_DetailTabMain > div');
    var currentId = '';//当前楼层的id

    item.each(function(){
        var m = $(this);
        var itemTop = m.offset().top;
        if(top>itemTop){
            currentId = "#" + m.attr("id");
        }else{
            return false;
        }
    });

    //J_DetailTabMenu
    var currentLink = menu.find('.current');
    if(currentId&&currentLink.attr('href')!= currentId){
        currentLink.removeClass('current');
        $('#J_DetailTabMenu > li').find('[href='+currentId+']').parent().addClass('current');
        //menu.find('[href='+currentId+']').addClass('current');
    }
};

// 计算剩余时间
function remainTime () {
    var pid = $.query.get('pid');
    $.post('ajax/productTime', {'pid': pid}, function (data) {
        if(data['ret'] = 'success'){
            if(data['time'] = '0'){
                var times = $('.countdown').children('var')
                $(times.get(0)).text(data['timeoutD']);
                $(times.get(1)).text(data['timeoutH']);
                $(times.get(2)).text(data['timeoutM']);
                $(times.get(3)).text(data['timeoutMm']);
                // Countdowntime()
            }else{
                $('.countdown').empty().text(data['time']);
            }
        }else{
            $('.countdown').empty().text('对不起，这个宝贝已经下架了！！');
        }
    }, 'json');
}

// 倒计时功能函数
function Countdowntime() {

    var timeoutTT = setInterval(function(){

        var newtime0 = $($('.countdown').children('var').get(0)).text()
        if(newtime0 >= 0){
            $($('.countdown').children('var').get(0)).text(newtime0)
        }else{
            $($('.countdown').children('var').get(0)).text(00)
            clearInterval(timeoutTT);
        }

        var newtime1 = $($('.countdown').children('var').get(1)).text()
        if(newtime1 >= 0){
            $($('.countdown').children('var').get(1)).text(newtime1)
        }else{
            var newtime1s = $($('.countdown').children('var').get(0)).text() - 1
            $($('.countdown').children('var').get(0)).text(newtime1s)
            $($('.countdown').children('var').get(1)).text(60)
        }

        var newtime2 = $($('.countdown').children('var').get(2)).text()
        if(newtime2 >= 0){
            $($('.countdown').children('var').get(2)).text(newtime2)
        }else{
            var newtim2s = $($('.countdown').children('var').get(1)).text() - 1
            $($('.countdown').children('var').get(1)).text(newtim2s)
            $($('.countdown').children('var').get(2)).text(60)
        }

        var newtime3 = $($('.countdown').children('var').get(3)).text() - 1
        if(newtime3 >= 0){
            $($('.countdown').children('var').get(3)).text(newtime3)
        }else{
            var newtime3s = $($('.countdown').children('var').get(2)).text() - 1
            $($('.countdown').children('var').get(2)).text(newtime3s)
            $($('.countdown').children('var').get(3)).text(60)
        }
    }, 1000);
}

function selectphoto (event) {
    var newphoto = $(event.currentTarget).children().attr('src');
    $('#F_ImgBooth').attr('src',newphoto);
}