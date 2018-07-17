/**
 * Created by Duyangsir on 2017/10/20.
 */

// 实例

// ajax({
//   type:"post",
//   url:"login.php",
//   data:{
//     name:"lck",
//     password:"123",
//     age:"18"
//   },
//   success:main,
//   error:errors
// })
// function main(data){
//   console.log(data);
// }
// function errors(data){
//   console.log("失败");
//   console.log(data);
// }


function ajax(obj){
  var ajax = "";
  if(window.XMLHttpRequest){
    ajax = new XMLHttpRequest();
  }else if(window.ActiveXObject){
    ajax = new ActiveXObject("Microsoft.XMLHTTP");
  }
  if(obj.type.toLowerCase() == "get"){
    var url = path(obj.url,obj.data,obj.type);
    console.log(url);
    ajax.open("get",url);
    ajax.send();
  }else if(obj.type.toLowerCase() == "post"){
    ajax.open("post",obj.url);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var data = path(obj.url,obj.data,obj.type);
    ajax.send(data);
  }
  ajax.onreadystatechange = function(){
    //5.判断请求状态
    if(ajax.readyState == 4){
      //6.判断请求的结果
      if(ajax.status == 200){
        //7.获取请求的返回结果
        //一般会需要用方法对结果进行接收和下一步操作
        if(obj.success){
          obj.success(ajax.responseText);
        }
      }else{
        if(obj.error){
          obj.error(ajax.responseText);
        }
      }
    }
  }
}

function path(url,data,type){
  var arr = [];
  for(var keys in data){
    var str = keys+"="+data[keys];
    arr.push(str);
  }
  var datas = arr.join("&");
  if(type == "get"){
    var urls = url+"?"+datas;
    return urls;
  }else if(type == "post"){
    return datas;
  }

}
