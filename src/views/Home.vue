<template>
  <div class="home">
    <img class="container-bg" src="../assets/warehouse_bg.jpg" alt="">
    <div class="container">
      <div class="left">
        <div id="safe" class="item have-bg">
          <h6 class="item-title">设备状态</h6>
          <div class="circle-chart">
            <div class="donut-chart">
              <div class="progress-circle">
                <svg :width="radiusW" :height="radiusH" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">  
                    <!-- width/height表示svg的宽高,viewBox表示根据svg的宽高拉出来的大小 -->  
                    <circle class="progress-background" r="50" cx="50" cy="50" stroke-width="4.8" fill="transparent" />  
                    <!-- r表示半径，cx 和 cy 属性定义圆点的 x 和 y 坐标 fill表示背景色 -->  
                    <circle stroke-linecap="round" class="progress-bar" r="50" cx="50" cy="50" stroke-width="4.8" fill="transparent" :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset" style="transition: stroke-dashoffset 0.6s ease 0s"/>  
                </svg>
                <div class="equipment-info">
                    <div class="enable-rate-text">启用率</div>
                    <div class="rate"><span>{{ rate }}</span><span>%</span></div>
                    <div class="equipment-sum">总数: {{ currEquiqSum }}</div>
                </div>
              </div>
            </div>
            <div class="tab-list">
              <div :class="item.isActive ? 'tab-item active' : 'tab-item'" @mousemove="selectEquiq(item)" v-for="(item, index) in equiqList" :key="index">{{ item.name }}</div>
            </div>
          </div>
        </div>
        <div class="item have-bg">
          <!-- <img class="kuang-one" src="../assets/框002.png" alt=""> -->
          <h6 class="item-title">电子标签进出记录</h6>
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
        <div class="item have-bg">
          <!-- <img class="kuang-one" src="../assets/框002.png" alt=""> -->
          <h6 class="item-title">库房档案数量统计</h6>
          <div class="archival-box">
            <!-- 柱状图 -->
            <!-- <div id="archival" class="archival" style="width:300px; height: 180px"></div> -->
            <!-- 饼状图 -->
            <div id="archival" class="archival" style="width:300px; height: 180px"></div>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="middle-show">
          <img class="middle-bg" src="../assets/kuang-middle.png" alt="">
          <div class="run-days">
            <p class="run-text">安全运行天数</p>
            <div class="run-day-box">
              <div class="run-day-item">0</div>
              <div class="run-day-item">1</div>
              <div class="run-day-item">5</div>
              <div class="run-day-item">3</div>
              <div class="run-day-text">天</div>
            </div>
          </div>
          <div class="popup-warning">
            <div class="popup-box"></div>
            <div class="popup-box"></div>
          </div>
        </div>
        <div class="middle-item">
          <div class="tempt-box-one">
            <div id="pie1" style="width: 240px; height: 240px;"></div>
            <p class="room-title">房间一</p>
          </div>
          <div class="tempt-box-one">
            <div id="v1">
              <select v-model="val">
                  <option>vvv</option>
                  <option value="uuu">vue</option>
                  <option value="e">eee</option>
              </select>
            </div>
            <div id="usingStatistical" style="width: 300px; height: 240px;"></div>
            <!-- <p class="room-title">房间二</p> -->
          </div>
        </div>
      </div>
      <div class="right">
        <div class="item have-bg">
          <!-- <img class="kuang-one" src="../assets/框002.png" alt=""> -->
          <h6 class="item-title">实时监控</h6>
          <div class="video-box">
            <video class="my-video" controls="controls" loop="loop">
              <source src="../assets/test02.mp4" type="video/mp4" >
            </video>
          </div>
        </div>
        <div class="item have-bg">
          <!-- <img class="kuang-one" src="../assets/框002.png" alt=""> -->
          <h6 class="item-title">安防监控</h6>
          <ul class="item-images clearfix">
            <li class="item-image" v-for="(item, index) in imageUrls" :key="index">
              <img class="_img" :src="item.url" :alt="'img-' + index" >
            </li>
          </ul>
          <!-- <ul class="time-line-container">
            <li class="time-line-item" v-for="(item,index) in messageData" :key="index">
              <div class="time-item-tag">{{ item.tag }}</div>
              <div class="time-item-symbol">
                <div v-if="item.status == 0" class="time-item-icon warning"></div>
                <div v-else class="time-item-icon default"></div>
              </div>
              <div class="time-item-content">{{ item.content }}</div>
            </li>
          </ul> -->
        </div>
        <div class="item have-bg">
          <!-- <img class="kuang-one" src="../assets/框002.png" alt=""> -->
          <h6 class="item-title">消防实时消息</h6>
          <div class="table-item">
            <div class="v-table">
              <ul class="table-th">
                <li class="table-th-item">时间</li>
                <li class="table-th-item">设备</li>
                <li class="table-th-item">状态</li>
                <li class="table-th-item">位置</li>
              </ul>
              <div class="table-body">
                <vuescroll :ops="ops">
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
                </vuescroll>
              </div>
            </div>
          </div>
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
// 引入饼图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
import vuescroll from 'vuescroll';
import HelloWorld from '@/components/HelloWorld.vue'
// import Vuetable from '@/components/vuetable'
import { setInterval } from 'timers';

