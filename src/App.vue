<template>
  <div id="app" :class="appBoxClass()">
    <div id="nav" :class="navBoxClass()" @mouseleave="navOpen = false" @mouseenter="navOpen = true">
      <div class="fixed-nav" @click="fixedNav =! fixedNav">
        <i class="el-icon-menu" :class="fixedBoxClass()"></i>
      </div>
      <el-menu default-active="1"  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
               theme="dark" :default-openeds="defaultOpeneds">

        <el-submenu index="1">
          <template slot="title"><i class="el-icon-document"></i>资金中心</template>
          <el-menu-item-group>
            <template slot="title">资金中心弹框组</template>
            <el-menu-item index="1-1" @click="goPage1">账户出入库</el-menu-item>
            <el-menu-item index="1-2" @click="goPage2">分配收回</el-menu-item>
            <el-menu-item index="1-3" @click="goPage3">调拨已分配资金</el-menu-item>
            <el-menu-item index="1-4" @click="goPage4">调拨已分配资金分配</el-menu-item>
            <el-menu-item index="1-5" @click="goPage5">资金出入封闭圈流水</el-menu-item>
          </el-menu-item-group>
        </el-submenu>


        <el-submenu index="2">
          <template slot="title"><i class="el-icon-star-off"></i>投资决策页面</template>
          <el-submenu index="2-1">
            <template slot="title">投资决策业务模块</template>
            <el-menu-item index="2-0" @click="goPage20">组件测试页</el-menu-item>
            <el-menu-item index="2-1" @click="goPage21">投资决策右侧弹出界面</el-menu-item>
            <el-menu-item index="2-2" @click="goPage22">持仓</el-menu-item>
            <el-menu-item index="2-3" @click="goPage23">二级联动</el-menu-item>
          </el-submenu>
        </el-submenu>


        <el-submenu index="3">
          <template slot="title"><i class="el-icon-check"></i>登录页面</template>

          <el-submenu index="3-1">
            <template slot="title">登录页面</template>
            <el-menu-item index="3-0" @click="goPage30">公用模板</el-menu-item>
            <el-menu-item index="3-1" @click="goPage31">登录</el-menu-item>

          </el-submenu>
          <el-submenu index="3-2">
            <template slot="title">注册页面</template>
            <el-menu-item index="3-20" @click="goPage320">注册</el-menu-item>
            <el-menu-item index="3-21" @click="goPage321">已存在</el-menu-item>
            <el-menu-item index="3-22" @click="goPage322">注册账户</el-menu-item>

          </el-submenu>

          <el-submenu index="3-3">
            <template slot="title">重置</template>
            <el-menu-item index="3-2" @click="goPage32">忘记密码</el-menu-item>
            <el-menu-item index="3-30" @click="goPage330">重置密码</el-menu-item>
            <el-menu-item index="3-31" @click="goPage331">重置成功</el-menu-item>

          </el-submenu>
        </el-submenu>


        <!--<el-menu-item index="2"><i class="el-icon-menu"></i>导航二</el-menu-item>-->
        <!--<el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>-->
      </el-menu>
    </div>





    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      defaultOpeneds: [0],
      navOpen: false,
      fixedNav: false
    }
  },
  methods:{
    goPage1: function () {
      this.$router.push({path:"/page1"})
    },
    goPage2: function () {
      this.$router.push({path:"/page2"})
    },
    goPage3: function () {
      this.$router.push({path:"/page3"})
    },
    goPage4: function () {
      this.$router.push({path:"/page4"})
    },
    goPage5: function () {
      this.$router.push({path:"/page5"})
    },
    goPage20: function () {
      this.$router.push({path:"/investtest"})
    },
    goPage21: function () {
      this.$router.push({path:"/invest"})
    },
    goPage22: function () {
      this.$router.push({path:"/holdAposition"})
    },
    goPage23: function () {
      this.$router.push({path:"/select2"})
    },
    goPage30: function () {
      this.$router.push({path:"/logindemo"})
    },
    goPage31: function () {
      this.$router.push({path:"/login"})
    },
    goPage32: function () {
      this.$router.push({path:"/forgetPassword"})
    },
    goPage320: function () {
      this.$router.push({path:"/signIn"})
    },
    goPage321: function () {
      this.$router.push({path:"/loginAccount"})
    },
    goPage330: function () {
      this.$router.push({path:"/resetPassword"})
    },
    goPage331: function () {
      this.$router.push({path:"/resetSucceed"})
    },
    goPage322: function () {
      this.$router.push({path:"/signinNewAccount"})
    },


    navBoxClass: function () {
      if(this.fixedNav){
          return ''
      }
      return this.navOpen == false ? 'close-nav':''
    },

    appBoxClass: function () {
      return this.fixedNav == true ? 'close-nav-app':''
    },

    fixedBoxClass(){
      return this.fixedNav == true ? 'fixed-box-class':''
    },


    handleOpen(key, keyPath) {
//      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
//      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped lang="less"  rel="stylesheet/less">

  p{
    text-align: center;
  }

  #app{
    transition: all .3s;
    padding-left: 30px;
    margin-left: 30px;
    height: 100%;
    background-color: #fdf7eb;
    overflow: auto;
  }

  #nav{
    width: 200px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: #1f2d3d;

  }
  .fixed-nav{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
  }

  .close-nav#nav{
    width: 30px;
    overflow: hidden;
  }

  .close-nav-app#app{
    padding-left: 170px;
  }

  .fixed-box-class{
    transition: all .3s;
    color: #20a0ff;
  }

</style>

<style  lang="less" rel="stylesheet/less" >
  body,html{
    margin: 0;
    height: 100%;
  }
  h1{
    margin: 0;
    text-align: center;
  }
  /*默认样式的修改*/
  #nav{
    overflow: hidden;
    transition: all .3s;
    cursor: pointer;

    .el-menu-item-group__title{
      width: 100%;
      height: 18px;
      overflow: hidden;
      padding-bottom: 15px;
    }

    .el-submenu__title{
      transition: all .6s;
      .el-icon-message{
        transition: all .6s;
      }
    }
    .el-menu-item-group{
      transition: all .6s;
      overflow: hidden;
    }
    .el-submenu__icon-arrow{
      transition: all .6s;
    }
  }

  .close-nav#nav{
    .el-submenu__title{
      padding-left: 2px !important;
      width: 200px;
      .el-icon-message{
        padding-right: 20px;
      }

    }
    .el-menu-item-group{
      width: 0px;
      height: 0px;
    }
    .el-submenu__icon-arrow{
      right: -20px;
    }
  }

</style>
