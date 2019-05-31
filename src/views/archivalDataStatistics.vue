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
                        <el-tabs :tab-position="tabPosition" @click="event">
                            <el-tab-pane v-for="(item,index) in fileNameList" :key="index" :label="item.name">
                                <div class="tab-content">
                                   <div class="archival-statistics" :id="'archivalStatistics' + index"></div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <el-table :data="fileCollection" style="width: 100%;margin-bottom:55px;">
                        <el-table-column  prop="name"  label="门类名称" align="center"></el-table-column>
                        <el-table-column  prop="archives" label="案卷数量" align="center"></el-table-column>
                        <el-table-column  prop="fileNum"  label="文件数量" align="center"></el-table-column>
                        <el-table-column  prop="attachmentNum"  label="附件数量" align="center"></el-table-column>
                        <el-table-column  prop="pages"  label="页数" align="center"></el-table-column>
                        <el-table-column  prop="fullTextNum"  label="全文数量" align="center"></el-table-column>
                        <el-table-column  prop="fullTextCapacity"  label="全文容量" align="center"></el-table-column>
                    </el-table>
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
                region: ''
            },
            fileNameList: [
                {
                    id: 0,
                    name: '审计档案'
                },
                {
                    id: 1,
                    name: '专门档案'
                },
                {
                    id: 2,
                    name: '实物档案'
                },
                {
                    id: 3,
                    name: '声像档案'
                },
                {
                    id: 4,
                    name: '特藏档案'
                },
                {
                    id: 5,
                    name: '客户档案'
                },
            ],
            fileCollection: [
                {
                    name: '审计档案以券管理',
                    archives: 556,
                    fileNum: 2520,
                    attachmentNum: 3699,
                    pages: 1014,
                    fullTextNum: 1552,
                    fullTextCapacity: '34.5GB'
                },
                {
                    name: '专门档案以券管理',
                    archives: 500,
                    fileNum: 1220,
                    attachmentNum: 362,
                    pages: 1524,
                    fullTextNum: 2552,
                    fullTextCapacity: '3.5GB'
                },
                {
                    name: '实物档案以券管理',
                    archives: 1050,
                    fileNum: 1520,
                    attachmentNum: 2252,
                    pages: 654,
                    fullTextNum: 2992,
                    fullTextCapacity: '988MB'
                },
                {
                    name: '声像档案以券管理',
                    archives: 556,
                    fileNum: 2520,
                    attachmentNum: 3699,
                    pages: 1014,
                    fullTextNum: 1552,
                    fullTextCapacity: '34.5GB'
                },
                {
                    name: '特藏档案以券管理',
                    archives: 556,
                    fileNum: 2520,
                    attachmentNum: 3699,
                    pages: 1014,
                    fullTextNum: 1552,
                    fullTextCapacity: '34.5GB'
                },
                {
                    name: '客户档案以券管理',
                    archives: 556,
                    fileNum: 2520,
                    attachmentNum: 3699,
                    pages: 1014,
                    fullTextNum: 1552,
                    fullTextCapacity: '34.5GB'
                },
            ]
        }
    },
    components: {
        electronicTagInfo
    },
    mounted () {
        const obj = echarts.init(document.getElementById('archivalStatistics0'))
        const obj1 = echarts.init(document.getElementById('archivalStatistics1'))
        const obj2 = echarts.init(document.getElementById('archivalStatistics2'))
        const list0 = [556, 2520, 3699, 1014, 1552, 2400]
        const list1 = [500, 1220, 362, 1524, 2552, 900]
        const list2 = [1050, 1520, 2252, 654, 2992, 650]
        this.drawLine(obj, list0)
        this.drawLine(obj1, list1)
        this.drawLine(obj2, list2)
    },
    methods: {
        selectGet() {
            console.log("111")
        },
        drawLine(obj,args) {
            // 绘制图表
            obj.setOption({
                title: { 
                text: '库房档案种类统计',
                textStyle: {
                    fontSize: 16,
                    fontWeight: "bolder",
                    color: "#2c91a9"
                }
                },
                tooltip: {},
                barWidth : 60,
                xAxis: {
                data: ["案卷", "文件", "附件", "页数", "全文", "容量"],
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
                name: '数量',
                type: 'bar',
                data: args
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
    height: calc( 100% - 80px );
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
