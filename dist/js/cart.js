"use strict";

$(function () {
  $.get('http://jx.xuzhixiang.top/ap/api/cart-list.php', {
    //取购物车数据
    id: getCookie('id')
  }).then(function (data) {
    data = data.data;
    var str = '';
    data.forEach(function (value) {
      //渲染页面样式
      str += "<li>\n                <input type=\"checkbox\" class=\"sn\">\n                <p class=\"pi\"><img src=\"".concat(value.pimg, "\" alt=\"\"></p>\n                <span class=\"pt\">").concat(value.pname, "</span>\n                <span class=\"pr\">").concat(value.pprice, "</span>\n                <p data-pid=\"").concat(value.pid, "\"><span class=\"minus\">-</span><input type=\"text\" value=\"").concat(value.pnum, "\" class=\"pnumz\"><span class=\"plus\">+</span></p>\n                <span class=\"sp\">").concat(value.pprice * value.pnum, "</span>\n                <span class=\"del\" data-pid=\"").concat(value.pid, "\">x</span>\n             </li>");
    });
    $('.cartlist').html(str);
    $('.onenum').html($('.cartlist li').length); //给对应的按钮添加点击事件

    $('.checkall').click(function () {
      //全选
      $('.sn').prop('checked', $(this).prop('checked'));
      price(); //计算总价
    });
    $('.sn').click(function () {
      //单选事件
      console.log($('.sn').not($(this)).prop('checked'));
      var count = 0;
      $('.sn').map(function () {
        if ($(this).prop('checked')) {
          count++;
        }
      });

      if (count == $('.sn').length) {
        $('.checkall').prop('checked', true);
      } else {
        $('.checkall').prop('checked', false);
      }

      price();
    });
    $('.minus').click(function () {
      //减数量
      $(this).parent().find('.pnumz').val(Number($(this).parent().find('.pnumz').val()) - 1);

      if ($(this).parent().find('.pnumz').val() <= 1) {
        $(this).parent().find('.pnumz').val(1);
      }

      var pid = $(this).parent().attr('data-pid');
      var pnum = $(this).parent().find('.pnumz').val();
      var pr = $(this).parent().parent().find('.pr').html(); //让总价变

      $(this).parent().parent().find('.sp').html(pr * pnum);
      $.get('http://jx.xuzhixiang.top/ap/api/cart-update-num.php', {
        //更改购物车的信息
        uid: getCookie('id'),
        pid: pid,
        pnum: pnum
      }).then(function () {
        price();
      });
    });
    $('.plus').click(function () {
      //加数量
      $(this).parent().find('.pnumz').val(Number($(this).parent().find('.pnumz').val()) + 1);
      var pid = $(this).parent().attr('data-pid');
      var pnum = $(this).parent().find('.pnumz').val();
      var pr = $(this).parent().parent().find('.pr').html();
      $(this).parent().parent().find('.sp').html(pr * pnum);
      $.get('http://jx.xuzhixiang.top/ap/api/cart-update-num.php', {
        uid: getCookie('id'),
        pid: pid,
        pnum: pnum
      }).then(function () {
        price();
      });
    });
    $('.pnumz').on('change', function () {
      //输入框事件
      if ($(this).val() <= 1) {
        $(this).val(1);
      }

      var pid = $(this).parent().attr('data-pid');
      var pnum = $(this).val();
      var pr = $(this).parent().parent().find('.pr').html(); //让总价变

      $(this).parent().parent().find('.sp').html(pr * pnum);
      $.get('http://jx.xuzhixiang.top/ap/api/cart-update-num.php', {
        uid: getCookie('id'),
        pid: pid,
        pnum: pnum
      }, function () {
        price();
      });
    });
    $('.del').click(function () {
      //删除按钮事件
      $.get('http://jx.xuzhixiang.top/ap/api/cart-delete.php', {
        uid: getCookie('id'),
        pid: $(this).attr('data-pid')
      });
      $(this).parent().remove();
      price(); //计算价格

      $('.onenum').html($('.cartlist li').length);
    });
  });
});

function price() {
  //计算总价
  var sum = 0;
  var count = 0;
  $('.sn').map(function () {
    if ($(this).prop('checked')) {
      sum += Number($(this).siblings().eq(4).html());
      count++;
    }
  });
  $('.totalp').html(sum + '元');
  $('.twonum').html(count);
}

function getCookie(key) {
  var bigArr = document.cookie.split('; ');

  for (var i = 0; i < bigArr.length; i++) {
    var arr = bigArr[i].split('=');

    if (arr[0] === key) {
      return arr[1];
    }
  }
}