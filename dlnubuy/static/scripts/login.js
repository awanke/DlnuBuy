/**
 * Created by Jonny on 3/23/2015.
 */
$(function () {

    //从cookie中取得用户名和保存标签
    var username = $.cookie('username');
    var rmb = $.cookie('rmb');

    $('#loginForm').validate({
        rules:{
            mlsUser:{
                required:true
            },
            password:{
                required:true, minlength:6, maxlength:18
            }
        }
    });

    //判断cookie中用户名和标签是否为空,如果存在就填充在页面中
    if(username!==null && rmb==1){
        $("#mlsUser").val(username);
        $('#agreement').attr('checked', true);
    }

    login();

    //当键盘敲击回车时出发login()
    function enter_login(event) {
      var e = event || window.event;
      var keynum = e.keyCode || e.which;
      if (keynum == 13) {
        login();
      }
    }

});

//登陆函数
function login(){
    $('#loginForm').submit(function () {
       function showRequest(formData, jqForm){
           var form = jqForm[0];
           if(!form.mlsUser.value && !form.password.value){
               return true;
           }
           var queryString = $.param(formData);
           return false;
       }

       function showResponse(data){
           if(data.ret=='success'){
               location.href = 'index.html';
               var mlsUser = $('#mlsUser').val();
               $.cookie('username',mlsUser,{path:'/'},{expires:7});
               $.cookie('userid',data.id,{path:'/'},{expires:7});
               if($('#agreement').prop('checked') == true){
                   var tag = 1;
                   $.cookie('rmb',tag,{path:'/'},{expires:7});
               }
           }else{
               alert('登录失败，请检查网络后重新登陆！！！');
           }
       }

       $(this).ajaxSubmit({
           beforSubmit:showRequest, success:showResponse, dataType:'json'
       });
       return false;
   });
}