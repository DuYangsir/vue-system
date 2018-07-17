<template>
  <div class="wrap">
    <h1>投资决策组件测试页</h1>

    <i class="btn1">
      <selecttow @listClick="clickOne" :listdata="data"></selecttow>
    </i>


    <div class="btn1 btn3">
      <selecttow @listClick="clickOne" :listdata="data"></selecttow>
    </div>

    <div class="btn1 btn2">
      <selecttow @listClick="clickOne" :listdata="data"></selecttow>
    </div>
    <h1></h1>
    <hr/>
    <el-tooltip placement="left">
      <div slot="content" v-html="testlist"></div>
      <el-button>Top center</el-button>
    </el-tooltip>


    <ul>
      <li>111</li>
    </ul>
  </div>

</template>

<script>
  import selecttow from './select2'
  export default{

    mounted(){
      for(let key in this.errors){
        
        this.testlist += `• ${this.errors[key]}<br/>`
      }

    },
    data() {
      return {
        testlist:'',
        errors:{
          entrustVolume: "委托数量超出最大下单量"},
        data: [{
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'chaoyang',
              label: '朝阳'
            }, {
              value: 'haidian',
              label: '海淀'
            }, {
              value: 'changping',
              label: '昌平'
            }, {
              value: 'shunyi',
              label: '顺义'
            }
          ]
        }, {
          value: 'shanghai',
          label: '上海',
          children: [
            {
              value: 'baoshan',
              label: '宝山'
            }, {
              value: 'jiading',
              label: '嘉定'
            }
          ]
        },{
          value: '哈哈',
          label: '哈哈'
        }]
      };
    },
    components: {
      selecttow
    },
    methods: {
      clickOne: function (obj) {
        console.log(obj)
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped rel="stylesheet/less">
  h1{
    text-align: center;
    padding: 30px;
    overflow: hidden;
  }
  .wrap{
    width: 100%;
  }
  .btn1{
    position: relative;
    float: left;
    width: 30px;
    height: 30px;
    background-color: #42b983;
  }
  .btn2{
    background-color: peru;
    float: right;
    margin-right: 130px;
  }
  .btn3{
    background-color: palevioletred;
    float: right;
    margin-right: 30px;
  }
</style>