export default {
  name: 'home',
  components: {
    HelloWorld,
    vuescroll
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      imageUrls: [
        {
          url: require('../assets/one.png'),
        },
        {
          url: require('../assets/002.jpg'),
        },
        {
          url: require('../assets/003.jpg'),
        },
        {
          url: require('../assets/005.jpg'),
        },
        {
          url: require('../assets/006.jpg'),
        },
        {
          url: require('../assets/007.jpg'),
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
      ],
      dashArray: Math.PI * 100,
      radiusW: 120,
      radiusH: 140,
      percent: 0,
      rate: 0,
      currEquiqSum: 58,
      equiqList: [  // 设备数量及状态
        {
          name: '摄像头',
          enableNum: 18,
          equiqSum: 30,
          isActive: false
        },
        {
          name: '门',
          enableNum: 8,
          equiqSum: 15,
          isActive: false
        },
        {
          name: '灯',
          enableNum: 4,
          equiqSum: 12,
          isActive: false
        },
        {
          name: '空调',
          enableNum: 14,
          equiqSum: 20,
          isActive: false
        },
      ],
      ops: {  //滚动条参数配置
        rail: {
          background: '#25a5f9',
          opacity: 0,
          size: '6px',
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: '2px',
          keepShow: false
        },
        bar: {  
          showDelay: 500,
          onlyShowBarOnScroll: true,
          keepShow: true,
          background: '#2a5beb',
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: false,
          size: '6px',
          disable: false,
        }
      },
      val: 'vvv'
    }
  },
  mounted() {
    let pie1 = echarts.init(document.getElementById('pie1'))
    // let pie2 = echarts.init(document.getElementById('pie2'))
    this.drawGauge(pie1)
    // this.drawPie(pie2)
    // this.updateDonut(35) // 初始化百分比
    // 基于准备好的dom，初始化echarts实例
    // 饼图
    let archival = echarts.init(document.getElementById('archival'))
    this.drawPie(archival)
    // 柱状图 usingStatistical
    let usingStatistical = echarts.init(document.getElementById('usingStatistical'))
    this.drawLine(usingStatistical)
    
  },
  computed: {
    dashOffset() {
        return (1 - this.percent) * this.dashArray
    }
  },
  methods: {
    drawLine(obj) {
      // 绘制图表
      obj.setOption({
        title: { 
          text: '库房档案借阅统计',
          textStyle: {
            fontSize: 16,
            fontWeight: "bolder",
            color: "#2c91a9"
          }
        },
        tooltip: {},
        barWidth : 20,
        xAxis: {
          data: ["档1", "档2", "档3", "档4", "档5", "档6"],
          axisLabel: {
            show: true,
              textStyle: {
                color: '#c3dbff',  //更改坐标轴文字颜色
                fontSize : 12      //更改坐标轴文字大小
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
          color: ['#1a68ff'],
          name: '借阅量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      });
    },
    drawPie(obj) {
      console.log(obj)
      let option = {
        title : {
          text: '某库房档案数量统计',
          color: '#2c91a9',
          x:'center',
          textStyle: {
            fontSize: 16,
            fontWeight: "bolder",
            color: "#2c91a9"
          }
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color:['#0367a5', '#0db3d9','#f29422','#f2cb04','#d93d4a'],
        legend: {
          orient: 'vertical',
          right: 'right',
          data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        series : [
          {
            name: '数量统计',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
              {value:335, name:'档案一'},
              {value:310, name:'档案二'},
              {value:234, name:'档案三'},
              {value:135, name:'档案四'},
              {value:1548, name:'档案五'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      console.log(option)
      obj.setOption(option)
    },
    drawGauge(obj) {
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
      obj.setOption(option)
      // setInterval(function() {
      //   option.series[0].data[0].value = (50 - (Math.random()*50)).toFixed(1);
      //   obj.setOption(option)
      // },2000);
    },
    updateDonut (percent) {
      // 圆形进度
      let offset = 0
      let $el = this.$refs.section3
      console.log(this.$refs)
      let $elItem = this.$refs.section3Item
      let $txt = this.$refs.percent
      if (percent < 50) {
        offset = (360 / 100) * percent
        $el.style.webkitTransform = $el.style.msTransform = $el.style.MozTransform = 'rotate(' + offset + 'deg)'
        $elItem.style.webkitTransform = $elItem.style.msTransform = $elItem.style.MozTransform = 'rotate(' + (180 - offset) + 'deg)'
        $elItem.style.transtion = '1s'
        $elItem.style.backgroundColor = '#04283c'
      } else {
        offset = ((360 / 100) * percent) - 180
        $el.style.webkitTransform = $elItem.style.msTransform = $el.style.MozTransform = 'rotate(180deg)'
        $elItem.style.webkitTransform = $elItem.style.msTransform = $elItem.style.MozTransform = 'rotate(' + offset + 'deg)'
        $elItem.style.transtion = '1s'
        $elItem.style.backgroundColor = '#09effb'
      }
      $txt.innerHTML = percent
    },
    selectEquiq(obj) {
      console.log(obj)
      this.equiqList.forEach(item => {
        item.isActive = false
      })
      obj.isActive = true
      this.percent = obj.enableNum/obj.equiqSum
      this.rate = (this.percent*100).toFixed(2)
      this.currEquiqSum = obj.equiqSum
    }
  }
}
</script>
<style lang="stylus" scoped>
.home
  // background url('../assets/warehouse_bg.jpg') no-repeat center
  // background-size 100% 100%
  height calc( 100% - 80px )
  padding-top 74px
.container-bg
  width 100%
  height calc( 100%  - 80px )
  display block
  position absolute
  top 80px
  left 0
  z-index -1
.container
  height 100%
  display flex
  text-align center
  overflow hidden
  .left, .right
    width 26.14%
    padding-left 20px
    margin-top 34px
    .item
      width 100%
      height 250px
      box-sizing border-box
      position relative
      .kuang-one
        width 100%
        height 100%
        display block
        position absolute
        top 0
        left 0
      .item-title
        position absolute
        top 10px
        left 50%
        transform translateX(-50%)
      .circle-chart
        padding: 40px
        padding-top 60px
        display flex
        // margin: 0 85px 0 45px
        .donut-chart
          z-index 2
          position: relative
          width: 140px
          height: 140px
          // margin: 55px auto
          border-radius: 100
          .progress-circle
            width 100%
            height 100%
            background #002644
            border-radius 50%  
            border 1px solid #3dd4d3
            box-sizing border-box
            position relative  
            circle  
              stroke-width 8px  
              // stroke-width表示环形的宽度  
              transform-origin center  
              // 中心旋转  
              &.progress-background  
                  transform scale(0.9)  
                  stroke #04283c 
              &.progress-bar  
                  transform scale(0.9) rotate(-90deg)  
                  stroke #3dd4d3  
            .equipment-info
              position absolute
              top 50%
              left 50%
              transform translate(-50%,-50%)
              color #107194
              font-size 12px
              .rate
                height 40px
                line-height 40px
                font-size 18px
                font-weight 500
                color #10eceb
                span:nth-of-type(2)
                  color #107194
                  font-size 12px
          .center
            background: #002644
            border-radius: 50%
            width: 70%
            height: 70%
            left: 15%
            top: 15%
            position: absolute
            a
              color: #2ACBF8
              display: block
              font-size: 24px
              font-weight: 600
              left: 50%
              position: absolute
              top: 40%
              transform: translate(-50%,-50%)
              small
                font-size: 14px;
            p
              font-size: 14px;
              color: #9B9B9B;
              left: 50%;
              position: absolute;
              bottom: 20%;
              transform: translate(-50%,-50%);
          .clip
            border-radius: 50%;
            clip: rect(0px 140px 140px 70px);
            height: 100%;
            position: absolute;
            width: 100%;
            .p-item
              border-radius: 50%;
              clip: rect(0px 70px 140px 0px);
              height: 100%;
              position: absolute;
              width: 100%;
          #section-one
            transform: rotate(0deg);
            .p-item
              background-color: #09effb;
              transform: rotate(180deg);
              transition 1s
          #section-two
            transform: rotate(180deg);
            .p-item
              background-color: #04283c;
              transform: rotate(180deg);
              transition 1s
        .tab-list
          position relative
          top 10px
          left -40px
          .tab-item
            width 100px
            height 30px
            line-height 30px
            text-align right
            font-size 12px
            color #196576
            border 1px solid #00343f
            // border 1px solid #359093
            box-sizing border-box
            cursor pointer
          .tab-item:nth-of-type(1),
          .tab-item:nth-of-type(4)
            padding-right 10px
          .tab-item:nth-of-type(2),
          .tab-item:nth-of-type(3)
            padding-right 34px
          .active
            border 2px solid #318f93
      .item-images
        padding-top 40px
        padding-left 30px
        box-sizing border-box
        .item-image
          width 60px
          height 60px
          float left
          margin-right 15px
          margin-bottom 20px
          ._img
            width 60px
            height 60px
            display block
      .time-line-container
        color: #1DD8FE;
        font-size: 14px;
        box-sizing: border-box;
        position: relative;
        top 36px
        list-style: none;
        // margin: 0.5rem;
        padding-left: 53%;
        &::after
          position: absolute;
          content: "";
          left: 48.5%;
          top: 0;
          width: 2px;
          height: 100%;
          background-color: #fe4f16
        .time-line-item
          padding: 1rem
          text-align left
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
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
      .archival-box
        padding-top 40px
        padding-left 30px
        box-sizing border-box
    .have-bg
      background url('../assets/框002.png') no-repeat center
      background-size 100% 100%
  .middle
    flex 1
    margin-top 40px
    // position relative
    box-sizing border-box
    .middle-show
      // width 680px
      height 444px
      position relative
      overflow hidden
      .middle-bg
        width 100%
        position absolute
        top 0
        left 0
        z-index -1
      .run-days
        margin 30px 0 0 30px
        .run-text
          font-size 14px
          color #388ca0
          text-align left
        .run-day-box
          display flex
          justify-content flex-start
          align-items baseline
          .run-day-item
            width 28px
            height 48px
            line-height 48px
            border 1px solid #263f5b
            box-sizing border-box
            text-align center
            color #05bef6
            font-size 48px
            font-weight bold
            margin-right 10px
          .run-day-text
            color #388ca0
      .popup-warning
        width 450px
        padding 20px
        position absolute
        left 50%
        transform translateX(-50%)
        overflow hidden
        box-sizing border-box
        .popup-box
          float left
          width 200px
          height 250px
          margin-right 10px
          border 1px solid #197899
          box-sizing border-box
        .popup-box:nth-of-type(2) 
          margin-right 0
    .middle-item
      // position absolute
      // bottom 0
      // left 0
      height 300px
      display flex
      border 1px solid #043778
      box-sizing border-box
  .right
    padding-left 0
    padding-right 20px
    .have-bg
      background url('../assets/框002.png') no-repeat center
      background-size 100% 100%
    .video-box
      width 330px
      height 180px
      padding-top 40px
      padding-left 30px
      box-sizing border-box
      .my-video
        width 100%
        height 100%
        object-fit fill;
    .table-item
      // padding-top 40px
      // padding-left 30px
      height 100%
      padding 40px 30px 30px 30px
      box-sizing border-box
      .v-table
        width 100%
        height 100%
        border 1px solid #0c3548
        box-sizing border-box
        font-size 14px
        .table-th
          height 40px
          display flex
          justify-content flex-start
          align-items center
          color #2c91a9
          .table-th-item
            flex 1
        .table-body
          height 140px
          overflow auto
          box-sizing border-box
          .table-body-item
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
  // .v-row
  //   display flex
  //   margin-top 30px
  //   .v-td 
  //     // flex 1
  //     padding 0 20px
  //     &:nth-of-type(2)
  //       padding: 0 
  //     &:nth-of-type(3) 
  //       margin-right 0
  //     .safe-title
  //       font-size 16px
  //       margin-bottom 20px
  //     #safe
  //       width 360px
  //       height 220px
  //       position relative
  //       // padding 20px
  //       box-sizing border-box
  //       // border 2px solid #263fa3
  //       // border-radius 4px
  //       display flex
  //       justify-content center
  //       align-items center
  //       // background url('../assets/框002.png') no-repeat center
  //       // background-size contain
  //       .kuang-one
  //         width 100%
  //         height 100%
  //         display block
  //         position absolute
  //         top 0
  //         left 0
  //       .list-images
  //         // width 100%
  //         // height 100%
          
  //         box-sizing border-box
  //         .item-image
  //           width 80px
  //           height 80px
  //           float left
  //           margin-right 15px
  //           margin-bottom 10px
  //           ._img
  //             width 80px
  //             height 80px
  //             display block
  //     .video-box
  //       height 300px
  //       margin-top 100px
  //       .my-video
  //         width 100%
  //         height 100%
  //         object-fit fill;
  //     .v-item
  //       width 100%
  //       height 400px
  //       display flex
  //       justify-content center
  //       align-items center
  //       border-radius 4px
  //       box-sizing border-box
  //       border 2px solid #263fa3
  //       .tempt-box-one
  //         position relative
  //         .room-title
  //           width 100%
  //           height 24px
  //           position absolute
  //           left 0
  //           bottom 30px
  //           text-align center
  //           font-size 14px
  //           color #ffffff
  //       .time-line-container
  //         color: #1DD8FE;
  //         font-size: 16px;
  //         font-family: "Helvetica Neue For Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  //         box-sizing: border-box;
  //         position: relative;
  //         list-style: none;
  //         margin: 0.5rem;
  //         padding-left: 6rem;
  //         &::after
  //           position: absolute;
  //           content: "";
  //           left: 5rem;
  //           top: 0;
  //           width: 2px;
  //           height: 100%;
  //           background-color: #fe4f16
  //         .time-line-item
  //           padding: 1rem
  //           position: relative
  //           .time-item-tag
  //             position: absolute
  //             left: -10rem
  //             // width: 65px
  //             text-align: center
  //             color: #5EBCF7
  //             font-size: 14px
  //           .time-item-symbol
  //             box-sizing: border-box
  //             position: absolute
  //             left: -1rem
  //             z-index: 1
  //             background: white
  //             .time-item-icon
  //               box-sizing: border-box
  //               position: absolute
  //               margin-left: -11px
  //               width: 24px
  //               height: 24px
  //               border-radius: 12px
  //               border: 2px solid #fe4f16
  //             .default
  //               background: #51F7D6
  //             .warning
  //               background red
  //             .out
  //               background: white
  //             .in
  //               background: black
  //           .time-item-content
  //             white-space: pre-line

  //       .archival-data
  //         width: 100%
  //         height 100%
  //       .v-table
  //         width 400px
  //         height 300px
  //         border 1px solid #0c3548
  //         box-sizing border-box
  //         .table-th
  //           height 40px
  //           display flex
  //           justify-content flex-start
  //           align-items center
  //           color #2c91a9
  //           .table-th-item
  //             flex 1
  //         .table-body
  //           height 260px
  //           overflow auto
  //           box-sizing border-box
  //           .table-body-item
  //             height 40px
  //             border-bottom 1px solid #0c3548
  //             box-sizing border-box
  //             .table-con
  //               height 40px
  //               .item-ul
  //                 height 100%
  //                 display flex
  //                 justify-content flex-start
  //                 align-items center
  //                 .item-li
  //                   color #2c91a9
  //                   overflow hidden
  //                   white-space nowrap
  //                   text-overflow ellipsis
  //                   flex 1
  //               .even
  //                 background rgba(3,42,68,.5)
  //               .odd
  //                 background rgba(3,42,68,1)

</style>