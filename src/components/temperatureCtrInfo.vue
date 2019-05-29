<template>
    <div class="con-item">
        <div class="time-line">
            <div class="time-query">
                <el-select class="query" @change="selectTIime" v-model="airConditionerList[0].conditionName" placeholder="请选择库房">
                    <el-option 
                        v-for="item in airConditionerList" 
                        :key="item.id"
                        :label="item.conditionName"
                        :value="item.id"
                    ></el-option>
                </el-select>
                <el-select @change="selectTIime" v-model="form.region" placeholder="请选择库房">
                    <el-option 
                        v-for="item in dateList" 
                        :key="item.id"
                        :label="item.date"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </div>
            <!-- <imageSnapTimeline :snapImages="snapImages" :ops="ops" /> -->
            <!-- <div class="vuescroll-box"> -->
                <vuescroll :ops="ops">
                    <div class="timeline-box">
                        <div class="timeline-item" v-for="(item, index) in snapImages" :key="index">
                            <img class="camera-img" v-if="item.state == 'on'" src="../assets/image/on.png" alt="">
                            <img class="camera-img" v-if="item.state == 'off'" src="../assets/image/off.png" alt="">
                            <div class="line" :style="{visibility:index == (snapImages.length - 1) ? 'hidden': 'visible'}"></div>
                            <p class="date-text">{{ item.title }}</p>
                            <p class="operator" v-if="item.state == 'on'">{{ item.operator }} (开)</p>
                            <p class="operator" v-if="item.state == 'off'">{{ item.operator }} (关)</p>
                        </div>
                    </div>
                </vuescroll>
            <!-- </div> -->
        </div>
        <el-table :data="conditionInfo" style="width: 100%;margin-bottom:55px;margin-top:80px;">
            <el-table-column  prop="conditionName"  label="空调名称" align="center"></el-table-column>
            <el-table-column  prop="conditionTemp" label="记录温度" align="center"></el-table-column>
            <el-table-column  prop="recondingTime"  label="记录时间" align="center"></el-table-column>
            <el-table-column  prop="operator"  label="操作人" width="140" align="center"></el-table-column>
        </el-table>
        <div class="pagin">
            <span class="total">共{{totalCount}}条数据</span>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="sizes, prev, pager, next"
            :page-sizes="[2, 5, 10, 20]"
            :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import vuescroll from 'vuescroll';
