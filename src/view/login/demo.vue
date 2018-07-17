<template>
  <div class="login-wrap">

    <el-button type="primary" @click="get()">GET请求</el-button>

    <div>
      <verify></verify>
    </div>

  </div>
</template>

<script>
  import verify from './mian/verification'

  export default{
    data() {
      return {

      };
    },
    components: {
      verify
    },
    methods: {
      post:function(){
        this.$http.post('..',{

        },{
          emulateJSON:true
        }).then(function(res){
          alert(res.data);

        },function(res){
          alert(res.status)
        });
      },
      get:function(){
        this.$http.get('/api/add',{

        }).then(function(res){
          console.log(res);
        },function(res){
          console.log(res);
        });
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped rel="stylesheet/less">
  @import "../../assets/style/login.less";

  .login-wrap{
  position: relative;
  padding: 100px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  .operation-box{
    background-color: pink;
    padding-top: 140px;
    width: 340px;
    height: 100%;
    position: absolute;
    left: 50%;
    margin-left: -170px;
    .logo{
      background-image: url("../../assets/images/login.png");
      width: 100%;
      height: 56px;
    }
    .operation-content{
      width: 100%;
      height: 300px;
      background-color: darkcyan;
    }

  }
}
</style>
