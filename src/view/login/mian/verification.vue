<template>

  <div class="verify-image-wrap" data-host="https://auth_services.teambition.com/captcha">
    <div class="visual-captcha">
      <div class="captcha-title">
        <span>请点击下图中的 {{question}} 以获取验证码</span>
        <div class="captcha-refresh" title="刷新图片验证码">
          <i class="el-icon-loading"></i>
        </div>
      </div>
      <div class="group-imgs">

        <div class="img-wrap" v-for="imgList in captchaList">
          <img class="captcha-image" :src="imgList.filePath"
               :data-value="imgList.dataValue"
               @click="imgClick(imgList.dataValue)"
          >
        </div>

      </div>

    </div>
  </div>

</template>

<script>
  export default{
    data() {
      return {
        captchaList:[],
        question: ""
      };
    },
    methods: {
      imgClick(obj){
//        调取接口验证密码

//        假设回答正确：

        this.$emit('imgClick', true)
      }

    },
    mounted:function () {
//      调用接口，获取验证码
      this.captchaList = [
        {
          "filePath": '../../../assets/images/touxiang.jpg',
          "dataValue": '0d6d1305674d55a091dc55d60f3bf58c5e808736'
        },
        {
          "filePath": '../../assets/images/touxiang.jpg',
          "dataValue": '0d6d1305674d55a091dc55d60f3bf58c5e808736'
        },
        {
          "filePath": '../../assets/images/touxiang.jpg',
          "dataValue": '0d6d1305674d55a091dc55d60f3bf58c5e808736'
        },
        {
          "filePath": '../../assets/images/touxiang.jpg',
          "dataValue": '0d6d1305674d55a091dc55d60f3bf58c5e808736'
        },
        {
          "filePath": '../../assets/images/touxiang.jpg',
          "dataValue": '0d6d1305674d55a091dc55d60f3bf58c5e808736'
        },
      ];
      this.question = '太阳'


    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped rel="stylesheet/less">
  .verify-image-wrap{
    position: relative;
    padding: 12px;
    border-radius: 3px;
    font-size: 16px;
    .visual-captcha{
      .captcha-title{
        margin-bottom: 10px;
        .captcha-refresh{
          float: right;
          line-height: 20px;
          cursor: pointer;
          font-size: 20px;
          color: #3DA8F5;
          -webkit-transition: color 218ms;
          -o-transition: color 218ms;
          transition: color 218ms;
          margin-right: -4px;
        }
      }

      .group-imgs{
        .img-wrap{
          display: inline-block;
          width: 38px;
          height: 34px;
          padding: 2px 4px;
          text-align: center;
          cursor: pointer;
          border-radius: 3px;
          -webkit-transition: background 218ms;
          -o-transition: background 218ms;
          transition: background 218ms;
          img{
            width: 30px;
            height: 30px;
            opacity: .8;
            filter: alpha(opacity=80);
            -webkit-transition: opacity 218ms;
            -o-transition: opacity 218ms;
            transition: opacity 218ms;
          }
        }
      }
    }
  }


</style>
