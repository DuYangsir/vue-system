<template>
  <div class="reset-succeed-wrap">
      <div class="operation-content">
        <div class="login-title"></div>
        <p class="login-title-text">
          {{inputAccount}}
          <br/>
          密码重置成功，请前往登录
        </p>
        <div class="login-body">
          <el-button type="primary">前往登录</el-button>
          <hr style=" height:0px;border:none;border-top:1px solid #e5e9f2;" />
          <div class="border-button">
            <el-button>使用其他账号登录</el-button>
          </div>
          <p class="prompt-msg">
            如无法通过手机找回密码，请联系客服寻求帮助。<br/>
            客服电话：021-54509988-7167
          </p>
        </div>
      </div>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        inputAccount: '+86-137****9999',
        accountClean: false,
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

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped rel="stylesheet/less">
  a{
    text-decoration: none;
  }
.reset-succeed-wrap{
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
      background: url("../../assets/images/login.png") 6px 0 no-repeat ;
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
      margin-bottom: 30px;
    }
    .login-body{
      position: relative;

      .prompt-msg{
        margin: 20px 0 0 0;
        font-size: 14px;
        color: #949ba2;
        font-weight: 100;
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
          color: #949ba2;
        }
      }

    }
  }
}
</style>
<style lang="less" rel="stylesheet/less">
  .reset-succeed-wrap{
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
