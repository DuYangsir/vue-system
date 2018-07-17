<template>
  <div id="closedLoopBox">
    <el-button type="success" @click="dialogVisible = true"  icon="caret-right">资金出入封闭圈流水 Dialog</el-button>

    <el-dialog title="托管户资金出入封闭圈流水" :visible.sync="dialogVisible" size="small" :before-close="handleClose">
      <span class="search-input-box">
        <el-input placeholder="输入托管户资金出入封闭圈流水" icon="search" v-model="searchInput" :on-icon-click="handleIconClick"></el-input>
      </span>
      <div class="con-box">
        <el-table :data="gridData" height="500">
          <el-table-column property="date" label="日期" width="" sortable></el-table-column>
          <el-table-column property="name" label="时间" width="" sortable></el-table-column>
          <el-table-column property="address" label="出入事项" sortable></el-table-column>
          <el-table-column property="a" label="金额" width="" sortable></el-table-column>
          <el-table-column property="b" label="现托管户余额" sortable></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <span class="down">导出流水</span>
        <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        dialogVisible: false,
        searchInput: '',
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区',
          a: '1',
          b: '2',
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区',
          a: '1',
          b: '2',
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区',
          a: '1',
          b: '2',
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区',
          a: '1',
          b: '2',
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区',
          a: '1',
          b: '2',
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区',
          a: '1',
          b: '2',
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区',
          a: '1',
          b: '2',
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区',
          a: '1',
          b: '2',
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区',
          a: '1',
          b: '2',
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区',
          a: '1',
          b: '2',
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区',
          a: '1',
          b: '2',
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区',
          a: '1',
          b: '2',
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区',
          a: '1',
          b: '2',
        },{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区',
          a: '1',
          b: '2',
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
      handleIconClick(ev) {
        console.log(ev);
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped rel="stylesheet/less">
  h3{
    padding: 0;
    margin: 0;
  }

  #closedLoopBox{
    color: #1f2d3d;

    .search-input-box{
      display: block;
      width: 287px;
      position: absolute;
      top: 12px;
      right: 56px;
    }

    .con-box{
      height: 397px;
      width: 100%;
    }

    .down{
      cursor: pointer;
      padding-right: 20px;
      font-size: 14px;
      font-weight: 500;
      line-height: 1;
      text-align: center;
      color: #1e8bff;
    }



  }
</style>

<style  lang="less" rel="stylesheet/less" >
  /*默认样式的修改*/
  #closedLoopBox{
    .b-red .el-input__inner{
      border-color: #ff4949;
    }
    .el-table__body-wrapper{
      overflow-x: hidden;
    }

    .el-dialog--small{
      width: 765px;
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
      height: 500px;
      padding: 19px 21px;
      margin-top: 20px;
      border: 1px #dddddd solid;
      border-width: 1px 0;
    }
  }

</style>
