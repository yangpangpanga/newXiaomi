function pAjax(obj){
    return new Promise((resolve,reject) => {
        if(window.XMLHttpRequest){
            var xhr = new XMLHttpRequest();
        }else{
            var xhr = ActiveXObject("Microsofe.XMLHTTP")
        }
        var str = "";
        for( attr in obj.data){
            str += attr + '=' + obj.data[attr] + '&';
        }
        str = str.slice(0,str.length-1);
        if(obj.type.toLowerCase() === 'get'){
            if(str != ""){
                xhr.open("get",obj.url+ "?" + str);
                xhr.send();
            }else{
                xhr.open("get",obj.url+ str);
                xhr.send();
            }
        }
        if(obj.type.toLowerCase() === 'post'){
            xhr.open("post",obj.url);
            xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhr.send(str);
        }
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    var data = xhr.responseText;
                    resolve(data);
                }
            }
        }
    })
    
}