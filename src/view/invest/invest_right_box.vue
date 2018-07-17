<template>
  <div id="invest-right-box">
    <p style="margin-bottom: 20px">
      <el-button type="success"
                 @click="rightBoxVisible = true;clickOpen();topMsgTepy = '1';
                warningMsg = '内地是滴哦我是一行文本，我是'"
                 icon="caret-right">直接关闭单行状态</el-button>
    </p>
    <p style="margin-bottom: 20px">
      <el-button type="success"
                 @click="rightBoxVisible = true;clickOpen();topMsgTepy = '1';
                warningMsg = '内地是滴哦我是一行文本，我是内地是滴哦我是一行文本，我是内地是滴哦我是一行文本，我是'"
                 icon="caret-right">直接关闭多行状态</el-button>
    </p>
    <p style="margin-bottom: 20px">
      <el-button type="success"
                 @click="rightBoxVisible = true;clickOpen();topMsgTepy = '2';
                warningMsg = '内地是滴哦我是一行文本，我是内地是滴哦'"
                 icon="caret-right">弹窗确认关闭</el-button>
    </p>




    <div id="invest-right-wrap"  :class="{'open-r-box': rightBoxVisible == true,'close-r-box': rightBoxVisible == false}">

      <!--确认取消弹框-->
      <div class="warning-wrap" v-if="topMsgWB == true">
        <div class="warning-box">
          <div class="el-message-box__header">
            <div class="el-message-box__title">取消变更</div>
          </div>
          <div class="el-message-box__content">
            <div class="el-message-box__status el-icon-warning"></div>
            <div class="el-message-box__message" style="margin-left: 50px;">
              <p>确定取消本条指令的变更？</p>
            </div>
            <div class="el-message-box__input" style="display: none;">
              <div class="el-input">
                <input autocomplete="off" placeholder="" type="text" rows="2" validateevent="true" class="el-input__inner"></div>
              <div class="el-message-box__errormsg" style="visibility: hidden;"></div>
            </div>
          </div>
          <div class="el-message-box__btns">
            <button type="button" @click="topMsgWB = false"
                    class="el-button el-button--default" style="">
              <span>取消</span></button>
            <button type="button" @click="topMsgWB = false;topMsgTepyShow = false;"
                    class="el-button el-button--default el-button--primary ">
              <span>确定</span></button>
          </div>
        </div>
      </div>

      <!--默认状态-->
      <div class="title-t-box" ref="titleWrap">
        <div class="msg-wrap" ref="titleBoxs" :class="{'h-0':topMsgTepyShow == false}">
          <!--点击关闭的消息-->
          <p v-if="topMsgTepy == '1'" class="mag-o-close">
            <i class="el-icon-circle-cross el-icon"></i>
            <span>{{warningMsg}}</span>
            <em class="el-icon-close" @click="topMsgTepyShow = false;"></em>
          </p>

          <div v-if="topMsgTepy == '2'" class="mag-o-open">

            <span class="btn">
              <el-button type="primary" @click="topMsgWB = true">取消变更</el-button>
            </span>

          </div>

        </div>

        <div class="trader-msg-box">
          <img src="../../assets/images/touxiang.jpg" alt="">
          <div class="msg-title">
            <span class="title">当前交易员：</span>
            <span class="name">小花</span>
            <p>46746238468@767.com</p>
          </div>
        </div>

        <div class="table-title">
          <span @click="tableList = '1'" :class="{'open':tableList == '2'}">交易状态</span>
          <span @click="tableList = '2'" :class="{'open':tableList == '1'}">试算风险</span>
        </div>
      </div>


      <div class="con-wrap" ref="conWrap" :class="{'m-t':topMsgTepyShow == false}">

        <ul class="state-list-box">
          <!--试算风险-->
          <li v-for="n in data2" v-show="tableList == '2'">
            <span class="times">{{n.time}}</span>
          </li>
          <!--交易状态-->
          <li v-for="n in data" v-show="tableList == '1'">
            <i class="left-wire"></i>
            <span class="type"><i></i></span>
            <span class="times">{{n.time}}</span>
            <span class="doing">{{n.doing}}</span>
            <em class="do-time">{{n.d}}</em>

            <div class="canvas-wrap" v-if="n.w" >
              <div class="canvas-box">
                <p>
                  <span>205</span>
                  <strong>总数</strong>
                </p>
                <div ref="chartBoxs" class="chartBoxs" style=""></div>

                <ul class="state-num">
                  <li>10%通过</li>
                  <li>20%失败</li>
                  <li>8%运行中</li>
                </ul>

                <i class="el-icon-arrow-right" @click="riskVisible = true"></i>
              </div>
            </div>

            <div class="change-wrap" v-if="n.m">
              <p v-for="i in n.m">
                <span>{{i.title}}:</span>
                <em class="old-price">
                  {{i.oldP}}
                </em>
                <i class="el-icon-arrow-right now-price-wrap"></i>
                <strong class="now-price">{{i.nowP}}</strong>
              </p>
            </div>
          </li>

        </ul>

        <!--篮子名称-->
        <div class="basket-name msg-list-box" :class="{'compile': basketName.compile == true}">
          <h3>篮子名称</h3>
          <div class="basket-b-title">
            <span>篮子指令数</span>
            <span class="basket-number">共30条标的</span>
            <i class="el-icon-edit text-c"  @click="basketName.compile = true" :class="{'dis-in-b': basketName.compile == true}"></i>
          </div>
          <p>
            {{basketName.basketNameText}}&nbsp;
            <el-input v-focusinput v-model="basketName.basketNameText" maxlength="20" autofocus @blur="seaveBasketName()" v-if="basketName.compile == true" placeholder=""></el-input>
          </p>
        </div>

        <!--对手方-->
        <div class="analogue-box textarea-box msg-list-box" :class="{'compile': analogue.compile == true}">
          <h3>对手方</h3>
          <i class="el-icon-edit text-c"   @click="analogue.compile = true" :class="{'dis-in-b': analogue.compile == true}"></i>
          <p>
            {{analogue.analogueText}}&nbsp;
          </p>
          <el-input
            maxlength="40"
            v-focustextarea
            @blur="seaveBasketName()"
            v-if="analogue.compile == true"
            type="textarea"
            autosize
            resize="none"
            placeholder=""
            v-model="analogue.analogueText">
          </el-input>
        </div>

        <!--推荐联系人-->
        <div class=" textarea-box msg-list-box" :class="{'compile': linkman.compile == true}">
          <h3>推荐联系人</h3>
          <i class="el-icon-edit text-c"  @click="linkman.compile = true" :class="{'dis-in-b': linkman.compile == true}"></i>
          <p>
            {{linkman.analogueText}}&nbsp;
          </p>
          <el-input
            maxlength="40"
            v-focustextarea
            @blur="seaveBasketName()"
            v-if="linkman.compile == true"
            type="textarea"
            autosize
            resize="none"
            placeholder=""
            v-model="linkman.analogueText">
          </el-input>
        </div>
        <!--备注-->
        <div class=" textarea-box msg-list-box" :class="{'compile': remark.compile == true}">
          <h3>备注</h3>
          <i class="el-icon-edit text-c" @click="remark.compile = true" :class="{'dis-in-b': remark.compile == true}"></i>
          <p>
            {{remark.analogueText}}&nbsp;
          </p>
          <el-input
            maxlength="200"
            v-focustextarea
            @blur="seaveBasketName()"
            v-if="remark.compile == true"
            type="textarea"
            autosize
            resize="none"
            placeholder=""
            v-model="remark.analogueText">
          </el-input>
        </div>
        <!--超出指令-->
        <div class=" overtop-box msg-list-box">
          <h3>超出指令</h3>
          <p>
            <span class="s1">￥3400</span>
            <span class="s2">120%</span>
            <i class="el-icon-circle-close"></i>
            <span class="s3">1.09股</span>
          </p>
          <ul>
            <li></li>
            <li>
              <p>
                <span>数量：</span>
                <strong class="value">1.09</strong>
              </p>
              <p>
                <span>金额：</span>
                <strong class="value">1.09</strong>

              </p>
              <p>
                <span>百分比：</span>
                <strong class="value">1.09</strong>
              </p>
            </li>
          </ul>
        </div>

      </div>

      <!--风控详情页面-->
      <div class="risk-msg-box" :class="{'risk-block': riskVisible == true,'risk-none': riskVisible == false}">
        <div class="risk-top">
          <i class="el-icon-arrow-left" @click="riskVisible = false"></i>
          <h2>
            风控状态明细
          </h2>
        </div>
        <div class="con-box">
          <!--失败的风控-->
          <div class="con1 con">
            <div class="con-title">
              <i></i>
              <h2>风控失败(0)</h2>
            </div>
            <div class="con1-list con-list">
              <dl>
                <dt>
                  <span>控制再现规模</span>
                  <strong>13:45:30</strong>
                  <em>345ms</em>

                </dt>
                <dd>
                  和打回电话
                </dd>
              </dl>
            </div>
          </div>
          <!--交易中-->
          <div class="con2 con">
            <div class="con-title">
              <i></i>
              <h2>交易中(0)</h2>
            </div>
            <div class="con2-list con-list">
              <dl>
                <dt>
                  <span>控制再现规模</span>
                  <strong>13:45:30</strong>
                  <em>345ms</em>

                </dt>
              </dl>
            </div>
          </div>
          <!--风控通过-->
          <div class="con3 con">
            <div class="con-title">
              <i></i>
              <h2>风控通过</h2>
            </div>
            <div class="con3-list con-list">
              <dl>
                <dt>
                  <span>控制再现规模</span>
                  <strong>13:45:30</strong>
                  <em>345ms</em>

                </dt>
              </dl>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>