import imageSnapTimeline from '@/components/imageSnapTimeline';
export default {
    data() {
        return {
            conditionInfo: [
                {
                    conditionName: '空调一',
                    conditionTemp: '23.1',
                    recondingTime: '2019-05-21 10:08:56',
                    operator: '张小狗'
                }, {
                    conditionName: '空调一',
                    conditionTemp: '23.1',
                    recondingTime: '2019-05-21 10:08:56',
                    operator: '张小狗'
                }, {
                    conditionName: '空调一',
                    conditionTemp: '23.1',
                    recondingTime: '2019-05-21 10:08:56',
                    operator: '张小狗'
                }, {
                    conditionName: '空调一',
                    conditionTemp: '23.1',
                    recondingTime: '2019-05-21 10:08:56',
                    operator: '张小狗'
                }
            ],
            currImage: '',
            dialogTableVisible: false,//模态框显示状态
            currentPage: 1,// 当前页
            pagesize: 10,//一页的数量
            totalCount: 10,//总条数
            form: {
                region: '近一天'
            },
            dateList: [
                {
                    id: 0,
                    date: '近一天'
                },
                {
                    id: 1,
                    date: '近七天'
                },
                {
                    id: 3,
                    date: '近十五天'
                },
                {
                    id: 4,
                    date: '近一个月'
                },
            ],
            airConditionerList: [
                {
                    id: 0,
                    conditionName: '空调一'
                },
                {
                    id: 1,
                    conditionName: '空调二'
                },
                {
                    id: 3,
                    conditionName: '空调三'
                },
                {
                    id: 4,
                    conditionName: '空调四'
                },
            ],
            snapImages: [
                {
                    title: '2019-02-14 18:25:08',
                    url: require('../assets/002.jpg'),
                    state: 'on',
                    operator: '张三'
                },
                {
                    title: '2019-02-14 18:25:08',
                    url: require('../assets/002.jpg'),
                    state: 'off',
                    operator: '张大大'
                },
                {
                    title: '2019-02-14 18:25:08',
                    url: require('../assets/002.jpg'),
                    state: 'on',
                    operator: '李四'
                },
                {
                    title: '2019-02-14 18:25:08',
                    url: require('../assets/002.jpg'),
                    state: 'off',
                    operator: '王五'
                },
                {
                    title: '2019-02-14 18:25:08',
                    url: require('../assets/002.jpg'),
                    state: 'on',
                    operator: '赵六'
                },
                {
                    title: '2019-02-14 18:25:08',
                    url: require('../assets/002.jpg'),
                    state: 'off',
                    operator: '刘七'
                }
            ],
            ops: {  //滚动条参数配置
                // rail: {
                //     background: '#25a5f9',
                //     opacity: 0,
                //     size: '6px',
                //     specifyBorderRadius: false,
                //     gutterOfEnds: null,
                //     gutterOfSide: '2px',
                //     keepShow: false
                // },
                bar: {  
                    showDelay: 500,
                    onlyShowBarOnScroll: true,
                    keepShow: true,
                    background: '#DEDEDE',
                    opacity: 1,
                    hoverStyle: false,
                    specifyBorderRadius: false,
                    minSize: false,
                    size: '6px',
                    disable: false,
                },
                scrollPanel: {
                    scrollingX: true,
                    scrollingY: false,
                }
            },
        }
    },
    components: {
        vuescroll,
        imageSnapTimeline
    },
    methods: {
        selectTIime () {
            console.log("111")
        },
        checkSubmember (val,index){
            console.log(val,index)
            this.currImage = val.snapIamge;
            this.dialogTableVisible = true
        },
        checkDisappear(){
            this.dialogTableVisible = false
        },
        handleSizeChange(val) {
            this.pagesize = val;
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        }
    }
}
</script>

<style scoped>
.time-line {
    width: 100%;
    height: 220px;
    /* overflow: hidden; */
}
.time-query {
    display: flex;
    justify-content: flex-start;
}
.query {
    margin-right: 20px;
}
.vuescroll-box {
    overflow-x: hidden;
    border: 1px solid #333;
    box-sizing: border-box;
}
.timeline-box {
    margin-top: 20px;
    height: 180px;
    padding-left: 60px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #eee;
    box-sizing: border-box;
    cursor: pointer;
    /* overflow: scroll; */
}
.timeline-item {
    height: 100%;
    /* display:table-cell;
    vertical-align: middle; */
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
}
/* .timeline-item:nth-of-type(1) {
    padding-left: 60px;
} */
.camera-img {
    width: 24px;
    height: 24px;
    display: inline-block;
}
.line {
    width: 140px;
    display: inline-block;
    border-top: 2px solid #333;
}
.date-text {
    font-size: 12px;
    position: absolute;
    top: 65%;
    left: -40px;
}
.operator {
    font-size: 14px;
    position: absolute;
    top: 24%;
    left: 0px;
}

.snap-small-img {
    width: 60px;
    height: 60px;
    display: block;
    position: absolute;
    top: 6%;
    left: -20px;
}
.snapImage {
    width: 40px;
    height: 30px;
    display: block;
    /* visibility:hidden
    visibility:visible */
}
.modal{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    z-index: 1000;
}
.modalImg{
    width: 680px;
    height: 420px;
    z-index: 1001;
    position: relative;
    top: 134px;
}
.modalIcon{
    width: 50px;
    height: 50px;
    position: relative;
    top: 220px;
    left: -363px;
    cursor: pointer;
}
.el-table thead {
    background: #f3f4f8;
}
.pagin {
    display: flex;
    justify-content: space-between;
}
</style>