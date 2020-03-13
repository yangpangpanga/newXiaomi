$(function(){
    //加载头部页面
    $('.headd').load('../../html/head.html');
    $('.footd').load('../../html/bottom.html')
    var id = getCookie('pid');
    //发送ajax请求获取数据
    $.get('http://jx.xuzhixiang.top/ap/api/detail.php',{id})
    .then((data) => {
        data = data.data;
        var str = `<div class="imgs" data-id="${data.pid}"><img src="${data.pimg}" alt=""></div>
        <div class="rightt">
            <h1>${data.pname}</h1>
            <p>${data.pdesc}</p>
            <p>${data.pprice}</p>
            <span class="minus">-</span><input type="text" value= "1" class="pnums"><span class="plus">+</span>
            <input type="button" value="加入购物车">
            <input type="button" value="马上去结算">
        </div>`
        $('.detail').html(str);
          //测试查询购物车商品数量接口
        $('.minus').click(function(){ //减数量
            var s = $('.pnums').val() - 1;
            $('.pnums').val(s)
            if($('.pnums').val() <= 1){
                $('.pnums').val(1)
            }
        })
        $('.plus').click(function(){ //加数量
            $('.pnums').val(Number($('.pnums').val()) + 1)
        })
        $('.rightt input').eq(1).click(function(){//加入购物车
            //调用接口给购物车增加商品
            $.get('http://jx.xuzhixiang.top/ap/api/add-product.php',{
                uid:getCookie('id'),
                pid: $('.imgs').attr('data-id'),
                pnum:Number( $('.pnums').val())
            })          
        })
        $('.rightt input').eq(2).click(function(){//加入购物车
            //进入购物车页面
            location.href = '../../html/cart.html'
          
        })
        
    })

})
function getCookie(key){
    var bigArr = document.cookie.split('; ');
    for( var i = 0;i < bigArr.length; i++){
        var arr = bigArr[i].split('=');
        if(arr[0]=== key){
            return arr[1];
        }
    }
}