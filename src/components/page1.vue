<template>
  <div id="moneyAccess">
    <el-button type="success" @click="dialogVisible = true" icon="caret-right">资金账户出入金 Dialog</el-button>

    <el-dialog title="资金账户出入金" :visible.sync="dialogVisible" size="small" :before-close="handleClose">
      <div class="con-box">
        <div class="left-box">
          <h3>托管户</h3>
          <p class="m-name">托管户余额</p>
          <p class="m-box" :class="{'m-red': lefttableData.leftChangeNum > 0,'m-green': lefttableData.leftChangeNum < 0}">
            <span class="number-all">{{lefttableData.numberAlls}}</span>
            <span class="number-type">{{lefttableData.type}}</span>

            <span v-if="lefttableData.leftChangeNum">
              (
              <span v-if="lefttableData.leftChangeNum > 0">+</span>

              <span>{{lefttableData.leftChangeNum}}</span>

              <!--<span class="number-type">万</span>-->
              )
            </span>

          </p>

        </div>
        <div class="right-box">
          <el-table :data="tableData" style="width: 630px" height="397">
            <el-table-column  label="出入金额" width="330">

              <template scope="scope">
                <div class="comeout-box" :class="{'b-red': scope.row.inputBorder }">
                  <el-switch v-model="scope.row.value" @change="inputChange(scope.row)" on-text="入金" off-text="出金" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0">
                  </el-switch>
                  <el-input v-model="scope.row.input" placeholder="请输入内容" type="number" @input="inputChange(scope.row)"></el-input>

                  <span class="s right-s" v-if="scope.row.value == '1' "></span>
                  <span class="s left-s" v-if="scope.row.value == '0' "></span>

                </div>
              </template>

            </el-table-column>
            <el-table-column label="资金账户" sortable width="180">
              <template scope="scope">
                <div class="name-box">
                  <p>
                    <span>{{scope.row.code}}</span>
                    <span>{{scope.row.name}}</span>
                  </p>
                  <p class="account">{{scope.row.pro}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="可取资金" sortable width="120">
              <template scope="scope">
                <div class="money-box" :class="{'m-red': scope.row.changeMon > 0,'m-green': scope.row.changeMon < 0}">
                  <p>{{scope.row.moneys}} {{scope.row.type}}</p>
                  <p v-if="scope.row.changeMon">(

                    <span v-if="scope.row.changeMon > 0">+</span>

                    {{scope.row.changeMon}}
                    {{scope.row.changeType}}
                    )</p>
                </div>
              </template>
            </el-table-column>

          </el-table>
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
import Vue from 'vue'

  export default{
    data() {
      return {
        dialogVisible: false,
        state:{
          warning:false,
          warnings:false

        },
        lefttableData: {
          numberAll: '10000',
          leftChangeNum: ''
        },
        tableData: [
          {
            id: 1,
            name: '海通证券',
            code: '135357',
            pro: '普通资金账户',
            money: '800',

            value: '1',
            input:'',
            inputBorder: false,
            inputBorders: false,
            changeMon:'',
          }
        ],
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

        let leftChangeNums = 0
        let numberAll = 0

        // 计算出当前的总值:
        for(let i=0;i<this.tableData.length;i++){
          this.tableData[i].moneys = this.tableData[i].money;
          // 入金
          if(this.tableData[i].value === '1'){
            if(this.tableData[i].input){
              leftChangeNums -= parseFloat(this.tableData[i].input);
            }
            //入金超出总额检测
            numberAll = parseFloat(this.lefttableData.numberAll) + parseFloat(leftChangeNums)
            // 出金
          }else{
            if(this.tableData[i].input){
              leftChangeNums += parseFloat(this.tableData[i].input);
            }
            // 出金超出总额检测
            numberAll = parseFloat(this.lefttableData.numberAll) + parseFloat(leftChangeNums)
            
          }
        }

        // 以获取计算结果  numberAllnumber

        leftChangeNums = 0

        for(let i=0;i<this.tableData.length;i++){
          this.tableData[i].moneys = this.tableData[i].money;
            // 入金
          if(this.tableData[i].value === '1'){
            if(this.tableData[i].input){
              leftChangeNums -= parseFloat(this.tableData[i].input);
            }
            this.tableData[i].changeMon = this.tableData[i].input;
            if(this.tableData[i].changeMon){
              this.tableData[i].moneys = parseFloat(this.tableData[i].money) + parseFloat(this.tableData[i].changeMon);
            }

            // 入金超出总额检测
            this.lefttableData.numberAlls =parseFloat(this.lefttableData.numberAll) + parseFloat(leftChangeNums)
            
            if(numberAll < 0){
              // console.log(this.tableData[i].id + "-单true" + numberAll)
              if(obj.id === this.tableData[i].id){
                this.tableData[i].inputBorder = true;
              }
              this.state.warning = true;
            }else{
              // console.log(this.tableData[i].id + "-单false" + numberAll)
              if(obj.id === this.tableData[i].id){
                this.tableData[i].inputBorder = false;
              }
              this.state.warning = false;
            }
            // 出金
          }else{
            if(this.tableData[i].input){
              leftChangeNums += parseFloat(this.tableData[i].input);
            }
            this.tableData[i].changeMon = -this.tableData[i].input;
            if(this.tableData[i].changeMon) {
              this.tableData[i].moneys = parseFloat(this.tableData[i].money) + parseFloat(this.tableData[i].changeMon);
            }
            // 出金超出总额检测
            this.lefttableData.numberAlls = parseFloat(this.lefttableData.numberAll) + parseFloat(leftChangeNums)

            if(this.tableData[i].moneys < 0){
              if(obj.id === this.tableData[i].id){
                this.tableData[i].inputBorder = true;
              }
            }else{
              if(obj.id === this.tableData[i].id){
                this.tableData[i].inputBorder = false;
              }
            }
            this.tableData[i].moneys < 0 ? this.tableData[i].moneys = 0 : this.tableData[i].moneys = this.tableData[i].moneys;
          }
        }

        // 是否有出金超出
        let num = false
        for(let i=0;i<this.tableData.length;i++){
          if(this.tableData[i].value === '0' && this.tableData[i].inputBorder){
            num = true
          }
        }
        if(num){
          this.state.warning = true
          for(let i=0;i<this.tableData.length;i++){
            if(this.tableData[i].value === '1'){
              this.tableData[i].inputBorder = false                
            }
          }
        }else{
          this.state.warning = false              
        }
        // 入金所有值正常：

        if(!this.state.warning){
          for(let i=0;i<this.tableData.length;i++){
            if(this.tableData[i].value === '1'){
              this.tableData[i].inputBorder = false                
            }
          }
        }
        // 入金超出
        if(numberAll < 0){
          this.state.warning = true          
          for(let i=0;i<this.tableData.length;i++){
            if(this.tableData[i].value === '1' && this.tableData[i].input){
              this.tableData[i].inputBorder = true                
            }
          }
        }
        



        //超出输入范围检测：

        this.lefttableData.numberAlls =parseFloat(this.lefttableData.numberAll) + parseFloat(leftChangeNums);
        this.lefttableData.numberAlls < 0 ?  this.lefttableData.numberAlls = 0 : this.lefttableData.numberAlls = this.lefttableData.numberAlls;

        this.lefttableData.leftChangeNum = leftChangeNums

        
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

  #moneyAccess{
    color: #1f2d3d;

    .con-box{
      height: 397px;
      width: 100%;
      .left-box{
        position: relative;
        width: 303px;
        height: 395px;
        float: left;
        text-align: center;
        border-radius: 2px;
        border: solid 1px #dfe6ec;

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
          top: 230px;
          width: 100%;
          font-size: 16px;
          color: #20a0ff;
          .number-all{
            font-size: 24px;
          }

        }



      }

      .right-box{
        width: 634px;
        height: 397px;
        float: right;
        border-radius: 2px;
        overflow: hidden;
        /*border: solid 1px #d3dce6;*/

        .comeout-box{
          height: 75px;
          padding: 15px 0 0 0;

          .s{
            position: relative;
            display: block;
            width: 262px;
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

        .name-box{
          p{
            margin: 0;
            padding: 0;
          }

          .account{
            color: #94a9c1;
          }
        }

        .money-box{
          p{
            font-size: 12px;
            margin: 0;
            line-height: 20px;
          }
        }


      }

    }

    /*出入金字体颜色*/

    .m-red{
      color: #ff5553 !important;
    }

    .m-green{
      color: #13ce66 !important;
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
  #moneyAccess{
    .b-red .el-input__inner{
      border-color: #ff4949;
    }

    .el-table__body-wrapper{
      overflow-x: hidden;
    }

    .el-dialog--small{
      width: 1000px;
    }

    .comeout-box .el-input{
      width: 200px;
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
