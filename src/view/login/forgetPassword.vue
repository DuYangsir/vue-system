<template>
  <div class="forget-password-wrap">
      <div class="operation-content">
        <div class="login-title"></div>
        <p class="login-title-text">忘记密码</p>
        <div class="login-body">
          <div class="el-input input-account">
            <input class="el-input__inner" type="text"
                   placeholder="手机号码"
                   v-model="inputAccount"
                   maxlength="11">
          </div>

          <i class="input-icon-0  el-icon-circle-cross"
             v-if="accountClean"
             @click="handleIconClick()"></i>

          <p class="no-found-account" v-if="noFoundAccount">
            <i class="el-icon-information"></i>
            账号不存在，请重新输入</p>
          <el-button type="primary" @click="foundAccountClick()">重置密码</el-button>

          <p class="prompt-msg">
            如无法通过手机找回密码，请联系客服寻求帮助。<br/>
            客服电话：021-54509988-7167
          </p>
        </div>
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
        noFoundAccount: false,
      };
    },
    watch: {
      'inputAccount': function(){
        this.accountClean = false
        this.noFoundAccount = false
        this.inputAccount = this.inputAccount.replace(/\D/g,'')
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
      foundAccountClick(){

//        如果不是手机号码，直接报错
        if(!util.checkPhoneNo(this.inputAccount)){
          this.noFoundAccount = true
        }else{
//检测是否存在
          this.$http.post('/api/users/send-sms-captcha',{
            "userAccount": this.inputAccount,
          }).then(function(res){
            //存在
            if(res.body){
              this.noFoundAccount = false
              this.$router.push({path:"/resetPassword"})
            }else{
              //把电话号码传入下个页面
              this.noFoundAccount = true
            }
          },function(res){
            console.log(res);
          });

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
.forget-password-wrap{
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
    .no-found-account{
      position: relative;
      top: 15px;
      font-size: 14px;
      color: #e0001b;
      padding-left: 10px;
      margin: 0;
      i{
        transform: rotate(180deg);
      }
    }
    .prompt-msg{
      margin: 20px 0 0 0;
      font-size: 14px;
      color: #8492a6;
      font-weight: 100;
    }
    .login-title-text{
      font-weight: 300;
      width: 100%;
      font-size: 18px;
      text-align: center;
      color: #8492a6;
      margin: 30px 0 0 0;
    }
    .login-title{
      background: url("../../assets/images/login.png") 6px 0 no-repeat;
      background-size: contain;
      width: 100%;
      height: 91px;
      margin-bottom: 20px;
    }
    .login-body{
      position: relative;
      .el-button{
        width: 100%;
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
}
</style>
<style lang="less" rel="stylesheet/less">
  .forget-password-wrap{
    .el-input{
      height: 40px;
      margin-top: 30px;
      .el-input__inner{
        height: 40px;
      }
    }
    .el-button{
      margin: 30px 0 0 0;
      height: 40px;
      /*background-color: #3c7dfc;*/
      font-weight: 100;
    }
    .hide-password{
      .el-input__inner{
      }
    }
  }
</style>
