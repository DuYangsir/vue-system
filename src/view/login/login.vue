<template>
  <div class="login-wrap">
      <div class="operation-content">
        <div class="login-title">
          <img src="../../assets/images/login.png" alt="">
        </div>
        <div class="login-body">

          <div class="el-input input-account">
            <input class="el-input__inner" type="text"
                   placeholder="手机号码"
                   @focus="passwordClean = false;accountClean = true && inputAccount"
                   v-model="inputAccount" maxlength="11">
          </div>

          <i class="input-icon-0  el-icon-circle-cross"
             v-if="accountClean"
             @click="handleIconClick()"></i>

          <div class="password-input">
            <el-input
              v-if="passwordShow == true"
              type="text"
              placeholder="密码"
              @change = "passeordChange('P')"
              :maxlength = "maxlengthP"
              v-model="inputPassword"
              @focus="accountClean = false;passwordClean = true && inputPassword"
            >
            </el-input>

            <div class="hide-password" v-if="passwordShow == false">
              <el-input
                type="password"
                placeholder="密码"
                @change = "passeordChange('P')"
                :maxlength = "maxlengthP"
                v-model="inputPassword"
                @focus="accountClean = false;passwordClean = true && inputPassword"
              >
              </el-input>
            </div>

            <i class="input-icon-1  el-icon-circle-cross"
               v-if="passwordClean"
               @click="clearPassword()"></i>
            <i class="input-icon-2 el-icon-minus" @click="passwordSeeClick()"></i>

          </div>

          <p class="forget-password"><a href="javascript:void(0);" @click="goForgetPassword()">忘记密码？</a></p>
          <p class="password-mistake" v-if="passwordMistake">
            <span>
              <i class="el-icon-information"></i>
              用户名或密码错误，请重新输入或
            </span>
            <a href="javascript:void(0);" @click="goResetPassword()">重置密码</a></p>
          <el-button type="primary" @click="primaryGo()">登 录</el-button>
          <p class="login-inquiry">还没有账号？<a href="javascript:void(0);" @click="goSignIn()">注册新账号</a></p>
        </div>


      </div>
      <div class="footer">
        <ul>
          <li><a href="javascript:void(0);">关于我们</a></li>
          <li><a href="javascript:void(0);">合作伙伴</a></li>
          <li><a href="javascript:void(0);">联系我们</a></li>
          <li><a href="javascript:void(0);">法律声明</a></li>
        </ul>
        <p>©2016 上海微兆信息科技有限公司</p>
      </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        inputAccount: '',
        inputPassword: '',
        passwordShow: false,
        passwordClean: false,
        accountClean: false,
        passwordMistake: false,
        maxlengthP: 20,
        minlengthP: 6

      };
    },
    watch: {
      'inputAccount': function(){
        this.accountClean = false
        this.inputAccount = this.inputAccount.replace(/\D/g,'')
        if(this.inputAccount){
          this.accountClean = true
        }else{
          this.accountClean = false
        }
      }
    },
    methods: {
      handleIconClick() {
        this.inputAccount = ''
      },
      passwordSeeClick(){
        this.passwordShow =! this.passwordShow
      },
      clearPassword(){
        this.inputPassword = ''
      },
      passeordChange(x){
        if(this.inputPassword && x == 'P'){
          this.passwordClean = true
        }else{
          this.passwordClean = false
        }
      },
      primaryGo(){
        if(this.inputAccount == '' || this.inputPassword == ''){
          this.passwordMistake = true
          return
        }else{
          this.passwordMistake = false
        }
        //接口验证
        this.$http.get('/api/login',{
        }).then(function(res){
          console.log(res);
          this.$message('登陆成功')
        },function(res){
          console.log(res);
        });

      },
      goForgetPassword(){
        this.$router.push({path:"/forgetPassword"})
      },
      goResetPassword(){
        this.$router.push({path:"/resetPassword"})
      },
      goSignIn(){
        this.$router.push({path:"/signIn"})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped rel="stylesheet/less">
a{
  text-decoration: none;
}
.login-wrap{
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
      text-align: center;
      width: 100%;
      height: 70px;
    }
    .login-body{
      position: relative;
      .input-icon-0, .input-icon-1, .input-icon-2{
        font-size: 14px;
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 44px;
        color: #bfcbd9;
      }
      .password-input{
        position: relative;
        .input-icon-1{
          right: 36px;
        }
        display: inline-block;
        width: 100%;
        .hide-password{
          display: inline-block;
          width: 100%;
        }
      }
      .password-mistake{
        margin-top: 5px;
        width: 100%;
        text-align: center;
        font-size: 14px;
        span{
          color: #e0001b;
          i{
            transform: rotate(180deg);
          }
        }
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
        /*background-color: #3c7dfc;*/
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
  .login-wrap{
    .el-input{
      height: 40px;
      .el-input__inner{
        height: 40px;
      }
    }
    .el-button{
      font-weight: 100;
      height: 40px;
    }
    .hide-password{
      .el-input__inner{
      }
    }
  }
</style>
