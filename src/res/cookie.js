//增和改
function setCookie (key,val,time){
    var nowDate = new Date();
    nowDate.setDate(nowDate.getDate() + time);
    document.cookie = key + '=' + val +';expires=' + nowDate;
}
//查询
function getCookie(key){
    var bigArr = document.cookie.split('; ');
    for( var i = 0;i < bigArr.length; i++){
        var arr = bigArr[i].split('=');
        if(arr[0]=== key){
            return arr[1];
        }
    }
}
//删除
function removeCookie(key){
    setCookie(key,1,-1);
}