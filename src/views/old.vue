<template>
    <div class="wrap">
        <secondaryPages :selectList="selectList" :form="form" :roomList="roomList"/>
    </div>
</template>

<script>
import secondaryPages from '@/components/public/secondaryPages'
export default {
    data() {
        return {
            selectList: [
                {
                    id: 0,
                    name: '库房一'
                },
                {
                    id: 1,
                    name: '库房二'
                },
                {
                    id: 2,
                    name: '库房三'
                },
            ],
            form: {
                region: ''
            },
            roomList: [
                {
                    id: 0,
                    name: '东一楼001室'
                },
                {
                    id: 1,
                    name: '东一楼001室'
                },
                {
                    id: 2,
                    name: '东一楼001室'
                }
            ]
        }
    },
    components: {
        secondaryPages
    },
    methods: {
        selectGet() {
            console.log("111")
        },
        handleClick(tab, event) {
            console.log(tab, event)
        },
        drawThermometer1(obj) {
            let TP_value = 35.4;
            let kd = [];
            let Gradient = [];
            let leftColor = "";
            let showValue = "";
            let boxPosition = [65, 0];
            let TP_txt = "";
            // 刻度使用柱状图模拟，短设置1，长的设置3；构造一个数据
            for (let i = 0, len = 70; i <= len; i++) {
                if (i < 10 || i > 70) {
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
            console.log(kd, "刻度");
            //  console.log(TP_value,"温度")
            //中间线的渐变色和文本内容
            if (TP_value > 20) {
                TP_txt = "温度偏高";
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
            } else if (TP_value > -20) {
                TP_txt = "温度正常";
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
                TP_txt = "温度偏低";
                Gradient.push({
                offset: 1,
                color: "#93FE94"
                });
            }
            if (TP_value > 42) {
                showValue = 42;
            } else {
                if (TP_value < -40) {
                showValue = -40;
                } else {
                showValue = TP_value;
                }
            }
            if (TP_value < -10) {
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
                    data: ["", "", "", "°C"],
                    position: "left",
                    offset: -80,
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
                    max: 80,
                    data: []
                },
                {
                    show: false,
                    min: -10,
                    max: 80,
                    data: []
                },
                {
                    show: false,
                    min: -10,
                    max: 80,
                    data: []
                },
                {
                    show: false,
                    min: -5,
                    max: 80
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
                        label: {
                        normal: {
                            show: true,
                            position: boxPosition,
                            // backgroundColor: transparent,
                            width: 200,
                            height: 100,
                            formatter:
                            "{back| " +
                            TP_value +
                            " }{unit|°C}\n{downTxt|" +
                            TP_txt +
                            "}",
                            rich: {
                            back: {
                                align: "center",
                                lineHeight: 50,
                                fontSize: 40,
                                fontFamily: "digifacewide",
                                color: leftColor
                            },
                            unit: {
                                fontFamily: "微软雅黑",
                                fontSize: 15,
                                lineHeight: 50,
                                color: leftColor
                            },
                            downTxt: {
                                lineHeight: 50,
                                fontSize: 25,
                                align: "center",
                                color: "#fff"
                            }
                            }
                        }
                        }
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
                        distance: 10,
                        color: "white",
                        fontSize: 14,
                        formatter: function(params) {
                        // console.log(params)
                        // console.log(params.dataIndex)
                        if (params.dataIndex > 70 || params.dataIndex < 10) {
                            return "";
                        } else {
                            if ((params.dataIndex - 10) % 10 === 0) {
                            return params.dataIndex - 30;
                            } else {
                            return "";
                            }
                        }
                        }
                    }
                    },
                    barGap: "-100%",
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
    }
}
</script>

<style scoped>
.wrap {
    width: 100%;
    height: 100%;
}
</style>
