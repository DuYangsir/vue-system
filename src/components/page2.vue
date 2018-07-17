<template>
  <div id="moneyRecycle">
    <el-button type="success" @click="dialogVisible = true"  icon="caret-right">资金中心分配收回 Dialog</el-button>

    <el-dialog title="基金产品账户分配收回" :visible.sync="dialogVisible" size="small" :before-close="handleClose">
      <div class="con-box">
        <div class="left-box conlist-box">
          <h3>托管1</h3>



          <p class="m-name">未分配资金</p>
          <p class="m-box" :class="{'m-red': lefttableData.leftChangeNum > 0,'m-green': lefttableData.leftChangeNum < 0}">

          <span class="number-all">{{lefttableData.numberAlls}}</span>
            <!--<span class="number-type">{{lefttableData.type}}</span>-->

            <span v-if="lefttableData.leftChangeNum">
              (
              <span v-if="lefttableData.leftChangeNum > 0">+</span>

              <span>{{lefttableData.leftChangeNum}}</span>

              <!--<span class="number-type">万</span>-->
              )
            </span>

          </p>

        </div>

        <div class="operation-box">
          <!--<template scope="scope">-->
          <div class="comeout-box" :class="{'b-red': ( (tableData[0].inputBorder) && (state.warning || state.warnings) ) || tableData[0].inputBorders }">

          <el-switch v-model="tableData[0].value" @change="inputChange(tableData[0])" on-text="分配" off-text="收回" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0">
              </el-switch>

              <el-input v-model="tableData[0].input" placeholder="请输入内容" @change="inputChange(tableData[0])"></el-input>

              <span class="s right-s" v-if="tableData[0].value == '1' "></span>
              <span class="s left-s" v-if="tableData[0].value == '0' "></span>

            </div>
          <!--</template>-->
        </div>

        <div class="right-box conlist-box">

          <h3>托管1</h3>



          <p class="m-name">已分配资金</p>
          <p class="m-box" :class="{'m-red': tableData[0].changeMon > 0,'m-green': tableData[0].changeMon < 0}">
            <span class="number-all">{{tableData[0].moneys}}</span>
            <!--<span class="number-type">{{tableData[0].type}}</span>-->

            <span v-if="tableData[0].changeMon">
              (
              <span v-if="tableData[0].changeMon > 0">+</span>

              <span>{{tableData[0].changeMon}}</span>

              <!--<span class="number-type">万</span>-->
              )
            </span>

          </p>

        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <span class="warning-box" v-if="state.warning || state.warnings">
          <i class="el-icon-circle-cross icon"></i>
          <span>输入金额过大，不能大于流出方可用资金。</span>
        </span>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" :disabled="state.warning || state.warnings">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        dialogVisible: false,
        state:{
          warning:false,
          warnings:false

        },
        lefttableData: {
          numberAll: '100000',
          leftChangeNum: '',
        },
        tableData: [{
          money: '800',
          changeMon:'',
          value: '1',
          input:'',
        }],
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      inputChange: function(obj){
//        console.log(obj)

        var leftChangeNums = 0;


        for(var i=0;i<this.tableData.length;i++){
          this.tableData[i].moneys = this.tableData[i].money;
//            入金
          if(this.tableData[i].value == '1'){
            if(this.tableData[i].input){
              leftChangeNums -= parseFloat(this.tableData[i].input);
            }
            this.tableData[i].changeMon = this.tableData[i].input;
            if(this.tableData[i].changeMon){
              this.tableData[i].moneys = parseFloat(this.tableData[i].money) + parseFloat(this.tableData[i].changeMon);
            }

            //入金超出总额检测
            this.lefttableData.numberAlls =parseFloat(this.lefttableData.numberAll) + parseFloat(leftChangeNums);
            if(this.lefttableData.numberAlls < 0){
              obj.inputBorder = true;
              this.state.warning = true;
            }else{
              obj.inputBorder = false;
              this.state.warning = false;
            }
//              出金
          }else{
            if(this.tableData[i].input){
              leftChangeNums += parseFloat(this.tableData[i].input);
            }
            this.tableData[i].changeMon = -this.tableData[i].input;
            if(this.tableData[i].changeMon) {
              this.tableData[i].moneys = parseFloat(this.tableData[i].money) + parseFloat(this.tableData[i].changeMon);
            }

            //出金超出总额检测
            this.lefttableData.numberAlls =parseFloat(this.lefttableData.numberAll) + parseFloat(leftChangeNums);


            if(obj.moneys < 0){
              obj.inputBorders = true;
              this.state.warnings = true;
              console.log(obj.inputBorder)

            }else{
              obj.inputBorders = false;
              this.state.warnings = false;
              console.log(111)
            }

            this.tableData[i].moneys < 0 ? this.tableData[i].moneys = 0 : this.tableData[i].moneys = this.tableData[i].moneys;

          }

          if(this.tableData[i].inputBorders){
            this.state.warnings = true;
          }
        }
        //超出输入范围检测：

        this.lefttableData.numberAlls =parseFloat(this.lefttableData.numberAll) + parseFloat(leftChangeNums);
        this.lefttableData.numberAlls < 0 ?  this.lefttableData.numberAlls = 0 : this.lefttableData.numberAlls = this.lefttableData.numberAlls;

        this.lefttableData.leftChangeNum = leftChangeNums;
      }
    },
    created: function () {

      this.lefttableData.numberAlls = this.lefttableData.numberAll;
      for(var i=0;i<this.tableData.length;i++){
        this.tableData[i].moneys = this.tableData[i].money;
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped rel="stylesheet/less">
  h3{
    padding: 0;
    margin: 0;
  }

  #moneyRecycle{
    position: relative;
    color: #1f2d3d;

    .con-box{
      height: 397px;
      width: 100%;

      /*border: 1px #dddddd solid;*/
      /*border-width: 1px 0;*/
      .left-box{
        position: relative;
        width: 303px;
        height: 395px;
        float: left;
        text-align: center;
        border-radius: 2px;
        border: solid 1px #dfe6ec;
      }

      .right-box{
        position: relative;
        width: 303px;
        height: 395px;
        float: right;
        text-align: center;
        border-radius: 2px;
        border: solid 1px #dfe6ec;
      }

      .conlist-box{
        h3{
          font-family: PingFangSC;
          font-size: 14px;
          font-weight: 600;
          text-align: left;
          color: #475669;
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          background-color: #eef1f6;
        }

        .m-name{
          position: absolute;
          bottom: 148px;
          width: 100%;
          height: 22px;
          opacity: 0.75;
          font-family: PingFangSC;
          font-size: 16px;
          color: #8291a3;
        }

        .m-box{
          position: absolute;
          bottom: 110px;
          width: 100%;
          font-size: 16px;
          color: #20a0ff;
          .number-all{
            font-size: 24px;
          }

        }

        .m-red{
          color: #ff5553 !important;
        }

        .m-green{
          color: #13ce66 !important;
        }
      }

    }


    /*三角形*/
    .right-s:after{
      position: absolute;
      right: -3px;
      top: -3px;
      padding: 0;
      margin: 0;
      line-height: 0px;
      font-size: 0px;
      content: '';
      width: 0;
      height: 0;
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      border-left: 14px solid #13ce66;
    }

    .left-s:after {
      position: absolute;
      left: -3px;
      top: -3px;
      padding: 0;
      margin: 0;
      line-height: 0px;
      font-size: 0px;
      content: '';
      width: 0;
      height: 0;

      border-top: 4px solid transparent;
      border-right: 14px solid #ff6262;
      border-bottom: 4px solid transparent;
    }


    /*中间的操作*/
    .operation-box{
      position: absolute;
      top:220px;
      left: 50%;
      margin-left: -150px;
      width: 300px;
      height: 200px;

      .comeout-box{
        height: 75px;
        padding: 15px 0 0 0;

        .s{
          position: relative;
          display: block;
          width: 300px;
          height: 2px;
          margin-top: 20px;
        }

        .right-s{
          background-color: #13ce66;
        }

        .left-s{
          background-color: #ff6262;
        }
      }

    }

    /*底部警告*/
    .warning-box{
      display: inline-block;
      width: 300px;
      text-align: left;
      i{
        color: #ff4949;
      }
      span{
        font-size: 14px;
      }
    }

  }
</style>

<style  lang="less" rel="stylesheet/less" >
  /*默认样式的修改*/
  #moneyRecycle{
    .b-red .el-input__inner{
      border-color: #ff4949;
    }

    .el-table__body-wrapper{
      overflow-x: hidden;
    }

    .el-dialog--small{
      width: 1000px;
    }

    .el-input{
      margin-left: 27px;
      width: 210px;
    }

    .el-switch__label span{
      top: 5px;
      font-size: 12px;
    }

    .cell{
      color: #475669;
    }

    .el-dialog__footer {
      padding: 15px 20px 15px;
    }

    .el-dialog__body{
      padding: 19px 21px;
      margin-top: 20px;
      border: 1px #dddddd solid;
      border-width: 1px 0;
    }
  }

</style>
