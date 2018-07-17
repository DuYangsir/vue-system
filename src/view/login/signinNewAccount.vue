<template>
  <div class="signin-new-account">
    <div class="operation-content">
      <div class="login-title"></div>
      <p class="login-title-text">注册新账号</p>
      <div class="login-body">
        <el-input
          placeholder="手机号码"
          disabled
          v-model="inputAccount">
        </el-input>

        <div class="sms-wrap">
          <el-input
            type="text"
            placeholder="您的姓名"
            v-model="inputName"
          >
          </el-input>
        </div>

        <div :class="[{'pass-input-error': passwordClean},'password-input']" v-if="passwordShow == true">
          <el-input
            type="text"
            placeholder="密码"
            @change = "passeordChange('P')"
            v-model="inputPassword"
          >
          </el-input>

          <p>
            请将密码设置为6-20位，并且由字母，数字和符号
            <br/>
            两种以上组合，不能与旧密码相同
          </p>


          <i class="input-icon-1  el-icon-circle-cross"
             v-if="passwordClean"
             @click="inputPassword = '';passwordClean = false"></i>

        </div>


        <div class="verification-wrap" v-if="verification">

          <verify @imgClick="imgClicks"></verify>

        </div>

        <div class="sms-wrap">
          <el-input
            type="text"
            placeholder="短信验证码"
            v-model="inputSMS"
            @focus="smsWarning = false"
          >
          </el-input>

          <span class="send-countdown" v-if="sendCountdown == false">重新获取({{time}})</span>
          <a class="send-sms" href="javascript:void(0);"
             v-if="sendCountdown == true"
             @click="timer()">重新获取</a>

          <div class="sms-warning" v-if="smsWarning">
            <i></i>
            <span>
                请输入短信验证码
              </span>
          </div>

        </div>

        <p class="password-mistake" v-if="verificationMistake">
            <span>
              <i class="el-icon-information"></i>
              图片验证码错误次数过多请明天再试
            </span>
        </p>

        <el-button type="primary"
                   :disabled = '!consent'
                   @click="primary()"
        >注 册</el-button>

        <p class="regulations">
          <el-checkbox v-model="consent">我已阅读并同意</el-checkbox>
          <a href="javascript:void(0);" @click="dialogVisible = true">
            《紫山资产管理系统隐私条款》
          </a>
        </p>

        <hr style=" height:0px;border:none;border-top:1px solid #e5e9f2;" />
        <div class="border-button">
          <el-button>使用其他账号注册</el-button>
        </div>
      </div>

      <el-dialog
        title="紫山资产管理系统隐私条款"
        :visible.sync="dialogVisible"
        size="tiny">
        <p class="text-con">
          一、为什么需要二步验证？
          <br/>
          <br/>
          密码被盗的风险存在于用户的许多常见操作中，例如：使用同一密码登录多个网站、下载不明身份网站的文件、点击电子邮箱中的链接等等；
          <br/>
          <br/>
          二步验证可以将别有用心的人阻挡在外，即使他们知道您的密码也无法盗取您的帐户信息
          <br/>
          <br/>
          <br/>
          二、二步验证的工作方式
          <br/>
          <br/>
          1、您需要输入密码
          <br/>
          <br/>
          每当您登录 紫山资产管理系统 时，都需要照常输入您的帐号和密码
          <br/>
          <br/>
          2、您需要输入验证码
          <br/>
          <br/>
          谷歌身份验证器会生成一个验证码，您需要在验证码时间到期前输入这个验证码，才可以成功登录您的 紫山资产管理系统 帐户
          <br/>
          <br/>
          <br/>
          三、二步验证如何保护您的帐户安全
          <br/>
          <br/>
          1、启用二步验证后，即使有人破解了您的密码，他们仍需要借助您的手机才能登录您的帐户
          <br/>
          <br/>
          2、谷歌身份验证器的验证码是专门根据您的帐户生成的，每个验证码都有较短的有效期，且每个验证码只能使用一次
          <br/>
          <br/>
          3、若您不慎遗失了您的手机或卸载了谷歌身份验证器，您仍可以通过备用验证码登录您的帐户，但每个备用验证码只能使用一次，所以请务必将备用验证码打印下来或保存在安全的地方
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false;;consent = false">不同意</el-button>
          <el-button type="primary" @click="dialogVisible = false;consent = true">同意</el-button>
        </span>
      </el-dialog>

    </div>

    <div class="footer">
      <p>©2016 上海微兆信息科技有限公司</p>
    </div>

  </div>
</template>

