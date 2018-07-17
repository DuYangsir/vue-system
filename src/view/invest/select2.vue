<template>

  <div class="cascader-btn" @click="cascaderShow();" ref="selectBtn">
    <div class="cascader-menus-wrap" ref="selectWrap">
      <ul class="cascader-menus" v-if="isVisible">
        <li class="cascader-menu"
            v-for="(list,index) in data"
            @mouseleave="mouseleave()"
            @mouseenter="mouseEnter(index,list)"
            @click="listClick(list)">
            {{list.label}}
          <i class="el-icon-arrow-right"
             v-if="list.children && list.children.length > 0">
          </i>
          <ul class="cascader-menus lists"
              @mouseleave="mouseleave()"
              v-if="(list.children && list.children.length > 0) && isShowListBox == index">
            <li class="cascader-menu list"
                v-for="child in list.children"
                @click="listClick(child)">
              {{child.label}}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>

  import util from '../../common/util'


  export default{
    props: ['listdata'],
//    进阶
//    props: {
//      listdata: {
//        type: Array,
//        required: true
//      },
//      redund: {
//        required: false
//      }
//    },
    watch: {
      'listdata': function () {
        this.data = util.copyObject(this.listdata,this.data)
      }
    },
    data() {
      return {
        isVisible: false,
        isShowListBox: 'none',
        isMarginR: false,
        isMarginRt: false,

        clientRight: 0,
        btnWidth: 0,

        data: []
      };
    },
    methods: {
      cascaderShow: function (e) {
        var _self = this
        _self.data = util.copyObject(this.listdata,this.data)
        _self.isVisible = true

        e=e||window.event;
        var scrollX=document.documentElement.scrollLeft||document.body.scrollLeft//分别兼容ie和chrome
        var x=e.pageX||(e.clientX+scrollX)//兼容火狐和其他浏览器
        this.clientRight = document.documentElement.clientWidth - x

        var style = window.getComputedStyle(_self.$refs.selectBtn, null);
        this.btnWidth = parseInt(style.width)/2;

        if(this.clientRight < 160){
          this.isMarginR = true
          _self.$refs.selectWrap.style.left = - (160 - this.clientRight) - this.btnWidth + 'px'
        }
        if(this.clientRight < 320){
          this.isMarginRt = true
        }


      },
      mouseEnter: function (index,list) {
        this.isShowListBox = index

        if(list.children && list.children.length > 0 && this.isMarginR == true){
          this.$refs.selectWrap.style.left = - 320- this.btnWidth + this.clientRight + 'px'
        }
        if(list.children && list.children.length > 0 && this.isMarginRt == true){
          this.$refs.selectWrap.style.left = - (320 - this.clientRight) - this.btnWidth + 'px'
        }
      },
      mouseleave: function () {
        this.isShowListBox = 'none'
      },

      listClick: function (obj) {
        if(!(obj.children && obj.children.length > 0)){
          this.isVisible = false
        }
        this.$emit('listClick', obj)
//        进阶
//        this.$emit('listClick', {value: obj, redund: this.redund})

        event.stopPropagation();
      }

    },
    created: function () {
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped rel="stylesheet/less">
  li,ul{
    padding: 0;
    margin: 0;
  }
  li{
    list-style-type:none;
  }
  .cascader-btn{
    position: absolute;
    cursor: pointer;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .cascader-menus-wrap{
      transition: all .3s;
      white-space: nowrap;
      background: #fff;
      position: absolute;
      left: 0px;
      margin: 5px 0;
      z-index: 2;
      border-radius: 2px;
      .cascader-menus{
        position: relative;
        display: inline-block;
        vertical-align: top;
        height: auto;
        border: 1px solid #dfe4ed;
        background-color: #fff;
        box-sizing: border-box;
        margin: 0;
        padding: 6px 0;
        min-width: 160px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      }

      .cascader-menu{
        cursor: pointer;
        width: 160px;
        font-size: 14px;
        padding: 8px 20px;
        position: relative;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #5a5e66;
        height: 34px;
        line-height: 1.5;
        box-sizing: border-box;
        cursor: pointer;
        i{
          position: absolute;
          right: 20px;
        }
      }
      .lists{
        /*display: none;*/
      }
      .list-show{
        display: inline-block;
      }
      .cascader-menus.lists{
        height: auto;
        position: absolute;
        top: -7px;
        left: 160px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      }
      .cascader-menu:hover{
        background-color: #f5f7fb;
      }

    }

  }
</style>

