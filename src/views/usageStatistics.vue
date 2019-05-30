<template>
    <div class="contanier">
        <div class="content">
            <div class="select-option">
                <el-select @change="selectGet" v-model="form.region" placeholder="请选择库房">
                    <el-option 
                        v-for="item in selectList" 
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </div>
            <div class="tab-page">
                <el-tabs type="border-card">
                    <div class="tab-content">
                        <div class="archival-statistics" id="usageStatistics"></div>
                    </div>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import electronicTagInfo  from '@/components/electronicTagInfo'
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
export default {
    data() {
        return {
            tabPosition: 'left',
            selectList: [
                {
                    id: 0,
                    name: '总库房'
                },
                {
                    id: 1,
                    name: '库房一'
                },
                {
                    id: 2,
                    name: '库房二'
                },
                {
                    id: 3,
                    name: '库房三'
                },
            ],
            form: {
                region: '库房一'
            },
        }
    },
    components: {
        electronicTagInfo
    },
    mounted () {
        const obj = echarts.init(document.getElementById('usageStatistics'))
        const list0 = ["审计档案", "专门档案", "实物档案", "声像档案", "特藏档案", "客户档案"]
        const list1 = [20, 15, 58, 40, 89, 34]
        this.drawLine(obj, list0, list1)
    },
    methods: {
        selectGet(n) {
            const obj = echarts.init(document.getElementById('usageStatistics'))
            const list0 = ["审计档案", "专门档案", "实物档案", "声像档案", "特藏档案", "客户档案"]
            if (n == 0) {
                const list1 = [56, 25, 42, 81, 15, 49]
                this.drawLine(obj, list0, list1)
            } else if (n == 1) {
                const list1 = [20, 15, 58, 40, 89, 34]
                this.drawLine(obj, list0, list1)
            } else if (n == 2) {
                const list1 = [39, 25, 50, 12, 6, 44]
                this.drawLine(obj, list0, list1)
            } else if (n == 3) {
                const list1 = [6, 55, 24, 21, 53, 68]
                this.drawLine(obj, list0, list1)
            }
        },
        drawLine(obj,args1,args2) {
            // 绘制图表
            obj.setOption({
                title: { 
                text: '库房档案利用统计',
                textStyle: {
                    fontSize: 16,
                    fontWeight: "bolder",
                    color: "#2c91a9"
                }
                },
                tooltip: {
                    formatter: '{c}%'
                },
                barWidth : 60,
                xAxis: {
                data: args1,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#292929',  //更改坐标轴文字颜色
                        fontSize : 12      //更改坐标轴文字大小
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine:{
                    lineStyle:{
                        // color:'#315070' //更改坐标轴颜色
                        color:'#292929' //更改坐标轴颜色
                    }
                }
                },
                yAxis: {
                axisLine:{
                    lineStyle:{
                        // color:'#315070' //更改坐标轴颜色
                        color:'#292929' //更改坐标轴颜色
                    }
                }
                },
                series: [{
                    color: ['#FFC125'], //柱状图的颜色
                    name: '利用量',
                    type: 'bar',
                    data: args2,
                    label: {
                        normal: {
                            show: true,
                            position: 'inside',
                            formatter: '({c}%)'//多值的嵌套
                        }
                    }
                }]
            });
        },
        event () {
            console.log("24fgf  ")
        }
    }
}
</script>

<style scoped>
.contanier {
    height: calc( 100vh - 80px );
    background: #f3f3f3;
}
.content {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
}
.select-option {
    float: left;
}
.tab-page {
    background: #fff;
    margin-top: 60px;
    color: #333;
}
.tab-content {
    padding-left: 80px;
    padding-top: 20px;
    box-sizing: border-box;
}
.archival-statistics {
    width: 1000px;
    min-width: 1000px;
    height: 300px;
}
.el-tabs--left .el-tabs__header.is-left {
    margin-left: 80px;
}
</style>
