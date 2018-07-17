<template>
  <div class="login-wrap-signin">
      <div class="operation-content">
        <div class="login-title"></div>
        <p class="login-title-text">该账号已经存在，请直接登录</p>
        <div class="login-body">
          <el-input
            placeholder="手机号码"
            v-model="inputAccount"
            disabled
            @focus="passwordClean = false;accountClean = true && inputAccount">
          </el-input>



          <div class="password-input">
            <el-input
              v-if="passwordShow == true"
              type="text"
              placeholder="密码"
              @change = "passeordChange('P')"
              v-model="inputPassword"
              @focus="passwordClean = true && inputPassword"
            >
            </el-input>

            <div class="hide-password" v-if="passwordShow == false">
              <el-input
                type="password"
                placeholder="密码"
                @change = "passeordChange('P')"
                v-model="inputPassword"
                :maxlength = "maxlengthP"

                @focus="passwordClean = true && inputPassword"
              >
              </el-input>
            </div>

            <i class="input-icon-1  el-icon-circle-cross"
               v-if="passwordClean"
               @click="clearPassword()"></i>
            <i class="input-icon-2 el-icon-minus" @click="passwordSeeClick()"></i>

          </div>

          <p class="forget-password"><a href="javascript:void(0);">忘记密码？</a></p>
          <p class="password-mistake" v-if="passwordMistake">
            <span>
              <i class="el-icon-information"></i>
              用户名或密码错误，请重新输入或
            </span>
            <a href="javascript:void(0);">重置密码</a></p>
          <el-button type="primary" @click="primaryGo()">登 录</el-button>
          <hr style=" height:0px;border:none;border-top:1px solid #e5e9f2;" />
          <div class="border-button">
            <el-button>使用其他账号注册</el-button>
          </div>

        </div>


      </div>
      <div class="footer">
        <p>©2016 上海微兆信息科技有限公司</p>
      </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        inputAccount: '13764329999',
        inputPassword: '',
        passwordShow: false,
        passwordClean: false,
        passwordMistake: false,
        maxlengthP: 20
      };
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

        if(this.inputAccount && x == 'A'){
          this.accountClean = true
        }else{
          this.accountClean = false
        }

      },
      primaryGo(){
        if(this.inputAccount == '' || this.inputPassword == ''){
          this.passwordMistake = true
        }else{
          this.passwordMistake = false
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped rel="stylesheet/less">
  a{
    text-decoration: none;
  }
.login-wrap-signin{
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
    top: 40%;
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
    .login-title-text{
      font-weight: 300;
      width: 100%;
      font-size: 18px;
      text-align: center;
      color: #8492a6;
      margin: 30px 0 0 0;
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
          color: #949ba2;
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

    p{
      position: absolute;
      left: 0;
      bottom: 23px;
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #949ba2;
    }
  }
}
</style>
<style lang="less" rel="stylesheet/less">
  .login-wrap-signin{
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
    .border-button{
      width: 100%;
      margin-top: 20px;
      display: inline-block;
      .el-button{
        background-color: #e9f3ff;
        border: 1px solid #aad3ff;
        color: #5ba8ff;
      }
      .el-button:hover{
        border-color: #20a0ff;
        background: #20a0ff;
        color: #ffffff;
      }
    }
  }
</style>
