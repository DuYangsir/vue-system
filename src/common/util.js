/**
 * Created by Duyangsir on 2017/11/2.
 */

export default {
//  对象的深拷贝
  copyObject(p, c) {
    c = c || {}
    for (var i in p) {
      //  属性i是否为p对象的自由属性
      if (p.hasOwnProperty(i)) {
        //  属性i是否为复杂类型
        if (typeof p[i] === 'object') {
          // 如果p[i]是数组，则创建一个新数组
          // 如果p[i]是普通对象，则创建一个对象
          c[i] = Array.isArray(p[i]) ? [] : {}
          //  递归拷贝复杂类型的属性
          this.copyObject(p[i],c[i])
        }else {
        //  属性是基础类型时，直接拷贝
          c[i] = p[i]
        }
      }
    }
    return c
  },
//  校验电话号码
  checkPhoneNo(x) {
    if(!(/^1[34578]\d{9}$/.test(x))){
      return false
    }else{
      return true
    }
  },
//  是否全是
  checkPassword(x) {
    if(x.length < 6 || x.length > 20){
      return true
    }
    //是否含有汉字
    if(/.*[\u4e00-\u9fa5]+.*$/.test(x)){
      return true
    }
  //  是否全是数字
    if(/^[0-9]*$/.test(x)){
      return true
    }
  //  是否全是英文
    if(/^[A-Za-z]+$ /.test(x)){
      return true
    }

    //不是纯数字或者纯英文，此时判断是否含有数字或者英文任一个就满足条件了
    if(/\d+/.test(x)){
      //  是否  含有数字
      return false
    }else if(/.*[A-Za-z]+.*$/.test(x)){
      //  是否  含有英文
      return false
    }else{
      return true
    }



  }
}
