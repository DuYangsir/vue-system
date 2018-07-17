<template>
  <div id="holdApositionWrap">
    <el-tabs v-model="pageindex" type="border-card" @tab-click="tabClick(pageindex)">

      <el-tab-pane v-for="(list,index) in dataTitle" :name="index + ''" :key="list.name" :label="list.name">
        <el-table :data="positions" border style="width: 100%" v-if="pageindex == index">
          <el-table-column fixed prop="" label="基金账户" width="110"
                           :filters="[{ text: '1', value: '1' }, { text: '2', value: '2' }]"
                           :filter-method="filterTag" filter-placement="bottom-end">
            <template scope="scope">
              <p class="account-user">
                {{scope.row.id}}
              </p>
              <span class="account-name">
                {{scope.row.fundAccountName}}
              </span>
            </template>
          </el-table-column>
          <el-table-column fixed prop="protfolioName" label="基金产品组合" width="140"
                           :filters="[{ text: '1', value: '1' }, { text: '2', value: '2' }]"
                           :filter-method="filterTag" filter-placement="bottom-end">
          </el-table-column>
          <el-table-column fixed prop="security" label="投资标的" width="110"
                           :filters="[{ text: '1', value: '1' }, { text: '2', value: '2' }]"
                           :filter-method="filterTag" filter-placement="bottom-end">
            <template scope="scope">
              <p class="account-user">
                {{scope.row.security.name}}
              </p>
              <span class="account-name">
                {{scope.row.security.code}}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="paperProfit" label="账面收益" sortable width="110"
                           label-class-name="账面收益注释"
                           :render-header="openAnnotation">
            <template scope="scope">
              <span :class="getTextClass(scope.row.paperProfit)">
                {{scope.row.paperProfit}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="openingCosePrice" sortable label="开仓成本价" width="120"
                           label-class-name="账面账面收益注释账面收益注释账面收益注释账面收益注释收益注释"
                           :render-header="openAnnotation">
            <template scope="scope">
              <span :class="getTextClass(scope.row.openingCosePrice)">
                {{scope.row.openingCosePrice}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="positions" sortable label="持仓量" width="110"
                           label-class-name="账面收益注释"
                           :render-header="openAnnotation">
            <template scope="scope">
              <span :class="getTextClass(scope.row.positions)">
                {{scope.row.positions}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="vendiblePositions" sortable label="可卖持仓量" width="120"
                           label-class-name="账面收益注释"
                           :render-header="openAnnotation">
            <template scope="scope">
              <span :class="getTextClass(scope.row.vendiblePositions)">
                {{scope.row.vendiblePositions}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="marketValue" sortable label="市值" width="110"
                           label-class-name="账面收益注释"
                           :render-header="openAnnotation">
            <template scope="scope">
              <span :class="getTextClass(scope.row.marketValue)">
                {{scope.row.marketValue}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="accumulatedRealizedProfit" sortable label="累计已实现收益" width="150"
                           label-class-name="账面收益注释"
                           :render-header="openAnnotation">
            <template scope="scope">
              <span :class="getTextClass(scope.row.accumulatedRealizedProfit)">
                {{scope.row.accumulatedRealizedProfit}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="accumulatedProfit" sortable label="累计收益" width="110"
                           label-class-name="账面收益注释"
                           :render-header="openAnnotation">
            <template scope="scope">
              <span :class="getTextClass(scope.row.accumulatedProfit)">
                {{scope.row.accumulatedProfit}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="intradayRealizedProfit" sortable label="当日已实现收益" width="150"
                           label-class-name="账面收益注释"
                           :render-header="openAnnotation">
            <template scope="scope">
              <span :class="getTextClass(scope.row.intradayRealizedProfit)">
                {{scope.row.intradayRealizedProfit}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="intradayProfit" sortable label="当日收益" width="110"
                           label-class-name="账面收益注账面收益注释账面收益注释释"
                           :render-header="openAnnotation">
            <template scope="scope">
              <span :class="getTextClass(scope.row.intradayProfit)">
                {{scope.row.intradayProfit}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="pridianRealizedProfit" sortable label="上日已实现收益" width="150"
                           label-class-name="账面收账面收益注释账面收益注释益注释"
                           :render-header="openAnnotation">
            <template scope="scope">
              <span :class="getTextClass(scope.row.pridianRealizedProfit)">
                {{scope.row.pridianRealizedProfit}}
              </span>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="" width="53">
            <template scope="scope">
              <el-dropdown>
                <span class="el-dropdown-link cp">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>增仓</el-dropdown-item>
                  <el-dropdown-item>减仓</el-dropdown-item>
                  <el-dropdown-item>其它1</el-dropdown-item>
                  <el-dropdown-item>其它2</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

    </el-tabs>
  </div>

</template>

<script>

  export default{
    data() {
      return {
        dialogVisible: false,
        pageindex: "0",
        dataTitle: [
          {
            name: '股票1'
          },
          {
            name: '黄金'
          },
          {
            name: '期货'
          },
          {
            name: '外汇'
          },
          {
            name: '自定义标的'
          },
        ],
        positions: [{
          "id": "持仓序号",
          "fundAccountName": "Admin账户",
          "fundAccountId": 1,
          "portfolioId": 2,
          "protfolioName": "默认组合",
          "security":{
            "id": 3,
            "code": "600321",
            "market": "SH",
            "fullCode": "600321.SH",
            "name":"标的1",
          },
          "paperProfit": -899.0,
          "openingCosePrice": 9.0,
          "positions": 999,
          "vendiblePositions": -888,
          "marketValue": 8989.0,
          "accumulatedRealizedProfit": 899.0,
          "accumulatedProfit": -8989.0,
          "intradayRealizedProfit": 898.0,
          "intradayProfit": 898.0,
          "pridianRealizedProfit": 90000.0
        },{
          "id": "持仓序号2",
          "fundAccountName": "Admin账户2",
          "fundAccountId": 1,
          "portfolioId": 2,
          "protfolioName": "默认组合",
          "security":{
            "id": 3,
            "code": "600321",
            "market": "SH",
            "fullCode": "600321.SH",
            "name":"标的2",
          },
          "paperProfit": 899.0,
          "openingCosePrice": 9.0,
          "positions": 999,
          "vendiblePositions": 888,
          "marketValue": 8989.0,
          "accumulatedRealizedProfit": 899.0,
          "accumulatedProfit": 8989.0,
          "intradayRealizedProfit": 898.0,
          "intradayProfit": 898.0,
          "pridianRealizedProfit": 90000.0
        },{
          "id": "持仓序号2",
          "fundAccountName": "Admin账户2",
          "fundAccountId": 1,
          "portfolioId": 2,
          "protfolioName": "默认组合",
          "security":{
            "id": 3,
            "code": "600321",
            "market": "SH",
            "fullCode": "600321.SH",
            "name":"标的2",
          },
          "paperProfit": 899.0,
          "openingCosePrice": 9.0,
          "positions": 999,
          "vendiblePositions": 888,
          "marketValue": 8989.0,
          "accumulatedRealizedProfit": 899.0,
          "accumulatedProfit": 8989.0,
          "intradayRealizedProfit": 898.0,
          "intradayProfit": 898.0,
          "pridianRealizedProfit": 90000.0
        },{
          "id": "持仓序号2",
          "fundAccountName": "Admin账户2",
          "fundAccountId": 1,
          "portfolioId": 2,
          "protfolioName": "默认组合",
          "security":{
            "id": 3,
            "code": "600321",
            "market": "SH",
            "fullCode": "600321.SH",
            "name":"标的2",
          },
          "paperProfit": 899.0,
          "openingCosePrice": 9.0,
          "positions": 999,
          "vendiblePositions": 888,
          "marketValue": 8989.0,
          "accumulatedRealizedProfit": 899.0,
          "accumulatedProfit": 8989.0,
          "intradayRealizedProfit": 898.0,
          "intradayProfit": 898.0,
          "pridianRealizedProfit": 90000.0
        },{
          "id": "持仓序号2",
          "fundAccountName": "Admin账户2",
          "fundAccountId": 1,
          "portfolioId": 2,
          "protfolioName": "默认组合",
          "security":{
            "id": 3,
            "code": "600321",
            "market": "SH",
            "fullCode": "600321.SH",
            "name":"标的2",
          },
          "paperProfit": 899.0,
          "openingCosePrice": 9.0,
          "positions": 999,
          "vendiblePositions": 888,
          "marketValue": 8989.0,
          "accumulatedRealizedProfit": 899.0,
          "accumulatedProfit": 8989.0,
          "intradayRealizedProfit": 898.0,
          "intradayProfit": 898.0,
          "pridianRealizedProfit": 90000.0
        },{
          "id": "持仓序号2",
          "fundAccountName": "Admin账户2",
          "fundAccountId": 1,
          "portfolioId": 2,
          "protfolioName": "默认组合",
          "security":{
            "id": 3,
            "code": "600321",
            "market": "SH",
            "fullCode": "600321.SH",
            "name":"标的2",
          },
          "paperProfit": 899.0,
          "openingCosePrice": 9.0,
          "positions": 999,
          "vendiblePositions": 888,
          "marketValue": 8989.0,
          "accumulatedRealizedProfit": 899.0,
          "accumulatedProfit": 8989.0,
          "intradayRealizedProfit": 898.0,
          "intradayProfit": 898.0,
          "pridianRealizedProfit": 90000.0
        },{
          "id": "持仓序号2",
          "fundAccountName": "Admin账户2",
          "fundAccountId": 1,
          "portfolioId": 2,
          "protfolioName": "默认组合",
          "security":{
            "id": 3,
            "code": "600321",
            "market": "SH",
            "fullCode": "600321.SH",
            "name":"标的2",
          },
          "paperProfit": 899.0,
          "openingCosePrice": 9.0,
          "positions": 999,
          "vendiblePositions": 888,
          "marketValue": 8989.0,
          "accumulatedRealizedProfit": 899.0,
          "accumulatedProfit": 8989.0,
          "intradayRealizedProfit": 898.0,
          "intradayProfit": 898.0,
          "pridianRealizedProfit": 90000.0
        },{
          "id": "持仓序号2",
          "fundAccountName": "Admin账户2",
          "fundAccountId": 1,
          "portfolioId": 2,
          "protfolioName": "默认组合",
          "security":{
            "id": 3,
            "code": "600321",
            "market": "SH",
            "fullCode": "600321.SH",
            "name":"标的2",
          },
          "paperProfit": 899.0,
          "openingCosePrice": 9.0,
          "positions": 999,
          "vendiblePositions": 888,
          "marketValue": 8989.0,
          "accumulatedRealizedProfit": 899.0,
          "accumulatedProfit": 8989.0,
          "intradayRealizedProfit": 898.0,
          "intradayProfit": 898.0,
          "pridianRealizedProfit": 90000.0
        },{
          "id": "持仓序号2",
          "fundAccountName": "Admin账户2",
          "fundAccountId": 1,
          "portfolioId": 2,
          "protfolioName": "默认组合",
          "security":{
            "id": 3,
            "code": "600321",
            "market": "SH",
            "fullCode": "600321.SH",
            "name":"标的2",
          },
          "paperProfit": 899.0,
          "openingCosePrice": 9.0,
          "positions": 999,
          "vendiblePositions": 888,
          "marketValue": 8989.0,
          "accumulatedRealizedProfit": 899.0,
          "accumulatedProfit": 8989.0,
          "intradayRealizedProfit": 898.0,
          "intradayProfit": 898.0,
          "pridianRealizedProfit": 90000.0
        },{
          "id": "持仓序号2",
          "fundAccountName": "Admin账户2",
          "fundAccountId": 1,
          "portfolioId": 2,
          "protfolioName": "默认组合",
          "security":{
            "id": 3,
            "code": "600321",
            "market": "SH",
            "fullCode": "600321.SH",
            "name":"标的2",
          },
          "paperProfit": 899.0,
          "openingCosePrice": 9.0,
          "positions": 999,
          "vendiblePositions": 888,
          "marketValue": 8989.0,
          "accumulatedRealizedProfit": 899.0,
          "accumulatedProfit": 8989.0,
          "intradayRealizedProfit": 898.0,
          "intradayProfit": 898.0,
          "pridianRealizedProfit": 90000.0
        },{
          "id": "持仓序号2",
          "fundAccountName": "Admin账户2",
          "fundAccountId": 1,
          "portfolioId": 2,
          "protfolioName": "默认组合",
          "security":{
            "id": 3,
            "code": "600321",
            "market": "SH",
            "fullCode": "600321.SH",
            "name":"标的2",
          },
          "paperProfit": 899.0,
          "openingCosePrice": 9.0,
          "positions": 999,
          "vendiblePositions": 888,
          "marketValue": 8989.0,
          "accumulatedRealizedProfit": 899.0,
          "accumulatedProfit": 8989.0,
          "intradayRealizedProfit": 898.0,
          "intradayProfit": 898.0,
          "pridianRealizedProfit": 90000.0
        },{
          "id": "持仓序号2",
          "fundAccountName": "Admin账户2",
          "fundAccountId": 1,
          "portfolioId": 2,
          "protfolioName": "默认组合",
          "security":{
            "id": 3,
            "code": "600321",
            "market": "SH",
            "fullCode": "600321.SH",
            "name":"标的2",
          },
          "paperProfit": 899.0,
          "openingCosePrice": 9.0,
          "positions": 999,
          "vendiblePositions": 888,
          "marketValue": 8989.0,
          "accumulatedRealizedProfit": 899.0,
          "accumulatedProfit": 8989.0,
          "intradayRealizedProfit": 898.0,
          "intradayProfit": 898.0,
          "pridianRealizedProfit": 90000.0
        }
        ]
      };
    },
    methods: {
      tabClick: function(x){
        // 点击table触发的事件
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      openAnnotation:function(h, { column, $index }){
        return (
          <el-tooltip class="item" effect="dark" content={column.labelClassName} placement="bottom">
            <span>{column.label}</span>
          </el-tooltip>
        )
      },
      getTextClass: function(value){
        return value>0?'text-danger':'text-success'
      }

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped rel="stylesheet/less">
  #holdApositionWrap{
    width: 1610px;
    /*height: 848px;*/
    position: absolute;
    top: 0;
    left: 50px;
    right: 0;
    bottom: 0;
    p{
      padding: 0;
      margin: 0;
    }
    .cp{
      cursor: pointer;
    }
    .account-user{
      font-size: 14px;
      color: #1f2d3d;
    }
    .account-name{
      font-size: 14px;
      color: #d3dce6;
    }

    .text-success{
      color: #13ce66;
    }
    .text-danger{
      color: #ff4949;
    }
  }
</style>

<style lang="less" rel="stylesheet/less">
  #holdApositionWrap{
    .el-tabs{
      position: absolute;
      top: 0;
      left: 0px;
      right: 0;
      bottom: 0;
    }
    .el-table .cell, .el-table th>div{
      padding-left: 9px;
      padding-left: 9px;
    }
    .el-dropdown{
      padding-left: 10px;
    }

  }
  .el-tooltip__popper{
    width: 150px;
  }
</style>
