"use strict";

$(function () {
  //判断是否登录，显示详情
  if (getCookie('username')) {
    $('.middle-top ol').css({
      display: 'none'
    }); //原有隐藏

    $('.willlogina .mycon').html(getCookie('username'));
    $('.willlogina').css({
      display: 'block'
    }).mouseenter(function () {
      //用户名显示
      $('.willlogina  .mycon').css({
        background: '#ffffff'
      });
      $('.willshow').css({
        display: 'block'
      }).mouseleave(function () {
        $('.willlogina  .mycon').css({
          background: '#333333'
        });
        $('.willshow').css({
          display: 'none'
        });
      });
    });
  }

  if (!getCookie('username')) {
    $('.middle-top ol').css({
      display: 'block'
    });
    $('.willlogina').css({
      display: 'none'
    });
  }

  $('.tabchange ul li').not('.none').mouseenter(function () {
    $('.tabB ol').eq($(this).index()).addClass('show').siblings().removeClass('show');
    var which = $(this).index();
    console.log(which);
    var id = $(this).attr('data-id');
    $.get('http://jx.xuzhixiang.top/ap/api/detail.php', {
      id: id
    }, function (data) {
      data = data.data;
      $('.tabB ol').eq(which).children().children().has('img').children().attr('src', data.pimg);
      console.log($('.tabB ol').eq(which).children().find('.money'));
      $('.tabB ol').eq(which).children().find('.money').html(data.pprice);
    });
    $('.tabB').stop().slideDown();
  });
  $('.navT').mouseleave(function () {
    $('.tabB').stop().slideUp();
  });
  $('.nologin').click(function () {
    console.log('click');
    removeCookie('username');
    removeCookie('password');
    removeCookie('id');
    removeCookie('token');
    location.reload();
  });
});

function getCookie(key) {
  var bigArr = document.cookie.split('; ');

  for (var i = 0; i < bigArr.length; i++) {
    var arr = bigArr[i].split('=');

    if (arr[0] === key) {
      return arr[1];
    }
  }
}

function setCookie(key, val, time) {
  var nowDate = new Date();
  nowDate.setDate(nowDate.getDate() + time);
  document.cookie = key + '=' + val + ';expires=' + nowDate;
}

function removeCookie(key) {
  setCookie(key, 1, -1);
}