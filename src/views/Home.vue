<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="container">
      <div class="v-row">
        <div class="v-td">
          <h6 class="safe-title">安防</h6>
          <div id="safe">
            <ul class="list-images">
              <!-- <li class="item-image" v-for="(item, index) in imageUrls" :key="index">
                <img class="_img" :src="item.url" :alt="'img-' + index" >
              </li> -->
              <li class="item-image">
                <img class="_img" src="../assets/one.png" >
              </li>
              <li class="item-image">
                <img class="_img" src="../assets/002.jpg" >
              </li>
              <li class="item-image">
                <img class="_img" src="../assets/003.jpg" >
              </li>
              <li class="item-image">
                <img class="_img" src="../assets/005.jpg" >
              </li>
              <li class="item-image">
                <img class="_img" src="../assets/006.jpg" >
              </li>
              <li class="item-image">
                <img class="_img" src="../assets/007.jpg" >
              </li>
            </ul>
          </div>
        </div>
        <div class="v-td">
          <h6 class="safe-title">实时监控</h6>
          <div class="video-box">
            <video class="my-video" controls="controls" loop="loop">
              <source src="../assets/test02.mp4" type="video/mp4" >
            </video>
          </div>
        </div>
        <div class="v-td">
          <h6 class="safe-title">温度控制</h6>
          <div class="v-item">
            <div class="tempt-box-one">
              <div id="pie1" style="width: 300px; height: 300px;"></div>
              <p class="room-title">房间一</p>
            </div>
            <div class="tempt-box-one">
              <div id="pie2" style="width: 300px; height: 300px;"></div>
              <p class="room-title">房间二</p>
            </div>
          </div>
        </div>
      </div>
      <div class="v-row">
        <div class="v-td">
          <h6 class="safe-title">电子标签(案卷进出记录)</h6>
          <div class="v-item">
            <!-- <light-timeline :items='items'></light-timeline> -->
            <ul class="time-line-container">
              <li class="time-line-item" v-for="(item,index) in items" :key="index">
                <div class="time-item-tag">{{ item.tag }}</div>
                <div class="time-item-symbol">
                  <div v-if="item.status == 0" class="time-item-icon in"></div>
                  <div v-else class="time-item-icon out"></div>
                </div>
                <div class="time-item-content">{{ item.content }}</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="v-td">
          <h6 class="safe-title">档案数据统计</h6>
          <div class="v-item">
            <div class="archival-data" id="archival" ></div>
            <!-- <light-timeline :items='items'></light-timeline> -->
          </div>
        </div>
        <div class="v-td">
          <h6 class="safe-title">实时消息</h6>
          <div class="v-item">
            <!-- <light-timeline :items='items'></light-timeline> -->
            <ul class="time-line-container">
              <li class="time-line-item" v-for="(item,index) in messageData" :key="index">
                <div class="time-item-tag">{{ item.tag }}</div>
                <div class="time-item-symbol">
                  <div v-if="item.status == 0" class="time-item-icon warning"></div>
                  <div v-else class="time-item-icon default"></div>
                </div>
                <div class="time-item-content">{{ item.content }}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="v-row">
        <div class="v-td">
          <h6 class="safe-title">消防</h6>
          <div class="v-item">
            <div class="v-table">
              <ul class="table-th">
                <li class="table-th-item">时间</li>
                <li class="table-th-item">设备</li>
                <li class="table-th-item">状态</li>
                <li class="table-th-item">位置</li>
              </ul>
              <div class="table-body">
                <div class="table-body-item">
                  <div class="table-con" v-for="(item,index) in warningData" :key="index">
                    <ul class="item-ul even" v-if="index % 2 == 0">
                      <li class="item-li">{{ item.time }}</li>
                      <li class="item-li">{{ item.equipmentNo }}</li>
                      <li class="item-li" v-if="item.status == 0">正常</li>
                      <li class="item-li" v-else>不正常</li>
                      <li class="item-li">{{ item.localtion }}</li>
                    </ul>
                    <ul class="item-ul odd" v-else>
                      <li class="item-li">{{ item.time }}</li>
                      <li class="item-li">{{ item.equipmentNo }}</li>
                      <li class="item-li" v-if="item.status == 0">正常</li>
                      <li class="item-li" v-else>不正常</li>
                      <li class="item-li">{{ item.localtion }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="v-td">
          <h6 class="safe-title">档案利用统计</h6>
          <div class="v-item"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入仪表盘组件
require('echarts/lib/chart/gauge')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
import HelloWorld from '@/components/HelloWorld.vue'
// import Vuetable from '@/components/vuetable'
import { setInterval } from 'timers';

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      imageUrls: [
        {
          url: '../assets/one.png',
        },
        {
          url: '../assets/one.png',
        },
        {
          url: '../assets/one.png',
        },
        {
          url: '../assets/one.png',
        },
        {
          url: '../assets/one.png',
        },
        {
          url: '../assets/one.png',
        },
        // '../assets/002.jpg',
        // '../assets/003.jpg',
        // '../assets/005.jpg',
        // '../assets/006.jpg',
        // '../assets/007.jpg',
      ],
      items: [
        {
          tag: '2019-02-16 16:25',
          content: '案卷305进入',
          status: 0
        },
        {
          tag: '2019-02-13 10:34',
          content: '案卷305借出',
          status: 1
        },
        {
          tag: '2019-02-11 12:30',
          content: '案卷33借出',
          status: 1
        }
      ],
      messageData: [
        {
          tag: '2019-02-16 16:25',
          content: '温度过高警报',
          status: 0
        },
        {
          tag: '2019-02-13 10:34',
          content: '新闻-怎样做好安全库房',
          status: 1
        },
        {
          tag: '2019-02-11 12:30',
          content: '库房安防一步到位',
          status: 1
        },
        {
          tag: '2019-02-09 12:30',
          content: '湿度警报',
          status: 0
        }
      ],
      warningData: [
        {
          time: '2019-03-15 13:34',
          equipmentNo: '空调',
          status: 0,
          localtion: '东一房间三'
        },
        {
          time: '2019-03-15 13:34',
          equipmentNo: '空调',
          status: 0,
          localtion: '东一房间三'
        },
        {
          time: '2019-03-15 13:34',
          equipmentNo: '空调',
          status: 1,
          localtion: '东一房间三'
        },
        {
          time: '2019-03-15 13:34',
          equipmentNo: '空调',
          status: 1,
          localtion: '东一房间三'
        },
        {
          time: '2019-03-15 13:34',
          equipmentNo: '空调',
          status: 0,
          localtion: '东一房间三'
        },
        {
          time: '2019-03-15 13:34',
          equipmentNo: '空调',
          status: 1,
          localtion: '东一房间三'
        },
        {
          time: '2019-03-15 13:34',
          equipmentNo: '空调',
          status: 0,
          localtion: '东一房间三'
        }
      ]
    }
  },
  mounted() {
    let pie1 = echarts.init(document.getElementById('pie1'))
    let pie2 = echarts.init(document.getElementById('pie2'))
    this.drawPie(pie1)
    this.drawPie(pie2)
    this.drawLine()
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let archival = echarts.init(document.getElementById('archival'))
      // 绘制图表
      archival.setOption({
        title: { text: '库房档案数量统计' },
        tooltip: {},
        xAxis: {
          data: ["档案1", "档案2", "档案3", "档案4", "档案5", "档案6"],
          axisLabel: {
            show: true,
              textStyle: {
                color: '#c3dbff',  //更改坐标轴文字颜色
                fontSize : 14      //更改坐标轴文字大小
              }
          },
          axisTick: {
              show: false
          },
          axisLine:{
            lineStyle:{
                // color:'#315070' //更改坐标轴颜色
                color:'#fff' //更改坐标轴颜色
            }
          }
        },
        yAxis: {
          axisLine:{
            lineStyle:{
                // color:'#315070' //更改坐标轴颜色
                color:'#fff' //更改坐标轴颜色
            }
          }
        },
        series: [{
          color: ['#3F69B6'],
          name: '数量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      });
    },
    drawPie(obj) {
      // pie1.setOption();
      let option = {
        backgroundColor: 'transparent',
        tooltip : {
            formatter: "{a} <br/>{c} {b}"
        },
        toolbox: {
        show : true,
          feature : {
              mark : {},
              restore : {},
              saveAsImage : {}
          }
        },
        series: [
          {
            name: '温度',
            type:'gauge',
            min:0,
            max:50,
            splitNumber:5,
            radius: '50%',
            axisLine: {            // 坐标轴线
              lineStyle: {       // 属性lineStyle控制线条样式
                color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
                width: 3,
                shadowColor : '#fff', //默认透明
                shadowBlur: 10
              }
            },
            axisLabel: {            // 坐标轴小标记
              textStyle: {       // 属性lineStyle控制线条样式
                fontWeight: 'normal',
                color: '#fff',
                shadowColor : 'transparent', //默认透明
                shadowBlur: 10
              }
            },
            axisTick: {            // 坐标轴小标记
              length :10,        // 属性length控制线长
              lineStyle: {       // 属性lineStyle控制线条样式
                color: 'auto',
                shadowColor : 'transparent', //默认透明
                shadowBlur: 10
              }
            },
            splitLine: {           // 分隔线
                length :20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    width:3,
                    color: '#fff',
                    shadowColor : '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            pointer: {           // 分隔线
                shadowColor : '#fff', //默认透明
                shadowBlur: 5
            },
            title : {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 16,
                    fontStyle: 'normal',
                    color: '#fff',
                    shadowColor : 'transparent', //默认透明
                    shadowBlur: 10
                }
            },
            detail : {
                backgroundColor: 'rgba(30,144,255,0.8)',
                borderWidth: 1,
                borderColor: '#fff',
                shadowColor : '#fff', //默认透明
                shadowBlur: 5,
                offsetCenter: [0, '80%'],       // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    color: '#fff'
                }
            },
            data:[{value: 40, name: '℃'}]
          }
        ]
      }
      setInterval(function() {
        option.series[0].data[0].value = (50 - (Math.random()*50)).toFixed(1);
        obj.setOption(option)
      },2000);
    }
  }
}
</script>
<style lang="stylus" scoped>
.container
  min-width 1920px
  overflow hidden
  .v-row
    display flex
    margin-top 30px
    .v-td 
      flex 1
      padding 0 40px
      &:nth-of-type(2)
        padding: 0 
      &:nth-of-type(3) 
        margin-right 0
      .safe-title
        font-size 16px
        margin-bottom 20px
      #safe
        height 400px
        padding 20px
        box-sizing border-box
        border 2px solid #263fa3
        border-radius 4px
        display flex
        justify-content center
        align-items center
        .list-images
          // width 100%
          // height 100%
          
          box-sizing border-box
          .item-image
            width 150px
            height 150px
            float left
            margin-right 15px
            margin-bottom 10px
            ._img
              width 150px
              height 150px
              display block
      .video-box
        height 300px
        margin-top 100px
        .my-video
          width 100%
          height 100%
          object-fit fill;
      .v-item
        width 100%
        height 400px
        display flex
        justify-content center
        align-items center
        border-radius 4px
        box-sizing border-box
        border 2px solid #263fa3
        .tempt-box-one
          position relative
          .room-title
            width 100%
            height 24px
            position absolute
            left 0
            bottom 30px
            text-align center
            font-size 14px
            color #ffffff
        .time-line-container
          color: #1DD8FE;
          font-size: 16px;
          font-family: "Helvetica Neue For Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
          box-sizing: border-box;
          position: relative;
          list-style: none;
          margin: 0.5rem;
          padding-left: 6rem;
          &::after
            position: absolute;
            content: "";
            left: 5rem;
            top: 0;
            width: 2px;
            height: 100%;
            background-color: #fe4f16
          .time-line-item
            padding: 1rem
            position: relative
            .time-item-tag
              position: absolute
              left: -10rem
              // width: 65px
              text-align: center
              color: #5EBCF7
              font-size: 14px
            .time-item-symbol
              box-sizing: border-box
              position: absolute
              left: -1rem
              z-index: 1
              background: white
              .time-item-icon
                box-sizing: border-box
                position: absolute
                margin-left: -11px
                width: 24px
                height: 24px
                border-radius: 12px
                border: 2px solid #fe4f16
              .default
                background: #51F7D6
              .warning
                background red
              .out
                background: white
              .in
                background: black
            .time-item-content
              white-space: pre-line

        .archival-data
          width: 100%
          height 100%
        .v-table
          width 400px
          height 300px
          border 1px solid #0c3548
          box-sizing border-box
          .table-th
            height 40px
            display flex
            justify-content flex-start
            align-items center
            color #2c91a9
            .table-th-item
              flex 1
          .table-body
            height 260px
            overflow auto
            box-sizing border-box
            .table-body-item
              height 40px
              border-bottom 1px solid #0c3548
              box-sizing border-box
              .table-con
                height 40px
                .item-ul
                  height 100%
                  display flex
                  justify-content flex-start
                  align-items center
                  .item-li
                    color #2c91a9
                    overflow hidden
                    white-space nowrap
                    text-overflow ellipsis
                    flex 1
                .even
                  background rgba(3,42,68,.5)
                .odd
                  background rgba(3,42,68,1)

</style>