</template>

<script>
  import echarts from 'echarts'

  export default{
    data() {
      return {
        topMsgTepy: '1',
        topMsgTepyShow: true,
        topMsgWB: false,

        changeContent:"",

        riskVisible: false,
        rightBoxVisible: false,

        copy: this.list,
        warningMsg: '',

        tableList: '1',
        data:[
          {
            type: "red",
            time: "13:50:09",
            d: "3min",
            doing: "创建草稿",
          },{
            type: "red",
            time: "13:50:09",
            d: "3min",
            doing: "创建草稿",
          },{
            type: "red",
            time: "13:50:09",
            d: "3min",
            doing: "创建草稿",
            w:[{
                s: 1,
            }],
          },{
            type: "red",
            time: "13:50:09",
            d: "3min",
            doing: "创建草稿",
          },{
            type: "red",
            time: "13:50:09",
            d: "3min",
            doing: "创建草稿",
          },{
            type: "red",
            time: "13:50:09",
            d: "3min",
            doing: "变更中",
            m:[{
              title: "成本价",
              oldP:"￥123444",
              nowP:"￥456"
            },{
              title: "数量",
              oldP:"123股",
              nowP:"456股"
            }]
          },{
            type: "red",
            time: "13:50:09",
            d: "3min",
            doing: "创建草稿",
          },
        ],
        data2:[
          {
            type: "red",
            time: "13:50:09",
            d: "3min",
            doing: "创建草稿",
          },{
            type: "red",
            time: "13:50:09",
            d: "3min",
            doing: "创建草稿",
          },{
            type: "red",
            time: "13:50:09",
            d: "3min",
            doing: "创建草稿",
            w:[{
              s: 1,
            }],
          },{
            type: "red",
            time: "13:50:09",
            d: "3min",
            doing: "创建草稿",
          },{
            type: "red",
            time: "13:50:09",
            d: "3min",
            doing: "创建草稿",
          },{
            type: "red",
            time: "13:50:09",
            d: "3min",
            doing: "创建草稿",
          },{
            type: "red",
            time: "13:50:09",
            d: "3min",
            doing: "创建草稿",
          },
        ],
        basketName:{
          basketNameText:'jdiadjia',
          compile: false,

        },
        analogue:{
          analogueText:'我是一行文本，我是第二行文本，，',
          compile: false,
        },
        linkman:{
          analogueText:'我是一行文本，我是第二行文本，，',
          compile: false,
        },
        remark:{
          analogueText:'我是一行文本，我是第二行文本，，',
          compile: false,
        },


      };
    },
    directives:{
      focusinput: {
        // 指令的定义
        bind: function (el) {
            console.log(el)
          setTimeout(function(){
            el.getElementsByTagName('input')[0].focus()
          },300)
        },
      },
      focustextarea: {
        // 指令的定义
        bind: function (el) {
          console.log(el)
          setTimeout(function(){
            el.getElementsByTagName('textarea')[0].focus()
          },300)
        },
      },
    },
    methods: {
      //保存篮子名
      seaveBasketName: function(){
        this.basketName.compile = false
        this.analogue.compile = false
        this.linkman.compile = false
        this.remark.compile = false
      },
      clickOpen: function (value) {

        var _self = this
        _self.chartBox = echarts.init(this.$refs.chartBoxs[0])

        _self.chartBoxOption = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          color:['#10a0f7','#f74984','#7bce4c','#cccccc'],
          legend: {
            orient: 'vertical',
            x: 'left',
            data:[]
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              radius: ['68%', '80%'],
              avoidLabelOverlap: true,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '10',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:100, name:''},
                {value:200, name:''},
                {value:300, name:''},
                {value:500, name:''},

              ]
            }
          ]
        };

        _self.chartBox.setOption(
          _self.chartBoxOption
        );
      },

    },
    watch: {
      // 选择监控任意一个变量
      'warningMsg': function(){
        var _self = this
        //初始化
        _self.topMsgTepyShow = true
        _self.$refs.titleBoxs.style.height =  'auto'
        _self.$refs.titleWrap.style.height = 'auto'

        _self.$nextTick(function() {
          // DOM 更新了
          var titleWrapH = _self.$refs.titleWrap.getBoundingClientRect().height
          var titleBoxsH = _self.$refs.titleBoxs.getBoundingClientRect().height

          _self.$refs.titleBoxs.style.height =  titleBoxsH + 'px'
          _self.$refs.conWrap.style.marginTop = titleWrapH + 'px'
          _self.$refs.titleWrap.style.height = titleWrapH + 'px'
        })
      }
    },
    computed:{
    },
    mounted:function () {
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped rel="stylesheet/less">
  @boxShadow1: 0 2px 6px #eee;
  @transition1: all .6s;

  ul,li,dl,dd,dt,h2,h3,p{
    padding: 0;
    margin: 0;
  }

  p{
    word-wrap : break-word;
  }

  li{
    list-style-type:none;
  }

  .dis-in-b{
    display: inline-block !important;
  }

  .h-0{
    height: 0 !important;
  }
  .m-t{
    margin-top: 116px !important;
  }

  /*风控详情页*/
  #invest-right-wrap{
    overflow: hidden;
    .risk-msg-box{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      z-index: 999999999999;
      transition: all .6s;

      .risk-top{
        position: absolute;
        top: 0;
        left: 0;
        width: 360px;
        height: 50px;
        border-bottom: 1px #eeeeee solid;
        z-index: 10;
        h2{
          color: #263238;
          padding: 0;
          margin: 0;
          text-align: center;
          line-height: 50px;
          font-size: 16px;
        }
        i{
          color: #666666;
          cursor: pointer;
          position: absolute;
          top: 18px;
          left: 16px;
        }
      }

      .con-box{
        z-index: 9;
        margin-top: 51px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        overflow: auto;
        .con{
          width: 100%;
          .con-title{
            width: 100%;
            position: relative;
            height: 50px;
            overflow: hidden;
            h2{
              font-size: 14px;
              line-height: 50px;
              padding-left: 20px;

            }
          }
        }
        .con{
          .con-list{
            dl{
              padding-bottom: 10px;
              dt{
                span{
                  font-size: 14px;
                  color: #6e8897;
                }
                em{
                  float: right;
                  font-size: 12px;
                  color: #999999;
                  padding-right: 51px;
                }
                strong{
                  float: right;
                  font-size: 12px;
                  color: #666666;
                  padding-right: 37px;
                }
                padding-left: 40px;
              }
              dd{
                color: #e73936;
                font-size: 12px;
                padding-left: 40px;
              }
            }
          }
        }
      }

    }

    .risk-block{
      top: 0;
      left: 0;
    }
    .risk-none{
      top: 0;
      left: 120%;
    }
  }


  #invest-right-wrap.open-r-box{
    right: 0;
  }
  #invest-right-wrap.close-r-box{
    right: -110%;
    /*right: 0;*/

  }
  #invest-right-wrap{

    width: 360px;
    position: fixed;
    top: 0;
    right: -110%;
    bottom: 0;
    box-shadow: 0 0px 6px #eee;
    transition: all .6s;
    background-color: #ffffff;

    /*弹框*/
    .warning-wrap{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      background-color: rgba(255,255,255,.5);
      .warning-box{
        height: 203px;
        width: 330px;
        position: absolute;
        left: 50%;
        top: 60px;
        margin-left: -165px;
        box-shadow: 0 0px 6px #eee;
        background-color: #ffffff;
        .el-message-box__title{
          font-weight: 500;
        }
        .el-message-box__content {
          padding: 43px 20px;
        }
      }
    }




    .title-t-box{
      transition: @transition1;
    }

    .msg-wrap{
      overflow: hidden;
      transition: @transition1;
      /*height: 60px;*/
      width: 100%;
      box-shadow: @boxShadow1;
      /*需要确认关闭的*/
      .mag-o-open{
        >.btn{
          float: right;
          padding: 15px 20px 15px 0 ;

        }
      }

      /*直接关闭的*/
      .mag-o-close{
        background-color: #e33a34;
        border-radius: 4px;
        min-height: 36px;
        transition: @transition1;
        color: #ffffff;
        i,em{
          line-height: 36px;
        }
        i{

          float: left;
          padding-left: 16px;
        }
        em{
          font-size: 13px;
          float: right;
          padding-right: 16px;
          cursor: pointer;
        }
        span{
          width: 270px;
          display: inline-block;
          font-size: 14px;
          padding: 8px 13px;

        }
      }
    }

    .trader-msg-box{
      height: 70px;
      width: 100%;
      position: relative;
      box-shadow: @boxShadow1;

      img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: absolute;
        top: 10px;
        left: 20px;
      }

      .msg-title{
        position: absolute;
        left: 85px;
        padding-top: 15px;
        .title{
          font-size: 12px;
        }
        .name{
          font-size: 14px;
        }
        p{
          padding: 0;
          margin: 0;
          font-size: 14px;
        }
      }
    }

    .table-title{
      display: table;
      width: 100%;
      height: 40px;
      span{
        display: block;
        float: left;
        font-size: 16px;
        padding: 12px 0 12px 30px;
        width: 150px;
        color: #536f7a;
      }
      .open{
        background-color: #f6f7fb;
        color: #acbbc2;
        cursor: pointer;
      }
    }


    /*自适应框*/
    .con-wrap{
      width: 100%;
      position: absolute;
      margin-top: 116px;
      top: 0px;
      bottom: 0;
      overflow-x: hidden;
      overflow-y: auto;
      transition: @transition1;
      h3{
        font-weight: 400;
      }


      /*状态值列表*/
      .state-list-box{
        padding: 20px 0 0px 0px;
        height: auto;
        transition: all .6s;
        box-shadow: @boxShadow1;
        overflow: hidden;

        .change-wrap{
          font-size: 14px;
          p{
            padding-left: 48px;
            padding-top: 9px;
          }
          span{
            display: inline-block;
            width: 50px;
            font-size: 12px;
            color: #6d8891;

          }
          .old-price{
            /*display: inline-block;*/
            /*min-width: 70px;*/
            color: #adb9ca;
            position: relative;
          }

          .old-price:after{
            content: '';
            width: 45px;
            height: 1px;
            position: absolute;
            top: 0;
            left: 0;
            background-color: #adb9ca;
            transform:rotate(28deg);
            transform-origin: 0 0;
          }
          .old-price:before{
            content: '';
            width: 45px;
            height: 1px;
            position: absolute;
            top: 21px;
            left: 0;
            background-color: #adb9ca;
            transform:rotate(-28deg);
            transform-origin: 0 0;
          }

          .now-price-wrap{
            display: inline;
            color: #adb9ca;
            padding-left: 5px;
          }
          .now-price{
            color: #10a0f7;
          }
        }


        li:last-child {
          .left-wire{
            display: none;
          }
        }
        li{
          /*height: 18px;*/
          padding-top: 6px;
          padding-bottom: 20px;
          /*margin-bottom: 18px;*/
          line-height: 18px;
          padding-left: 20px;
          position: relative;

          .left-wire{
            display: block;
            position: absolute;
            left: 29px;
            width: 1px;
            height: 100%;
            background-color: #eeeeee;
          }
          .type{
            display: inline-block;
            border-radius: 50%;
            height: 18px;
            width: 18px;
            background-color: #fff8ec;
            position: relative;
            i{
              display: inline-block;
              border-radius: 50%;
              height: 8px;
              width: 8px;
              background-color: #ffbb44;
              position: absolute;
              top: 5px;
              left: 5px;
            }
          }

          .times{
            display: inline-block;
            padding-left: 20px;
            font-size: 12px;
            position: relative;
            top: -4px;
          }
          .doing{
            font-size: 14px;
            position: relative;
            top: -4px;
            left: 6px;
          }

          .do-time{
            font-size: 12px;
            position: relative;
            top: -4px;
            left: 30px;

          }

          .canvas-wrap{
            height: 100px;
            width: 100%;
            position: relative;
          }

          .canvas-box:hover{
            background-color: #f3faff;
            i{
              display: inline-block;
            }
          }
          .canvas-box{
            cursor: pointer;
            height: 120px;
            position: relative;
            left: -20px;
            width: 360px;
            i{
              cursor: pointer;
              color: #546e7a;
              display: none;
              position: absolute;
              right: 20px;
              top: 52px;
            }
            p{
              padding: 0;
              margin: 0;
              width: 50px;
              height: 37px;
              text-align: center;
              position: absolute;
              top: 42px;
              left: 86px;


              span{
                font-size: 22px;
                color: #294060;
              }
              strong{
                font-size: 12px;
                color: #acbac5;
              }
            }

            .state-num{
              height: 100%;
              position: absolute;
              top: 3px;
              left: 195px;
              li{
                font-size: 12px;
                padding: 0;
                padding-top: 15px;
              }
            }
          }

          .chartBoxs{
            width: 120px;
            height: 120px;
            position: relative;
            /*top: 6px;*/
            left: 50px;
          }

        }
      }

      .msg-list-box:after{
        content: '';
        height: 6px;
        width: 2px;
        background-color: #10a0f7;
        position: absolute;
        top: 37px;
        left: 0;
      }

      .msg-list-box{
        position: relative;
        /*height: 110px;*/
        transition: all .3s;
        width: 360px;
        color: #2c405a;
        box-shadow: @boxShadow1;
        h3{
          font-size: 16px;
          padding: 30px 0 0 29px;
        }
        >p{
          font-size: 14px;
          padding: 20px 35px 24px 40px;
        }
      }

      .msg-list-box:hover{
        background-color: rgb(238,247,255);
        .text-c{
          display: inline-block;
        }
      }
      .msg-list-box.compile{
        background-color: rgb(238,247,255);
      }

      .msg-list-box.compile:before{
        content: '';
        height: 6px;
        width: 10px;
        background-color: #10a0f7;
        position: absolute;
        top: 37px;
        left: 4px;
        border-radius: 0 3px 3px 0;
      }

      .basket-b-title{
        position: absolute;
        right: 20px;
        top: 30px;
        height: 20px;
        font-size: 12px;
        line-height: 20px;
        transition: all .6s;

        .text-c{
          display: none;
        }

        span{
          color: #ffffff;
          display: inline-block;
          background-color: #10a0f7;
          padding: 0 5px 0 5px;
          border-radius: 4px;
        }
        .basket-number{
          color: #000000;
          background-color: transparent;
          display: inline-block;
          height: 18px;
          line-height: 18px;
          border: solid 1px #10a0f7;
          border-radius: 4px;
          padding: 0 5px 0 8px;
          position: relative;
          left: -10px;
        }
        i{
          color: #10a0f7;
          cursor: pointer;
        }
      }

      /*可修改的备注*/
      .textarea-box{
        .text-c{
          font-size: 12px;
          color: #10a0f7;
          cursor: pointer;
          position: absolute;
          right: 20px;
          top: 35px;
          display: none;
        }
      }

      /*超出指令*/
      .overtop-box:hover{
        background-color: #ffffff !important;
      }
      .overtop-box.msg-list-box:after{
        background-color: #e73936;
      }
      .overtop-box{
        >p{
          padding-left: 27px;
          padding-bottom: 16px;
          .s1{
            font-size: 16px;
            padding-right: 5px;

          }

          .s2{
            color: #e73936;
            font-size: 14px;
            border-left: 1px solid #cccccc;
            padding-left: 8px;
          }

          i{
            padding-left: 10px;
            color: #e73936;
          }

          .s3{
            font-size: 14px;
            float: right;
            color: #7f8fa4;
          }
        }

        ul{
          padding: 0 20px 20px 20px;
          li{
            padding-left: 6px;
            font-size: 14px;

            >p{
              padding-bottom: 14px;
            }

            span{
              display: inline-block;
              width: 70px;
              color: #a3b1ba;
              font-weight: 100;
            }
            .value{
              font-weight: 300;
              color: #2c405a;
            }
          }
          >li:nth-child(1){
            padding: 0;
            height: 4px;
            width: 100%;
            background-color: #e73936;
            border-radius: 2px;
            margin-bottom: 16px;
          }

        }
      }




    }
  }
</style>

<style  lang="less" rel="stylesheet/less">
  #invest-right-wrap {
    .chartBoxs{
      div:nth-child(2){
        opacity: 0;
      }
    }

    .basket-name{
      .el-input{
        position: absolute;
        top: 63px;
        left: 29px;
        width: 310px;
      }
    }

    .textarea-box{
      p{
        position: relative;
      }
      .el-textarea{
        width: 300px;
        position: absolute;
        top: 65px;
        left: 32px;
      }
    }

  }


</style>

