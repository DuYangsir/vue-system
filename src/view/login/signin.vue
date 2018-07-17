<template>
  <div class="signin-wrap">
      <div class="operation-content">
        <div class="login-title"></div>
        <div :class="[{'account-error': accountClean},'login-body']">

          <div class="el-input input-account">
            <input class="el-input__inner" type="text"
                   placeholder="手机号码"
                   @focus="accountClean = false"
                   v-model="inputAccount" maxlength="11">
          </div>
          <i class="input-icon-0  el-icon-circle-cross"
             v-if="accountClean"
             @click="handleIconClick()"></i>

          <el-button type="primary" @click="checkPhoneNo()">开始注册</el-button>
          <p class="login-go"><a href="javascript:void(0);" @click="goLogin()">账号登录</a></p>
        </div>
      </div>
      <div class="footer">
        <ul>
          <li><a href="javascript:void(0);">关于我们</a></li>
          <li><a href="javascript:void(0);">合作伙伴</a></li>
          <li><a href="javascript:void(0);">联系我们</a></li>
          <li><a href="javascript:void(0);">法律声明</a></li>
        </ul>
        <p>©2016 </p>
      </div>
  </div>
</template>

<script>
  import util from '../../common/util'

  export default{
    data() {
      return {
        inputAccount: '',
        accountClean: false,
        maxlengthP: 11
      };
    },
    watch: {
      'inputAccount': function(){
        this.accountClean = false
        this.inputAccount = this.inputAccount.replace(/\D/g,'')
      }
    },
    methods: {
      handleIconClick() {
        this.inputAccount = ''
        this.accountClean = false
      },
      checkPhoneNo() {
        if(!util.checkPhoneNo(this.inputAccount)){
          this.accountClean = true
        }else{
        //检测电话号码是否被注册过
          this.$http.post('/api/users/verify',{
            "userAccount":this.inputAccount,
          }).then(function(res){
            console.log(res);
            //已存在就登陆
            if(res.body){
              this.$router.push({path:"/signinNewAccount"})
            }else{
              //把电话号码传入下个页面
              this.$router.push({path:"/loginAccount"})
            }
          },function(res){
            console.log(res);
          });


        }
      },
      goLogin(){
        this.$router.push({path:"/login"})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped rel="stylesheet/less">
  a{
    text-decoration: none;
  }
  .signin-wrap{
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 700px;
  background-color: #ffffff;
  .operation-content{
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -170px;
    margin-top: -170px;
    width: 340px;
    height: 340px;
    .login-title{
      background: url("../../assets/images/login.png") 6px 0 no-repeat;
      background-size: contain;
      width: 100%;
      height: 91px;
      margin-bottom: 20px;
    }
    .login-body{
      position: relative;
      .input-icon-0, .input-icon-1, .input-icon-2{
        font-size: 14px;
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 44px;
        color: #e0001b;
      }
      .login-go{
        width: 100%;
        text-align: center;
        font-size: 14px;
        a{
          color: #359ef3;
        }
      }
      .el-input{
        margin-top: 30px;
      }
      .el-button{
        width: 100%;
        margin-bottom: 10px;
      }
      .forget-password{
        text-align: right;
        font-size: 14px;
        padding: 6px 0;
        margin: 0;
        a{
          color: #8492a6;
        }
      }
      .login-inquiry{
        text-align: center;
        color: #878787;
        a{
          color: #359ef3;
        }
      }
    }
  }
  .footer{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 105px;
    ul{
      padding: 0;
      margin: 0;
      width: 100%;
      text-align: center;
      li{
        display: inline-block;
        width: 134px;
        height: 15px;
        border-right: 2px #20a0ff solid;
        a{
          position: relative;
          top: -4px;
          color: #1f2d3d;
          font-size: 14px;
        }
      }
    }
    p{
      position: absolute;
      left: 0;
      bottom: 23px;
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #878787;
    }
  }
}


</style>
<style lang="less" rel="stylesheet/less">
  .signin-wrap{
    .el-input{
      height: 40px;
      .el-input__inner{
        height: 40px;
      }
    }
    .el-button{
      margin-top: 30px;
      font-weight: 100;
      height: 40px;
    }
    .hide-password{
      .el-input__inner{
      }
    }
    .account-error{
      .input-account{
        input{
          border-color: #e0001b;
        }
      }
    }
  }
</style>