<script>
  import util from '../../common/util'
  import verify from './mian/verification'


  export default{
    data() {
      return {
        inputAccount: '137****6666',
        inputName: '',
        inputPassword: '',
        inputSMS: '',
        passwordShow: true,
        passwordClean: false,
        accountClean: false,
        passwordMistake: true,
        verification: true,
        consent: false,
        dialogVisible: false,

        sendCountdown: true,
        time: 60,
        smsWarning: false,
        verificationMistake: true

      };
    },
    components: {
      verify
    },
    watch: {
      'inputPassword': function(){
        this.passwordClean = false
      }
    },
    methods: {
      imgClicks(obj){
        console.log(obj)
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
      timer: function(){
        if (this.time > 0) {
          this.sendCountdown = false;
          this.time--;
          setTimeout(this.timer, 1000);
        }else{
          this.sendCountdown = true;
          this.time = 60
        }
      },
      primary: function(){
        if(this.inputSMS == ''){
          this.smsWarning = true
          return
        }

        console.log("111")

        //    密码正则检测
        this.passwordClean = util.checkPassword(this.inputPassword)
        if(this.passwordClean){
          return
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped rel="stylesheet/less">
  /*@import "../../assets/style/login.less";*/

  a{
    text-decoration: none;
  }
.signin-new-account{
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 1000px;
  background-color: #ffffff;
  .operation-content{
    position: absolute;
    left: 50%;
    top: 26%;
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
      margin: 30px 0 30px 0;
    }
    .login-body{
      position: relative;
      .regulations{
        text-align: center;
        font-size: 14px;
        a{
          color: #359ef3;
        }
      }
      .password-mistake{
        position: relative;
        top: -15px;
        margin: 0;
        width: 100%;
        padding-left: 14px;
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
      .sms-wrap{
        position: relative;
        padding: 30px 0;
        .send-sms{
          position: absolute;
          right: 12px;
          top: 40px;
          font-size: 14px;
          color: #3395f2;
        }
        .send-countdown{
          position: absolute;
          left: 247px;
          top: 40px;
          font-size: 14px;
          color: #949ba2;
        }
        .sms-warning{
          position: absolute;
          top: 72px;
          left: 89px;
          width: 158px;
          height: 26px;
          border: 1px solid #c0ccda;
          border-radius: 2px;
          box-shadow: 0 0 4px #949ba2;
          span{
            font-weight: 400;
            font-size: 13px;
            line-height: 26px;
            padding-left: 12px;
          }
          i{
            display: block;
            border-width: 6px;
            border-top-width: 0;
            border-bottom-color: #e6ebf5;
            filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
          }
          i:after{
            content: " ";
            border-width: 6px;
            position: absolute;
            display: block;
            width: 0;
            height: 0;
            border-color: transparent;
            border-style: solid;
            top: -6px;
            left: 25px;
            margin-left: -6px;
            border-top-width: 0;
            border-bottom-color: #fff;
          }

        }
      }
      .verification-wrap{
        height: 80px;
        border: 1px solid #c0ccda;
        border-radius: 4px;
      }
      .prompt-msg{
        margin: 20px 0 30px 0;
        font-size: 14px;
        color: #8492a6;
        font-weight: 100;

      }
      .input-icon-0, .input-icon-1, .input-icon-2{
        font-size: 14px;
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 44px;
        color: #bfcbd9;
      }
      .password-input{
        display: inline-block;
        width: 100%;
        position: relative;
        .input-icon-1{
          right: 36px;
        }

        p{
          color: #949ba2;
          font-size: 14px;
          padding-left: 12px;
        }
      }
      .el-input{
        /*margin-top: 30px;*/
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
      .password-input{
        display: inline-block;
        width: 100%;
        position: relative;
        .input-icon-1{
          right: 13px;
          top: 14px;
          color: #e0001b;
        }

        p{
          color: #949ba2;
          font-size: 14px;
          padding-left: 12px;
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
  .text-con{
    font-size: 14px;
  }
}
</style>
<style lang="less" rel="stylesheet/less">
  .signin-new-account{
    .el-input{
      height: 40px;
      .el-input__inner{
        height: 40px;
      }
    }
    .el-button{
      font-weight: 400;
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
    .el-checkbox__inner{
      width: 16px;
      height: 16px;
    }
    .el-checkbox__inner::after{
      height: 7px;
      left: 4px;
    }
    /*隐私条例*/
    .el-dialog{
      width: 640px;
      max-height: 845px;
      top: 7% !important;
    }
    .el-dialog__body{
      border: 1px solid #e5e9f2;
      border-width: 1px 0 1px 0;
      margin-top: 16px;
      margin-bottom: 5px;
    }
    .el-dialog__title{
      font-size: 18px;
      color: #1f2d3d;
    }
    .el-dialog__footer{
      text-align: center;
      .el-button{
        font-weight: 400;
        width: 88px;
        height: 36px;
      }
    }
    .pass-input-error{
      input{
        border-color: #e0001b;
      }
      p{
        color: #e0001b !important;
      }
    }
  }
</style>
