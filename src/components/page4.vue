<template>
  <div id="moneyAccess">
    <el-button type="success" @click="dialogVisible = true"  icon="caret-right">Dialog</el-button>

    <el-dialog title="page2" :visible.sync="dialogVisible" size="small" :before-close="handleClose">
      <div class="con-box">
        <div class="left-box">
          <h3>托管1</h3>
          <p class="m-name">托管户余额</p>
          <p class="m-box" :class="{'m-red': lefttableData.count == '1','m-green': lefttableData.count == '0'}">
            <span class="number-all">{{lefttableData.numberAll}}</span>
            <span class="number-type">{{lefttableData.type}}</span>

            <span v-if="lefttableData.count != '2'">
              (
              <span v-if="lefttableData.count == '1'">+</span>
              <span v-if="lefttableData.count == '0'">-</span>

              <span>{{lefttableData.numberChange}}</span>

              <span class="number-type">{{lefttableData.changeType}}</span>
              )
            </span>

          </p>

        </div>
        <div class="right-box">
          <el-table :data="tableData" style="width: 630px" height="397">
            <el-table-column  label="出入金额" width="330">
              <template scope="scope">
                <div class="comeout-box">
                  <el-switch v-model="scope.row.value" on-text="入金" off-text="出金" on-color="#13ce66" off-color="#ff4949" on-value="1" off-value="0">
                  </el-switch>
                  <el-input v-model="scope.row.input" placeholder="请输入内容"></el-input>

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
                <div class="money-box">
                  <p>{{scope.row.money}} {{scope.row.type}}</p>
                  <p>(

                    <span v-if="scope.row.changecount == '1'">+</span>
                    <span v-if="scope.row.changecount == '0'">-</span>

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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        dialogVisible: false,
        lefttableData: {
          numberAll: '100000',
          type: '亿',
          count: '1',
          numberChange: '100',
          changeType: '万'
        },
        tableData: [{
          name: '海通证券',
          code: '135357',
          pro: '普通资金账户',
          money: '800.0',
          type: '万',
          value: '1',
          input:'',
          changeMon:'100',
          changeType:'万',
          changecount: '1',

        },],
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
      aa:function () {
        return "ad"
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
          .number-all{
            font-size: 24px;
          }

        }

        .m-red{
          color: #ff5553;
        }

        .m-green{
          color: #13ce66;
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


  }
</style>

<style rel="stylesheet/css" >
  /*默认样式的修改*/
  #moneyAccess .el-table__body-wrapper{
    overflow-x: hidden;
  }

  #moneyAccess .el-dialog--small{
    width: 1000px;
  }

  #moneyAccess .comeout-box .el-input{
    width: 200px;
  }

  #moneyAccess .el-switch__label span{
    top: 5px;
    font-size: 12px;
  }

  #moneyAccess .cell{
    color: #475669;
  }
</style>
