$(function(){
   
    //点击注册按钮效果
    $('#boxchange').click(function(){
        var username = $('#username').val();
       $.get('http://jx.xuzhixiang.top/ap/api/checkname.php',{username})
        .then((data) => {
           if(data.code === 1){ //判断用户名是否存在
                 $('.box').css({display:'none'});
                 $('.number').css({display:'block'}) //切换css样式
                 var num = parseInt(Math.random()* 900000 + 100000);
                 $('.num').html(num);
                             
            }else{
                $('.box span').css({display:'block'})
            }
        })  //下一步点击效果 输入密码验证码
        .then(function(){
            var num = $('.num').html();
            var username = $('#username').val();
            $('#next').click(function(){
                if($('.nums').val() == num){
                    $('.number p').eq(1).css({display:'none'});
                    $.get('http://jx.xuzhixiang.top/ap/api/reg.php',{username,password:num},function(data){
                        if(data.code == 1) { //如果注册成功的就跳转页面
                            console.log(data)
                            location.href = '../html/login.html'
                        }
                        
                    })
                }else{
                    $('.number p').eq(1).css({display:'block'});
                }
             })
            
        })
    })
 
})