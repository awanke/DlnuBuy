/**
 * Created by Jonny on 3/23/2015.
 */
$(function(){

     //验证表单提交数据的合法性
    $('#registerForm').validate({
        rules:{
            mobile:{
                required:true, minlength:11
            },
            nickname:{
                required:true, minlength:2
            },
            password:{
                required:true, minlength:6, maxlength:18
            }
        }
    });



    $('#password').focus(function () {
        $('.confpass').css('display','block');
    });


    var mobile = $('#mobile').val();
    var nickname = $('#nickname').val();
    var passwordnow = false;

    $('#conf_password').blur(function () {
        var password1 = $('#password').val();
        var password2 = $(this).val();
        if(password1 == password2 && password1!=''){
            passwordnow = true;
            $('#conf_password').next().empty();
            $('#conf_password').after("<span>密码相同</span>");
        }else{
            $('#conf_password').next().empty();
            $('#conf_password').after("<span>密码不一致</span>");
        }
    });


    $('#registerForm').submit(function () {
        function showRequest(formData, jqForm){
            var form = jqForm[0];
            if(!form.mobile.value && form.mobile.length>11 && !form.nickname.value){
                return true;
            }
            var queryString = $.param(formData);
            return false;
        }

        function showResponse(data){
            if(data.ret=='success'){
                location.href = 'index.html';
            }else{
                alert('注册失败，请认真检查后重新提交！！！');
            }
        }

       $(this).ajaxSubmit({
           beforSubmit:showRequest,
           success:showResponse,
           dataType:'json'
       });
        return false;
    });

});
