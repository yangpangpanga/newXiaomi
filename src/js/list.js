$(function(){
    //加载头部页面
    $('.top').load('../../html/head.html');
    $('.back').load('../../html/bottom.html');
    //发送请求 取数据
 $.get('http://jx.xuzhixiang.top/ap/api/productlist.php',{
        uid:getCookie('id')
    }).then((data) => {//是一个数组
        var list = data.data;
        var str = ''
        list.forEach((val,index) => {
            str += ` <li  class="moves">
            <span><img src="${val.pimg}" alt=""></span>  
            <p>${val.pname}</p>
            <p>${val.pprice}</p>
            <input type="button" value="加入购物车" data-id=${val.pid} class="add">
        </li>`
        });
        $('.list').html(str);
    })
    //点击按钮吧id存在cookie
    $('.list ').on('click','li',function(){
        var val = $(this).find('input').attr('data-id')
        setCookie('pid',val,1);
        console.log('suss')
        location.href = './detail.html'
    })
    //给加入购物车添加点击事件
    $('.list').on('click','input',function(evt){
        evt.stopPropagation();
        // 调用添加购物车接口
        $.get('http://jx.xuzhixiang.top/ap/api/add-product.php',{
            uid:getCookie('id'),
            pid: $(this).attr('data-id'),
            pnum:1 
        })
    })    
})
function setCookie (key,val,time){
    var nowDate = new Date();
    nowDate.setDate(nowDate.getDate() + time);
    document.cookie = key + '=' + val +';expires=' + nowDate;
}
function getCookie(key){
    var bigArr = document.cookie.split('; ');
    for( var i = 0;i < bigArr.length; i++){
        var arr = bigArr[i].split('=');
        if(arr[0]=== key){
            return arr[1];
        }
    }
}