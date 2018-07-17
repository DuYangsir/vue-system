<template>
  <div class="reset-password-wrap">
    <div class="operation-content">
        <div class="login-title"></div>
        <p class="login-title-text">重置密码</p>
        <div class="login-body">
          <el-input
            placeholder="手机号码"
            disabled
            v-model="inputAccount">
          </el-input>

          <div class="verification-wrap" v-if="verification">

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

          <el-button type="primary" @click="primary()">重置密码</el-button>
          <hr style=" height:0px;border:none;border-top:1px solid #e5e9f2;" />
          <div class="border-button">
            <el-button @click="goLogin()">使用其他账号登录</el-button>
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

  import util from '../../common/util'

  export default{
    data() {
      return {
        inputAccount: '137****6666',
        inputPassword: '',
        inputSMS: '',
        passwordShow: true,
        passwordClean: false,
        accountClean: false,
        passwordMistake: true,
        verification: true,

        sendCountdown: true,
        time: 60,
        smsWarning: false

      }
    },
    watch: {
      'inputPassword': function(){
        this.passwordClean = false
      }
    },
    methods: {
      passwordSeeClick(){
        this.passwordShow =! this.passwordShow
      },
      clearPassword(){
        this.inputPassword = ''
      },
      passeordChange(x){

      },
      timer: function () {
//          发送请求短信验证码接口
        this.$http.post('/api/users/send-sms-captcha',{
          "phoneNumber": "手机号",
          "expireTime": "过期时间（可省略，单位秒）"
        }).then(function(res){
          if(res.body){
            if (this.time > 0) {
              this.sendCountdown = false
              this.time--;
              setTimeout(this.timer, 1000)
            }else{
              this.sendCountdown = true
              this.time = 60
            }
          }else{
            //把电话号码传入下个页面

          }
        },function(res){
          console.log(res);
        });



      },
      primary: function(){
        if(this.inputSMS == ''){
          this.smsWarning = true
          return
        }
        //    密码正则检测
        this.passwordClean = util.checkPassword(this.inputPassword)
        if(this.passwordClean){
          return
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
.reset-password-wrap{
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*min-height: 900px;*/
  background-color: #ffffff;
  .operation-content{
    position: absolute;
    left: 50%;
    top: 30%;
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
      .sms-wrap{
        position: relative;
        padding: 30px 0;
        font-weight: 300;
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
        margin-top: 30px;
        height: 80px;
        border: 1px solid #c0ccda;
        border-radius: 4px;
      }
      .prompt-msg{
        margin: 20px 0 0 0;
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
  .reset-password-wrap{
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
