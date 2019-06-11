<template>
  <div class="Home">
    <topHeader/>
    <div class="home">
      <img class="container-bg" src="../assets/warehouse_bg.jpg" alt>
      <div class="container">
        <div class="left">
          <div id="safe" class="item have-bg">
            <h6 class="item-title">设备状态</h6>
            <div class="circle-chart">
              <div class="donut-chart">
                <div class="progress-circle">
                  <svg
                    :width="radiusW"
                    :height="radiusH"
                    viewBox="0 0 100 100"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <!-- width/height表示svg的宽高,viewBox表示根据svg的宽高拉出来的大小 -->
                    <circle
                      class="progress-background"
                      r="50"
                      cx="50"
                      cy="50"
                      stroke-width="4.8"
                      fill="transparent"
                    ></circle>
                    <!-- r表示半径，cx 和 cy 属性定义圆点的 x 和 y 坐标 fill表示背景色 -->
                    <circle
                      stroke-linecap="round"
                      class="progress-bar"
                      r="50"
                      cx="50"
                      cy="50"
                      stroke-width="4.8"
                      fill="transparent"
                      :stroke-dasharray="dashArray"
                      :stroke-dashoffset="dashOffset"
                      style="transition: stroke-dashoffset 0.6s ease 0s"
                    ></circle>
                  </svg>
                  <div class="equipment-info">
                    <div class="enable-rate-text">启用率</div>
                    <div class="rate">
                      <span>{{ rate }}</span>
                      <span>%</span>
                    </div>
                    <div class="equipment-sum">总数: {{ currEquiqSum }}</div>
                  </div>
                </div>
              </div>
              <div class="tab-list">
                <div
                  :class="item.isActive ? 'tab-item active' : 'tab-item'"
                  ref="equipNo"
                  @mousemove="selectEquiq(item)"
                  @mouseout="removeEquip(item, index)"
                  v-for="(item, index) in equiqList"
                  :key="index"
                >{{ item.name }}</div>
              </div>
            </div>
          </div>
          <div class="item have-bg">
            <!-- <img class="kuang-one" src="../assets/框002.png" alt=""> -->
            <h6 class="item-title">电子标签进出记录</h6>
            <div class="time-rfid">
              <ul class="list-rfid">
                <li class="item-rfid" v-for="(item,index) in items" :key="index">
                  <div class="rfid-left">{{ item.tag }}</div>
                  <div class="rfid-center">
                    <div class="line"></div>
                    <div
                      class="circle in"
                      v-if="item.status == 0"
                      ref="circle"
                      @mousemove="scalein(index)"
                      @mouseout="scaleout(index)"
                    ></div>
                    <div
                      class="circle out"
                      v-if="item.status == 1"
                      ref="circle"
                      @mousemove="scalein(index)"
                      @mouseout="scaleout(index)"
                    ></div>
                  </div>
                  <div class="rfid-right">{{ item.content }}</div>
                </li>
              </ul>
            </div>
            <!-- <ul class="time-line-container">
              <li class="time-line-item" v-for="(item,index) in items" :key="index">
                <div class="time-item-tag">{{ item.tag }}</div>
                <div class="time-item-symbol">
                  <div v-if="item.status == 0" class="time-item-icon in"></div>
                  <div v-else class="time-item-icon out"></div>
                </div>
                <div class="time-item-content">{{ item.content }}</div>
              </li>
            </ul>-->
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
            <img class="middle-bg" src="../assets/kuang-middle.png" alt>
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
            <div class="scanning">
              <div class="radar"></div>
            </div>
            <div class="popup-warning">
              <div class="e-loadholder">
                <div class="m-loader">
                  <span class="e-text">
                    <div class="equip-warning">
                      <img class="warning-icon" src="../assets/image/jinggao.png">
                      <div class="equip">空调</div>
                      <div class="equip-temp">温度过高</div>
                      <div class="create-time">2019-05-24 16:30:48</div>
                    </div>
                  </span>
                </div>
              </div>
              <!-- <div class="popup-box"></div> -->
              <!-- <div class="popup-box"></div> -->
            </div>
          </div>
          <div class="middle-item">
            <div class="tempt-box-one">
              <!-- <div id="pie1" style="width: 240px; height: 240px;"></div> -->
              <!-- <p class="room-title">房间一</p> -->
            </div>
            <div class="tempt-box-two">
              <!-- <div id="v1">
                <el-select @change="selectGet" v-model="form.region" placeholder="请选择库房">
                  <el-option 
                      v-for="item in selectList" 
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                  ></el-option>
                </el-select>
              </div>-->
              <div id="usingStatistical" style="width: 600px; height: 240px;"></div>
              <!-- <p class="room-title">房间二</p> -->
            </div>
          </div>
        </div>
        <div class="right">
          <div class="item have-bg">
            <!-- <img class="kuang-one" src="../assets/框002.png" alt=""> -->
            <h6 class="item-title">温度监控</h6>
            <div class="video-box">
              <!-- <video class="my-video" controls="controls" loop="loop">
                <source src="../assets/test02.mp4" type="video/mp4" >
              </video>-->
              <div id="main" class="main" style="width: 180px;height: 200px"></div>
              <div class="tp-value">
                <div class="average-tp">27.5℃</div>
                <div class="average-tp">平均温度</div>
                <div class="average-tp">28.5℃</div>
                <div class="average-tp">最高温度</div>
                <div class="average-tp">26.5℃</div>
                <div class="average-tp">最低温度</div>
              </div>
              <!-- <div class="humidity" id="humidity" style="width: 180px;height: 160px"></div> -->
            </div>
          </div>
          <div class="item have-bg">
            <!-- <img class="kuang-one" src="../assets/框002.png" alt=""> -->
            <h6 class="item-title">湿度监控</h6>
            <div class="video-box no-padding-left">
              <div class="humidity" id="humidity" style="width: 180px;height: 160px"></div>
              <div class="tp-value">
                <div class="average-hu">45.3%</div>
                <div class="average-hu">平均湿度</div>
                <div class="average-hu">50.1%</div>
                <div class="average-hu">最大值</div>
                <div class="average-hu">40.7%</div>
                <div class="average-hu">最小值</div>
              </div>
            </div>
            <!-- <ul class="item-images clearfix">
              <li class="item-image" v-for="(item, index) in imageUrls" :key="index">
                <img class="_img" :src="item.url" :alt="'img-' + index" >
              </li>
            </ul>-->
            <!-- <ul class="time-line-container">
              <li class="time-line-item" v-for="(item,index) in messageData" :key="index">
                <div class="time-item-tag">{{ item.tag }}</div>
                <div class="time-item-symbol">
                  <div v-if="item.status == 0" class="time-item-icon warning"></div>
                  <div v-else class="time-item-icon default"></div>
                </div>
                <div class="time-item-content">{{ item.content }}</div>
              </li>
            </ul>-->
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
  </div>
