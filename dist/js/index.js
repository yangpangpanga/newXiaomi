"use strict";

var _ref;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(function () {
  $('.head').load('../../html/head.html'); //加载头部页面

  $('.bottombox').load('../../html/bottom.html'); //加载尾部页面
  //手机区域划过动态效果

  $('.moves').not('.noan').hover(function () {
    $(this).stop().animate({
      top: -3
    }, 200);
  }, function () {
    $(this).stop().animate({
      top: 0
    }, 200);
  }); //第二个二级导航

  $('.leftbox ul li').mouseenter(function () {
    var num = parseInt($(this).attr('data-index') / 6);
    var num1 = $(this).attr('data-index') % 6;
    var con = $(this).attr('data-con');
    var str = '';

    if (num1 == 0) {
      for (var j = 0; j < num; j++) {
        str += '<ul>';

        for (var i = 0; i < 6; i++) {
          str += "<li><a href=\"../../html/list.html\"><img src=\"../../img/0".concat(i + 1, ".jpg\" alt=\"\">").concat(con, "</a></li>");
        }

        str += '</ul>';
      }

      var width = num1 > 0 ? num + 1 : num;
      $('.rightnav').html(str).css({
        display: 'block',
        width: width * 249
      });
    }

    if (num1 != 0) {
      for (var a = 1; a < num + 2; a++) {
        str += '<ul>';

        if (a == num + 1) {
          for (var b = 0; b < num1; b++) {
            str += "<li><a href=\"../../html/list.html\"><img src=\"../../img/0".concat(b + 1, ".jpg\" alt=\"\">").concat(con, "</a></li>");
          }
        } else {
          for (var b = 0; b < 6; b++) {
            str += "<li><a href=\"../../html/list.html\"><img src=\"../../img/0".concat(b + 1, ".jpg\" alt=\"\">").concat(con, "</a></li>");
          }
        }

        str += '</ul>';
      }

      var width = num1 > 0 ? num + 1 : num;
      console.log(width);
      $('.rightnav').html(str).css({
        display: 'block',
        width: width * 249
      });
    }
  });
  $('.middle-navB').mouseleave(function () {
    console.log('yichul ');
    $('.rightnav').css({
      display: 'none'
    });
  }); //轮播区域的内容

  $('.swiper-slide').map(function () {
    var _this = this;

    $(this).css({
      'border-color': "rgb(".concat(colors(), ",").concat(colors(), ",").concat(colors(), ")")
    });
    $.get('http://jx.xuzhixiang.top/ap/api/detail.php', {
      id: $(this).attr('data-id')
    }).then(function (data) {
      $(_this).children().children().eq(0).children().attr('src', data.data.pimg);
      $(_this).children().children().eq(1).html(data.data.pname);
      $(_this).children().children().eq(2).html(data.data.pdesc);
      $(_this).children().children().eq(3).html(data.data.pprice + '<del>999元</del>');
    });
  }); //手机区域内容

  $.get('http://jx.xuzhixiang.top/ap/api/detail.php', {
    id: $('.bottomlist ul').attr('data-id')
  }).then(function (data) {
    $('.bottomlist ul li').map(function () {
      $(this).children().find('img').attr('src', data.data.pimg);
      $(this).children().children().eq(1).html(data.data.pname);
      $(this).children().children().eq(2).html(data.data.pdesc);
      $(this).children().children().eq(3).html(data.data.pprice);
    });
  }); //家电区域列表

  $.get('http://jx.xuzhixiang.top/ap/api/detail.php', {
    id: $('.houselist ul').attr('data-id')
  }).then(function (data) {
    $('.houselist ul li').not('.nono').map(function () {
      $(this).children().find('img').attr('src', data.data.pimg);
      $(this).children().children().eq(1).html(data.data.pname);
      $(this).children().children().eq(2).html(data.data.pdesc);
      $(this).children().children().eq(3).html(data.data.pprice + '元<del>9999</del>');
    });
  }); //智能区域列表

  $.get('http://jx.xuzhixiang.top/ap/api/detail.php', {
    id: $('.mindlist ul').attr('data-id')
  }).then(function (data) {
    $('.mindlist ul li').not('.nono').map(function () {
      $(this).children().find('img').attr('src', data.data.pimg);
      $(this).children().children().eq(1).html(data.data.pname);
      $(this).children().children().eq(2).html(data.data.pdesc);
      $(this).children().children().eq(3).html(data.data.pprice + '元<del>9999</del>');
    });
  });
  $.get('http://jx.xuzhixiang.top/ap/api/detail.php', {
    id: $('.matchlist ul').attr('data-id')
  }).then(function (data) {
    $('.matchlist ul li').not('.nono').map(function () {
      $(this).children().find('img').attr('src', data.data.pimg);
      $(this).children().children().eq(1).html(data.data.pname);
      $(this).children().children().eq(2).html(data.data.pdesc);
      $(this).children().children().eq(3).html(data.data.pprice + '元<del>9999</del>');
    });
  }); //

  $.get('http://jx.xuzhixiang.top/ap/api/detail.php', {
    id: 197045
  }, function (data) {
    $('.noan p:even').html(data.data.pname);
    $('.noan p:odd').html(data.data.pprice + '元');
    $('.noan img').attr('src', data.data.pimg);
  }); //回到顶部事件

  $(window).scroll(function () {
    if ($('html').scrollTop() >= 5000) {
      $('.backtop').show().click(function () {
        $('html').scrollTop(0);
      });
    }

    if ($('html').scrollTop() <= 5000) {
      $('.backtop').hide();
    }
  });
});

function colors() {
  return parseInt(Math.random() * 266);
} //倒计时区域


var timer = setInterval(function () {
  var now = new Date();
  var future = new Date(2020, 2, 13, 12, 0, 0);
  var times = future.getTime() - now.getTime();
  var hours = parseInt(times / 1000 / 60 / 60);
  var minutes = parseInt((times - hours * 60 * 60 * 1000) / 1000 / 60);
  var num = minutes * 60 * 1000 + hours * 60 * 60 * 1000;
  var seconds = parseInt((times - num) / 1000);
  hours = hours > 9 ? hours : '0' + hours;
  minutes = minutes > 9 ? minutes : '0' + minutes;
  seconds = seconds > 9 ? seconds : '0' + seconds;

  if (hours == 0 && minutes == 0 && seconds == 0) {
    clearInterval(timer);
    $('.leftsale span').html('00');
  }

  $('.leftsale span').eq(0).html(hours);
  $('.leftsale span').eq(1).html(minutes);
  $('.leftsale span').eq(2).html(seconds);
}, 1000); //第一个轮播区域

var swiper = new Swiper('#swiper1', (_ref = {
  speed: 1000,
  spaceBetween: 30,
  effect: 'fade',
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  autoplay: true,
  slidesPerView: 1
}, _defineProperty(_ref, "spaceBetween", 30), _defineProperty(_ref, "loop", true), _defineProperty(_ref, "navigation", {
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev'
}), _ref));

swiper.el.onmouseover = function () {
  //鼠标放上暂停轮播
  swiper.autoplay.stop();
};

swiper.el.onmouseleave = function () {
  swiper.autoplay.start();
}; //第二个轮播区域


var swiper1 = new Swiper('#swiper2', {
  speed: 1000,
  slidesPerView: 4,
  spaceBetween: 14,
  slidesPerGroup: 4,
  autoplay: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
});

swiper1.el.onmouseover = function () {
  //鼠标放上暂停轮播
  swiper1.autoplay.stop();
};

swiper1.el.onmouseleave = function () {
  swiper1.autoplay.start();
};