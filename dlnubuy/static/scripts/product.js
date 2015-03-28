/**
 * Created by Jonny on 3/16/2015.
 */
$(function(){

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