</template>

<script>
// @ is an alias to /src
// 引入基本模板
let echarts = require("echarts/lib/echarts");
import 'echarts-liquidfill/src/liquidFill.js';
// require('echarts-liquidfill/src/liquidFill')
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入仪表盘组件
require("echarts/lib/chart/gauge");
// 引入饼图组件
require("echarts/lib/chart/pie");
require("echarts/lib/chart/scatter");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
import vuescroll from "vuescroll";
import HelloWorld from "@/components/HelloWorld.vue";
import topHeader from "@/components/public/topHeader";
// import Vuetable from '@/components/vuetable'
import { setInterval, clearInterval, setTimeout } from "timers";
require("../assets/css/style.css");

export default {
  name: "home",
  components: {
    HelloWorld,
    vuescroll,
    topHeader
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      imageUrls: [
        {
          url: require("../assets/one.png")
        },
        {
          url: require("../assets/002.jpg")
        },
        {
          url: require("../assets/003.jpg")
        },
        {
          url: require("../assets/005.jpg")
        },
        {
          url: require("../assets/006.jpg")
        },
        {
          url: require("../assets/007.jpg")
        }
        // '../assets/002.jpg',
        // '../assets/003.jpg',
        // '../assets/005.jpg',
        // '../assets/006.jpg',
        // '../assets/007.jpg',
      ],
      items: [
        {
          tag: "2019-02-16 16:25",
          content: "案卷305进入",
          status: 0
        },
        {
          tag: "2019-02-13 10:34",
          content: "案卷305借出",
          status: 1
        },
        {
          tag: "2019-02-11 12:30",
          content: "案卷33借出",
          status: 1
        }
      ],
      messageData: [
        {
          tag: "2019-02-16 16:25",
          content: "温度过高警报",
          status: 0
        },
        {
          tag: "2019-02-13 10:34",
          content: "新闻-怎样做好安全库房",
          status: 1
        },
        {
          tag: "2019-02-11 12:30",
          content: "库房安防一步到位",
          status: 1
        }
      ],
      warningData: [
        {
          time: "2019-03-15 13:34",
          equipmentNo: "空调",
          status: 0,
          localtion: "东一房间三"
        },
        {
          time: "2019-03-15 13:34",
          equipmentNo: "空调",
          status: 0,
          localtion: "东一房间三"
        },
        {
          time: "2019-03-15 13:34",
          equipmentNo: "空调",
          status: 1,
          localtion: "东一房间三"
        },
        {
          time: "2019-03-15 13:34",
          equipmentNo: "空调",
          status: 1,
          localtion: "东一房间三"
        },
        {
          time: "2019-03-15 13:34",
          equipmentNo: "空调",
          status: 0,
          localtion: "东一房间三"
        },
        {
          time: "2019-03-15 13:34",
          equipmentNo: "空调",
          status: 1,
          localtion: "东一房间三"
        },
        {
          time: "2019-03-15 13:34",
          equipmentNo: "空调",
          status: 0,
          localtion: "东一房间三"
        }
      ],
      dashArray: Math.PI * 100,
      radiusW: 120,
      radiusH: 140,
      percent: 0,
      rate: 0,
      currEquiqSum: 58,
      equiqList: [
        // 设备数量及状态
        {
          name: "摄像头",
          enableNum: 18,
          equiqSum: 30,
          isActive: false
        },
        {
          name: "门",
          enableNum: 8,
          equiqSum: 15,
          isActive: false
        },
        {
          name: "灯",
          enableNum: 4,
          equiqSum: 12,
          isActive: false
        },
        {
          name: "空调",
          enableNum: 14,
          equiqSum: 20,
          isActive: false
        }
      ],
      ops: {
        //滚动条参数配置
        rail: {
          background: "#25a5f9",
          opacity: 0,
          size: "6px",
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: "2px",
          keepShow: false
        },
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: true,
          keepShow: true,
          background: "#2a5beb",
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: false,
          size: "6px",
          disable: false
        }
      },
      val: "vvv",
      selectList: [
        {
          id: 0,
          name: "总库房"
        },
        {
          id: 1,
          name: "库房一"
        },
        {
          id: 2,
          name: "库房二"
        },
        {
          id: 3,
          name: "库房三"
        }
      ],
      form: {
        region: ""
      },
      num: 0,
      timer: null
    };
  },
  mounted() {
    // let pie1 = echarts.init(document.getElementById("pie1"));
    // let pie2 = echarts.init(document.getElementById('pie2'))
    // this.drawGauge(pie1);
    // this.drawPie(pie2)
    // 基于准备好的dom，初始化echarts实例
    // 饼图
    let archival = echarts.init(document.getElementById("archival"));
    this.drawPie(archival);
    // 柱状图 usingStatistical
    let usingStatistical = echarts.init(
      document.getElementById("usingStatistical")
    );
    this.drawLine(usingStatistical);
    this.start();
    // 温度计图形
    let main = echarts.init(document.getElementById("main"));
    // this.drawThermometer(main)
    this.drawThermometer1(main);
    // 湿度图形
    let humidity = echarts.init(document.getElementById("humidity"));
    this.drawHumidity(humidity)
  },
  computed: {
    dashOffset() {
      return (1 - this.percent) * this.dashArray;
    }
  },
  methods: {
    selectGet() {
      console.log("111");
    },

    drawLine(obj) {
      // 绘制图表
      obj.setOption({
        title: {
          text: "库房档案借阅统计",
          textStyle: {
            fontSize: 16,
            fontWeight: "bolder",
            color: "#2c91a9"
          }
        },
        tooltip: {},
        barWidth: 20,
        xAxis: {
          data: ["档1", "档2", "档3", "档4", "档5", "档6"],
          axisLabel: {
            show: true,
            textStyle: {
              // color: '#c3dbff',  //更改坐标轴文字颜色
              color: "#6495ED", //更改坐标轴文字颜色
              fontSize: 12 //更改坐标轴文字大小
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#315070" //更改坐标轴颜色
              // color:'#fff' //更改坐标轴颜色
            }
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "#48ccd9" //更改坐标轴颜色
              // color:'#fff' //更改坐标轴颜色
            }
          }
        },
        series: [
          {
            color: ["#1a681f"],
            name: "借阅量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#0154be" },
                  // {offset: 0.5, color: '#188df0'},
                  { offset: 1, color: "#188df0" }
                ])
              }
            }
          }
        ]
      });
    },
    drawPie(obj) {
      console.log(obj);
      let option = {
        title: {
          text: "某库房档案数量统计",
          color: "#2c91a9",
          x: "center",
          textStyle: {
            fontSize: 16,
            fontWeight: "bolder",
            color: "#2c91a9"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: ["#0367a5", "#0db3d9", "#f29422", "#f2cb04", "#d93d4a"],
        legend: {
          orient: "vertical",
          right: "right",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "数量统计",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "档案一" },
              { value: 310, name: "档案二" },
              { value: 234, name: "档案三" },
              { value: 135, name: "档案四" },
              { value: 1548, name: "档案五" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      console.log(option);
      obj.setOption(option);
    },
    drawGauge(obj) {
      // pie1.setOption();
      let option = {
        backgroundColor: "transparent",
        tooltip: {
          formatter: "{a} <br/>{c} {b}"
        },
        toolbox: {
          show: true,
          feature: {
            mark: {},
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "温度",
            type: "gauge",
            min: 0,
            max: 50,
            splitNumber: 5,
            radius: "50%",
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[0.09, "lime"], [0.82, "#1e90ff"], [1, "#ff4500"]],
                width: 3,
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            axisLabel: {
              // 坐标轴小标记
              textStyle: {
                // 属性lineStyle控制线条样式
                fontWeight: "normal",
                color: "#fff",
                shadowColor: "transparent", //默认透明
                shadowBlur: 10
              }
            },
            axisTick: {
              // 坐标轴小标记
              length: 10, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: "auto",
                shadowColor: "transparent", //默认透明
                shadowBlur: 10
              }
            },
            splitLine: {
              // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: {
                // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: "#fff",
                shadowColor: "#fff", //默认透明
                shadowBlur: 10
              }
            },
            pointer: {
              // 分隔线
              shadowColor: "#fff", //默认透明
              shadowBlur: 5
            },
            title: {
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                fontSize: 16,
                fontStyle: "normal",
                color: "#fff",
                shadowColor: "transparent", //默认透明
                shadowBlur: 10
              }
            },
            detail: {
              backgroundColor: "rgba(30,144,255,0.8)",
              borderWidth: 1,
              borderColor: "#fff",
              shadowColor: "#fff", //默认透明
              shadowBlur: 5,
              offsetCenter: [0, "80%"], // x, y，单位px
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: "bolder",
                color: "#fff"
              }
            },
            data: [{ value: 40, name: "℃" }]
          }
        ]
      };
      obj.setOption(option);
      // setInterval(function() {
      //   option.series[0].data[0].value = (50 - (Math.random()*50)).toFixed(1);
      //   obj.setOption(option)
      // },2000);
    },
    // 温度计
    //     drawThermometer (obj) {

    //       let width = 0
    //       let tpValue = 35.4
    //       let kd = []
    //       let Gradient = []
    //       let leftColor = ''
    //       let showValue = ''
    //       let boxPosition = [65, 0]
    //       let tpTxt = ''
    //       // 刻度使用柱状图模拟，短设置1. 长设置3，构造一组数据
    //       for (let i = 0, len = 70; i <= len; i++) {
    //         if (i < 10 || i > 70) {
    //           kd.push('')
    //         } else {
    //           if ((i - 10) % 10 === 0) {
    //             kd.push('-3')
    //           } else if ((i - 10) % 5 === 0) {
    //             kd.push('-1')
    //           } else {
    //             kd.push('')
    //           }
    //         }
    //       }
    //       if (tpValue > 20) {
    //         tpTxt = '温度偏高'
    //         Gradient.push({
    //           offset: 0,
    //         color: '#93FE94'
    //         }, {
    //           offset: 0.5,
    //           color: '#E4D225'
    //         }, {
    //           offset: 1,
    //           color: '#E01F28'
    //         })
    //       } else if (tpValue > -20) {
    //         tpTxt = '温度正常'
    //         Gradient.push({
    //           offset: 0,
    //         color: '#93FE94'
    //         }, {
    //           offset: 1,
    //           color: '#E4D225'
    //         })
    //       } else {
    //         tpTxt = '温度偏低'
    //         Gradient.push({
    //           offset: 1,
    //         color: '#93FE94'
    //         })
    //       }
    //       if (tpValue > 42) {
    //         showValue = 42
    //       } else {
    //         if (tpValue < -40) {
    //           showValue = -40
    //         } else {
    //           showValue = tpValue
    //         }
    //       }
    //       if (tpValue < -10) {
    //         boxPosition = [65, -120]
    //       }
    //       leftColor = Gradient[Gradient.length - 1].color
    //       let option = {
    //         backgroundColor: 'rgba(0,0,0,0)',
    //         title: {
    //           text: '温度计',
    //           show: false
    //         },
    //         yAxis: [
    //           {
    //             show: false,
    //             data: [],
    //             min: 0,
    //             max: 120,
    //             axisLine: {
    //               show: false
    //             }
    //           }, {
    //             show: false,
    //             min: 0,
    //             max: 50
    //           }, {
    //             type: 'category',
    //             data: ['', '', '', '°C'],
    //             position: 'left',
    //             offset: -80,
    //             axisLabel: {
    //               fontSize: 10,
    //               color: 'white'
    //             },
    //             axisLine: {
    //               show: false
    //             },
    //             axisTick: {
    //               show: false
    //             }
    //           }
    //         ],
    //         xAxis: [
    //           {
    //             show: false,
    //             min: -10,
    //             max: 80,
    //             data: []
    //           }, {
    //             show: false,
    //             min: -10,
    //             max: 80,
    //             data: []
    //           }, {
    //             show: false,
    //             min: -10,
    //             max: 80,
    //             data: []
    //           }, {
    //             show: false,
    //             min: -5,
    //             max: 80,
    //             data: []
    //           }
    //         ],
    //         series: [
    //           {
    //             name: '条',
    //             type: 'bar',
    //             // 对应上面XAxis的第一个对)象配置
    //             xAxisIndex: 0,
    //             data: [{
    //               value: (showValue + 50),
    //               label: {
    //                 normal: {
    //                   show: true,
    //                   position: boxPosition,
    //                   width: 200,
    //                   height: 100,
    //                   formatter: '{back| ' + tpValue + ' }{unit|°C}\n{downTxt|' + tpTxt + '}',
    //                   rich: {
    //                     back: {
    //                       align: 'center',
    //                       lineHeight: 50,
    //                       fontSize: 40,
    //                       fontFamily: 'digifacewide',
    //                       color: leftColor
    //                     },
    //                     unit: {
    //                       fontFamily: '微软雅黑',
    //                       fontSize: 15,
    //                       lineHeight: 50,
    //                       color: leftColor
    //                     },
    //                     downTxt: {
    //                       lineHeight: 50,
    //                       fontSize: 25,
    //                       align: 'center',
    //                       color: '#fff'
    //                     }
    //                   }
    //                 }
    //               }
    //             }],
    //             barWidth: 10,
    //             itemStyle: {
    //               normal: {
    //                 color: new echarts.graphic.LinearGradient(0, 1, 0, 0, Gradient)
    //               }
    //             },
    //             z: 2
    //           }, {  //series中第二项
    //             name: '白框',
    //             type: 'bar',
    //             xAxisIndex: 1,
    //             barGap: '-100%',
    //             data: [134],
    //             barWidth: 18,
    //             itemStyle: {
    //               normal: {
    //                 color: '#0C2E6D',
    //                 barBorderRadius: 50,
    //               }
    //             },
    //             z: 1
    //           }, {
    //             name: '外框',
    //             type: 'bar',
    //             xAxisIndex: 2,
    //             barGap: '-100%',
    //             data: [135],
    //             barWidth: 28,
    //             itemStyle: {
    //               normal: {
    //                 color: '#4577BA',
    //                 barBorderRadius: 50,
    //               }
    //             },
    //             z: 0
    //           }, {
    //             name: '圆',
    //             type: 'scatter',
    //             hoverAnimation: false,
    //             data: [0],
    //             xAxisIndex: 0,
    //             symbolSize: 30,
    //             itemStyle: {
    //               normal: {
    //                 color: '#93FE94',
    //                 opacity: 1,
    //               }
    //             },
    //             z: 2
    //           }, {
    //             name: '白圆',
    //             type: 'scatter',
    //             hoverAnimation: false,
    //             data: [0],
    //             xAxisIndex: 1,
    //             symbolSize: 40,
    //             itemStyle: {
    //               normal: {
    //                 color: '#0C2E6D',
    //                 opacity: 1,
    //               }
    //             },
    //             z: 1
    //           }, {
    //             name: '外圆',
    //             type: 'scatter',
    //             hoverAnimation: false,
    //             data: [0],
    //             xAxisIndex: 2,
    //             symbolSize: 50,
    //             itemStyle: {
    //               normal: {
    //                 color: '#4577BA',
    //                 opacity: 1,
    //               }
    //             },
    //             z: 0
    //           }, {
    //             name: '刻度',
    //             type: 'bar',
    //             yAxisIndex: 0,
    //             xAxisIndex: 3,
    //             label: {
    //               normal: {
    //                 show: true,
    //                 position: 'left',
    //                 distance: 10,
    //                 color: 'white',
    //                 fontSize: 14,
    //                 formatter: function (params) {
    //                   if (params.dataIndex > 70 || params.dataIndex < 10) {
    //                     return '';
    //                   } else {
    //                     if((params.dataIndex - 10) % 10 === 0) {
    //                       return params.dataIndex - 30;
    //                     } else {
    //                       return '';
    //                     }
    //                   }
    //                 }
    //               }
    //             },
    //             barGap: '-100%',
    //             data: kd,
    //             barWidth: 1,
    //             itemStyle: {
    //               normal: {
    //                 color: 'white',
    //                 barBorderRadius: 120,
    //               }
    //             },
    //             z: 0
    //           }
    //         ]
    //       }
    //       // 使用刚指定的配置项和数据显示图表。
    //       obj.setOption(option)
    //     },
    drawThermometer1(obj) {
      let tpValue = 27.5;
      let kd = [];
      let Gradient = [];
      let leftColor = "";
      let showValue = "";
      let boxPosition = [65, 0];
      let tpTxt = "";
      // 刻度使用柱状图模拟，短设置1，长的设置3；构造一个数据
      for (let i = 0, len = 110; i <= len; i++) {
        if (i < 10 || i > 110) {
          kd.push("");
        } else {
          if ((i - 10) % 10 === 0) {
            kd.push("-3");
          } else if ((i - 10) % 5 === 0) {
            kd.push("-1");
          } else {
            kd.push("");
          }
        }
      }
      // console.log(kd, "刻度");
      //  console.log(tpValue,"温度")
      //中间线的渐变色和文本内容
      if (tpValue > 20) {
        tpTxt = "温度偏高";
        Gradient.push(
          {
            offset: 0,
            color: "#93FE94"
          },
          {
            offset: 0.5,
            color: "#E4D225"
          },
          {
            offset: 1,
            color: "#E01F28"
          }
        );
      } else if (tpValue > -20) {
        tpTxt = "温度正常";
        Gradient.push(
          {
            offset: 0,
            color: "#93FE94"
          },
          {
            offset: 1,
            color: "#E4D225"
          }
        );
      } else {
        tpTxt = "温度偏低";
        Gradient.push({
          offset: 1,
          color: "#93FE94"
        });
      }
      if (tpValue > 42) {
        showValue = 42;
      } else {
        if (tpValue < -40) {
          showValue = -40;
        } else {
          showValue = tpValue;
        }
      }
      if (tpValue < -10) {
        boxPosition = [65, -120];
      }
      leftColor = Gradient[Gradient.length - 1].color;
      var option = {
        backgroundColor: "rgba(0,0,0,0)",
        title: {
          text: "温度计",
          show: false
        },
        yAxis: [
          {
            show: false,
            data: [],
            min: 0,
            max: 120,
            axisLine: {
              show: false
            }
          },
          {
            show: false,
            min: 0,
            max: 50
          },
          {
            type: "category",
            data: ["", "", "", "", "°C"],
            position: "left",
            offset: -75,
            axisLabel: {
              fontSize: 10,
              color: "white"
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        xAxis: [
          {
            show: false,
            min: -10,
            max: 40,
            data: []
          },
          {
            show: false,
            min: -10,
            max: 40,
            data: []
          },
          {
            show: false,
            min: -10,
            max: 40,
            data: []
          },
          {
            show: false,
            min: -5,
            max: 40
          }
        ],
        series: [
          {
            name: "条",
            type: "bar",
            // 对应上面XAxis的第一个对)象配置
            xAxisIndex: 0,
            data: [
              {
                value: showValue + 50,
                // label: {
                //   normal: {
                //     show: true,
                //     position: boxPosition,
                //     height: 100,
                //     formatter: "{back| " + tpValue +" }{unit|°C}\n{downTxt|" + tpTxt + "}",
                //     rich: {
                //       back: {
                //         align: "left",
                //         lineHeight: 20,
                //         fontSize: 14,
                //         fontFamily: "digifacewide",
                //         color: leftColor
                //       },
                //       unit: {
                //         fontFamily: "微软雅黑",
                //         fontSize: 15,
                //         lineHeight: 50,
                //         color: leftColor
                //       },
                //       downTxt: {
                //         lineHeight: 20,
                //         fontSize: 14,
                //         align: "left",
                //         color: "#fff"
                //       }
                //     }
                //   }
                // }
              }
            ],

            barWidth: 10,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, Gradient)
              }
            },
            z: 2
          },
          {
            name: "白框",
            type: "bar",
            xAxisIndex: 1,
            barGap: "-100%",
            data: [134],
            barWidth: 18,
            itemStyle: {
              normal: {
                color: "#0C2E6D",
                barBorderRadius: 50
              }
            },
            z: 1
          },
          {
            name: "外框",
            type: "bar",
            xAxisIndex: 2,
            barGap: "-100%",
            data: [135],
            barWidth: 28,
            itemStyle: {
              normal: {
                color: "#4577BA",
                barBorderRadius: 50
              }
            },
            z: 0
          },
          {
            name: "圆",
            type: "scatter",
            hoverAnimation: false,
            data: [0],
            xAxisIndex: 0,
            symbolSize: 30,
            itemStyle: {
              normal: {
                color: "#93FE94",
                opacity: 1
              }
            },
            z: 2
          },
          {
            name: "白圆",
            type: "scatter",
            hoverAnimation: false,
            data: [0],
            xAxisIndex: 1,
            symbolSize: 40,
            itemStyle: {
              normal: {
                color: "#0C2E6D",
                opacity: 1
              }
            },
            z: 1
          },
          {
            name: "外圆",
            type: "scatter",
            hoverAnimation: false,
            data: [0],
            xAxisIndex: 2,
            symbolSize: 50,
            itemStyle: {
              normal: {
                color: "#4577BA",
                opacity: 1
              }
            },
            z: 0
          },
          {
            name: "刻度",
            type: "bar",
            yAxisIndex: 0,
            xAxisIndex: 3,
            label: {
              normal: {
                show: true,
                position: "left",
                distance: 10, //文字到刻度线的距离
                color: "white",
                fontSize: 7,
                formatter: function(params) {
                  // console.log(params)
                  // console.log(params.dataIndex)
                  if (params.dataIndex > 100 || params.dataIndex < 20) {
                    return "";
                  } else {
                    if ((params.dataIndex - 10) % 10 === 0) {
                      return params.dataIndex - 50;
                    } else {
                      return "";
                    }
                  }
                }
              }
            },
            barGap: "100%",
            data: kd,
            barWidth: 1,
            itemStyle: {
              normal: {
                color: "white",
                barBorderRadius: 120
              }
            },
            z: 0
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      obj.setOption(option);
    },
    // 湿度展示
    drawHumidity (obj) {
      let option = {
        backgroundColor: 'rgba(0,0,0,0)',
        tooltip: {
          show: true
        },
        series: [
          {
            type: 'liquidFill',
            name: '平均湿度',
            data: [
              {
                name: 'first Data',
                value: 0.453
              }
            ],
            label: {
              normal: {
                textStyle: {
                  fontSize: 8
                },
                formatter: '{a}\n{c}',
              },
            },
            period: function (value, index) {
              return 2000 * index + 1000;
            }
          }
        ]
      }
      obj.setOption(option)
    },
    // 左上角的设备状态切换
    selectEquiq(obj) {
      this.equiqList.forEach(item => {
        item.isActive = false;
      });
      obj.isActive = true;
      this.percent = obj.enableNum / obj.equiqSum;
      this.rate = (this.percent * 100).toFixed(2);
      this.currEquiqSum = obj.equiqSum;
      clearInterval(this.timer);
    },
    removeEquip(obj, index) {
      this.num = index;
      this.timer = setInterval(this.run, 1500);
    },
    start() {
      this.timer = setInterval(this.run, 1500);
    },
    run() {
      if (this.num == this.equiqList.length) {
        this.num = 0;
      }
      let obj = this.$refs.equipNo;
      // console.log(obj)
      // console.log(this.num)
      let cEquip = this.equiqList[this.num];
      obj.forEach(item => {
        item.classList.remove("active");
      });
      obj[this.num].classList.add("active");
      this.equiqList.forEach(item => {
        item.isActive = false;
      });

      cEquip.isActive = true;
      this.percent = cEquip.enableNum / cEquip.equiqSum;
      this.rate = (this.percent * 100).toFixed(2);
      this.currEquiqSum = cEquip.equiqSum;
      this.num++;
    },
    // 电子标签进入出现阴影-移入事件
    scalein(index) {
      let nel = this.$refs.circle[index];
      nel.classList.add("dynamic");
    },
    // 电子标签进入出现阴影-移出事件
    scaleout(index) {
      let nel = this.$refs.circle[index];
      nel.classList.remove("dynamic");
    }
  }
};
</script>
<style lang="stylus" scoped>
.home {
  // background url('../assets/warehouse_bg.jpg') no-repeat center
  // background-size 100% 100%
  height: calc(100% - 80px);
  padding-top: 74px;
}

.container-bg {
  width: 100%;
  height: calc(100% - 80px);
  display: block;
  position: absolute;
  top: 80px;
  left: 0;
  z-index: -1;
}

.container {
  height: 100%;
  display: flex;
  text-align: center;
  overflow: hidden;

  .left, .right {
    width: 26.14%;
    padding-left: 20px;
    margin-top: 34px;

    .item {
      width: 100%;
      height: 250px;
      box-sizing: border-box;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      .kuang-one {
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
      }

      .item-title {
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        color: #20e8fb;
      }

      .circle-chart {
        padding: 40px;
        padding-top: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        // margin: 0 85px 0 45px
        .donut-chart {
          z-index: 2;
          position: relative;
          width: 140px;
          height: 140px;
          // margin: 55px auto
          border-radius: 100;

          .progress-circle {
            width: 100%;
            height: 100%;
            background: #002644;
            border-radius: 50%;
            border: 1px solid #3dd4d3;
            box-sizing: border-box;
            position: relative;

            circle {
              stroke-width: 8px;
              // stroke-width表示环形的宽度
              transform-origin: center;

              // 中心旋转
              &.progress-background {
                transform: scale(0.9);
                stroke: #04283c;
              }

              &.progress-bar {
                transform: scale(0.9) rotate(-90deg);
                stroke: #3dd4d3;
              }
            }

            .equipment-info {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              color: #107194;
              font-size: 12px;

              .rate {
                height: 40px;
                line-height: 40px;
                font-size: 18px;
                font-weight: 500;
                color: #10eceb;

                span:nth-of-type(2) {
                  color: #107194;
                  font-size: 12px;
                }
              }
            }
          }

          .center {
            background: #002644;
            border-radius: 50%;
            width: 70%;
            height: 70%;
            left: 15%;
            top: 15%;
            position: absolute;

            a {
              color: #2ACBF8;
              display: block;
              font-size: 24px;
              font-weight: 600;
              left: 50%;
              position: absolute;
              top: 40%;
              transform: translate(-50%, -50%);

              small {
                font-size: 14px;
              }
            }

            p {
              font-size: 14px;
              color: #9B9B9B;
              left: 50%;
              position: absolute;
              bottom: 20%;
              transform: translate(-50%, -50%);
            }
          }

          .clip {
            border-radius: 50%;
            clip: rect(0px 140px 140px 70px);
            height: 100%;
            position: absolute;
            width: 100%;

            .p-item {
              border-radius: 50%;
              clip: rect(0px 70px 140px 0px);
              height: 100%;
              position: absolute;
              width: 100%;
            }
          }

          #section-one {
            transform: rotate(0deg);

            .p-item {
              background-color: #09effb;
              transform: rotate(180deg);
              transition: 1s;
            }
          }

          #section-two {
            transform: rotate(180deg);

            .p-item {
              background-color: #04283c;
              transform: rotate(180deg);
              transition: 1s;
            }
          }
        }

        .tab-list {
          position: relative;
          top: 10px;
          left: -40px;

          .tab-item {
            width: 100px;
            height: 30px;
            line-height: 30px;
            text-align: right;
            font-size: 12px;
            color: #196576;
            border: 1px solid #00343f;
            // border 1px solid #359093
            box-sizing: border-box;
            cursor: pointer;
          }

          .tab-item:nth-of-type(1), .tab-item:nth-of-type(4) {
            padding-right: 10px;
          }

          .tab-item:nth-of-type(2), .tab-item:nth-of-type(3) {
            padding-right: 34px;
          }

          .active {
            border: 2px solid #318f93;
          }
        }
      }

      .item-images {
        padding-top: 40px;
        padding-left: 30px;
        box-sizing: border-box;

        .item-image {
          width: 60px;
          height: 60px;
          float: left;
          margin-right: 15px;
          margin-bottom: 20px;

          ._img {
            width: 60px;
            height: 60px;
            display: block;
          }
        }
      }

      .time-line-container {
        color: #1DD8FE;
        font-size: 14px;
        box-sizing: border-box;
        position: relative;
        top: 36px;
        list-style: none;
        // margin: 0.5rem;
        padding-left: 53%;

        &::after {
          position: absolute;
          content: '';
          left: 48.5%;
          top: 0;
          width: 2px;
          height: 100%;
          background-color: #fe4f16;
        }

        .time-line-item {
          padding: 1rem;
          text-align: left;
          position: relative;

          .time-item-tag {
            position: absolute;
            left: -10rem;
            // width: 65px
            text-align: center;
            color: #5EBCF7;
            font-size: 14px;
          }

          .time-item-symbol {
            box-sizing: border-box;
            position: absolute;
            left: -1rem;
            z-index: 1;
            background: white;

            .time-item-icon {
              box-sizing: border-box;
              position: absolute;
              margin-left: -11px;
              width: 24px;
              height: 24px;
              border-radius: 12px;
              border: 2px solid #fe4f16;
            }

            .default {
              background: #51F7D6;
            }

            .warning {
              background: red;
            }

            .out {
              background: white;
            }

            .in {
              background: black;
            }
          }

          .time-item-content {
            white-space: pre-line;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }

      .time-rfid {
        height: 100%;
        padding: 40px 30px 30px;
        display: flex;
        justify-content: center;
        align-items: center;

        .list-rfid {
          color: #48ccd9;

          .item-rfid {
            height: 40px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 12px;

            .rfid-left {
              width: 100px;
              margin-right: 10px;
            }

            .rfid-center {
              width: 20px;
              height: 100%;
              position: relative;

              .circle {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
              }

              .out {
                background: #F95304;
              }

              .in {
                background: #088542;
              }

              .dynamic {
                animation: scaleout 1.3s infinite ease-in-out;
              }

              @keyframes scaleout {
                0% {
                  box-shadow: 0 0 8px 6px #08172c;
                }

                50% {
                  box-shadow: 0 0 8px 6px #ff6633;
                }

                100% {
                  box-shadow: 0 0 8px 6px #08172c;
                }
              }

              .line {
                height: 100%;
                width: 2px;
                background: #0154be;
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                margin: auto;
                z-index: -1;
              }
            }

            .rfid-right {
              width: 80px;
              text-align: left;
              margin-left: 10px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }

      .archival-box {
        // padding-top: 40px;
        // padding-left: 30px;
        box-sizing: border-box;
      }
    }

    .have-bg {
      background: url('../assets/框002.png') no-repeat center;
      background-size: 100% 100%;
    }
  }

  .middle {
    flex: 1;
    margin-top: 40px;
    // position relative
    box-sizing: border-box;

    .middle-show {
      // width 680px
      height: 444px;
      position: relative;
      overflow: hidden;

      .middle-bg {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
      }

      .run-days {
        margin: 30px 0 0 30px;

        .run-text {
          font-size: 14px;
          color: #388ca0;
          text-align: left;
        }

        .run-day-box {
          display: flex;
          justify-content: flex-start;
          align-items: baseline;

          .run-day-item {
            width: 28px;
            height: 48px;
            line-height: 48px;
            border: 1px solid #263f5b;
            box-sizing: border-box;
            text-align: center;
            color: #05bef6;
            font-size: 48px;
            font-weight: bold;
            margin-right: 10px;
          }

          .run-day-text {
            color: #388ca0;
          }
        }
      }

      .scanning {
        width: 100%;
        height: 300px;

        .radar {
          background: -webkit-radial-gradient(center, rgba(1, 84, 190, 0.3) 0%, rgba(1, 84, 190, 0) 75%), -webkit-repeating-radial-gradient(rgba(1, 84, 190, 0) 5.8%, rgba(1, 84, 190, 0) 18%, #0154be 18.6%, rgba(1, 84, 190, 0) 18.9%), -webkit-linear-gradient(90deg, rgba(1, 84, 190, 0) 49.5%, #0154be 50%, #0154be 50%, rgba(1, 84, 190, 0) 50.2%), -webkit-linear-gradient(0deg, rgba(1, 84, 190, 0) 49.5%, #0154be 50%, #0154be 50%, rgba(1, 84, 190, 0) 50.2%);
          // background radial-gradient(center, rgba(32, 255, 77, 0.3) 0%, rgba(32, 255, 77, 0) 75%), repeating-radial-gradient(rgba(32, 255, 77, 0) 5.8%, rgba(32, 255, 77, 0) 18%, #20ff4d 18.6%, rgba(32, 255, 77, 0) 18.9%), linear-gradient(90deg, rgba(32, 255, 77, 0) 49.5%, #20ff4d 50%, #20ff4d 50%, rgba(32, 255, 77, 0) 50.2%), linear-gradient(0deg, rgba(32, 255, 77, 0) 49.5%, #20ff4d 50%, #20ff4d 50%, rgba(32, 255, 77, 0) 50.2%)
          width: 240px;
          height: 240px;
          max-height: 240px;
          max-width: 240px;
          position: relative;
          left: 30%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 0.2rem solid #0154be;
          overflow: hidden;

          &::before {
            content: ' ';
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            animation: blips 5s infinite;
            animation-timing-function: linear;
            animation-delay: 1.4s;
          }

          &::after {
            content: ' ';
            display: block;
            background-image: linear-gradient(44deg, rgba(1, 84, 190, 0) 50%, #0154be 100%);
            width: 50%;
            height: 50%;
            position: absolute;
            top: 0;
            left: 0;
            animation: radar-beam 5s infinite;
            animation-timing-function: linear;
            transform-origin: bottom right;
            border-radius: 100% 0 0 0;

            @keyframes radar-beam {
              0% {
                transform: rotate(0deg);
              }

              100% {
                transform: rotate(360deg);
              }
            }

            @keyframes blips {
              14% {
                background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #0154be 30%, rgba(255, 255, 255, 0) 100%);
              }

              14.0002% {
                background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #0154be 30%, rgba(255, 255, 255, 0) 100%);
              }

              25% {
                background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #0154be 30%, rgba(255, 255, 255, 0) 100%);
              }

              26% {
                background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #0154be 30%, rgba(255, 255, 255, 0) 100%);
                opacity: 1;
              }

              100% {
                background: radial-gradient(2vmin circle at 75% 70%, #ffffff 10%, #0154be 30%, rgba(255, 255, 255, 0) 100%);
                opacity: 0;
              }
            }
          }
        }
      }

      .popup-warning {
        width: 204px;
        height: 250px;
        border: 1px solid #197899;
        background: #222;
        opacity: 0.5;
        position: absolute;
        top: 28%;
        left: 70%;
        transform: translateX(-50%);
        overflow: hidden;
        box-sizing: border-box;

        .e-text {
          .equip-warning {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 12px;
            color: #48ccd9;

            .warning-icon {
              width: 24px;
              height: 24px;
              margin-top: 10px;
            }

            .equip {
              width: 100%;
              height: 20px;
              line-height: 20px;
            }

            .equip-temp {
              width: 100%;
              height: 20px;
              line-height: 20px;
            }

            .create-time {
              width: 80px;
              height: 20px;
              line-height: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }

        .popup-box {
          float: left;
          width: 200px;
          height: 250px;
          margin-right: 10px;
          border: 1px solid #197899;
          box-sizing: border-box;
        }

        .popup-box:nth-of-type(2) {
          margin-right: 0;
        }
      }
    }

    .middle-item {
      height: 300px;
      display: flex;
      border: 1px solid #043778;
      justify-content: center
      align-items: center
      box-sizing: border-box;

      .tempt-box-one {
        padding-top: 40px;
        box-sizing: border-box;
      }

      .tempt-box-two {
        padding-top: 40px;
        box-sizing: border-box;
      }
    }
  }

  .right {
    padding-left: 0;
    padding-right: 20px;

    .have-bg {
      background: url('../assets/框002.png') no-repeat center;
      background-size: 100% 100%;
    }

    .video-box {
      // width: 360px;
      // height: 220px;
      // padding-top: 40px;
      // padding-left: 45px;
      display flex
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      position relative
      .main {
        margin-left: -50%;
      }
      .my-video {
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
      .tp-value {
        flex: 1
        padding-top: 30px
        position: absolute
        left: 40%
        .average-tp {
          font-size: 14px
        }
        .average-tp:nth-of-type(1) {
          font-size: 18px
        }
        .average-tp:nth-of-type(odd) {
          color: #fe7174
        }
        .average-tp:nth-of-type(even) {
          color: #095676
          margin-bottom: 10px
        }
        .average-hu {
          font-size: 14px
        }
        .average-hu:nth-of-type(1) {
          font-size: 18px
          color: #20e8fb
        }
        .average-hu:nth-of-type(odd) {
          color: #20e8fb
        }
        .average-hu:nth-of-type(even) {
          color: #095676
          margin-bottom: 10px
        }
      }
      .humidity {
        // padding-top: 20px
        margin-left: -95%;
      }
    }
    .no-padding-left {
      padding-left: 0
    }

    .table-item {
      // padding-top 40px
      // padding-left 30px
      width: 100%;
      height: 100%;
      padding: 40px 30px 30px 30px;
      box-sizing: border-box;

      .v-table {
        width: 100%;
        height: 100%;
        border: 1px solid #0c3548;
        box-sizing: border-box;
        font-size: 14px;

        .table-th {
          height: 40px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          color: #2c91a9;

          .table-th-item {
            flex: 1;
          }
        }

        .table-body {
          height: 140px;
          overflow: auto;
          box-sizing: border-box;

          .table-body-item {
            border-bottom: 1px solid #0c3548;
            box-sizing: border-box;

            .table-con {
              height: 40px;

              .item-ul {
                height: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;

                .item-li {
                  color: #2c91a9;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  flex: 1;
                }
              }

              .even {
                background: rgba(3, 42, 68, 0.5);
              }

              .odd {
                background: rgba(3, 42, 68, 1);
              }
            }
          }
        }
      }
    }
  }
}
</style>