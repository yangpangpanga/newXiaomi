"use strict";

$(function () {
  //点击登录按钮
  $('.logins ').click(function () {
    var username = $('#username').val();
    var password = $('#password').val();

    if (username != '' & password != '') {
      $('.login span').css({
        display: 'none'
      });
      $.get('http://jx.xuzhixiang.top/ap/api/login.php', {
        username: username,
        password: password
      }, function (data) {
        console.log(data);

        if (data.code == 0) {
          $('.login span').html('用户名或密码不正确').css({
            display: 'block'
          });
        }

        if (data.code == 1) {
          setCookie("username", data.data.username, 3);
          setCookie("password", data.data.password, 3);
          setCookie("id", data.data.id, 3);
          setCookie("token", data.data.token, 3);
          location.href = 'http://localhost:8080/html/';
        }
      });
    } else if (username == '' || password == '') {
      $('.login span').html('请输入正确的用户名或密码').css({
        display: 'block'
      });
    }
  });
});

function setCookie(key, val, time) {
  var nowDate = new Date();
  nowDate.setDate(nowDate.getDate() + time);
  document.cookie = key + '=' + val + ';expires=' + nowDate;
}