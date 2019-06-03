<template>
    <div class="con-item">
        <div class="time-line">
            <div class="time-query">
                <el-select @change="selectTIime" v-model="form.region">
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
                        <div class="timeline-item" v-for="(item, index) in equipStatusInfo" :key="index">
                            <div class="warning-icon" ref="scaleImg" v-if="item.state == 1" @mousemove="scaleout(index)" @mouseout="scalein(index)"></div>
                            <div class="success-icon" ref="scaleImg" v-if="item.state == 0" @mousemove="scaleout(index)" @mouseout="scalein(index)"></div>
                            <div class="line" :style="{visibility:index == (equipStatusInfo.length - 1) ? 'hidden': 'visible'}"></div>
                            <p class="date-text">{{ item.recondingTime }}</p>
                            <p class="operator" v-if="item.state == 0">正常</p>
                            <p class="operator" v-if="item.state == 1">异常</p>
                        </div>
                    </div>
                </vuescroll>
            <!-- </div> -->
        </div>
        <el-table :data="equipmentInfo" style="width: 100%;margin-bottom:55px;margin-top:80px;">
            <el-table-column  prop="equipmentName"  label="设备名称" align="center"></el-table-column>
            <el-table-column  prop="recondingTime" label="记录时间" align="center"></el-table-column>
            <el-table-column  prop="equipmentState"  label="设备状态" align="center"></el-table-column>
            <el-table-column  prop="localtion"  label="位置" align="center"></el-table-column>
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
            equipmentInfo: [],
            equipmentInfo0: [
                {
                    equipmentName: '空调',
                    recondingTime: '2019-05-21 10:08:56',
                    equipmentState: '正常',
                    localtion: '001室',
                    state: 0,    //状态 0--正常  1---异常
                }, {
                    equipmentName: '灯',
                    recondingTime: '2019-05-21 10:08:56',
                    equipmentState: '异常',
                    localtion: '001室',
                    state: 1,
                }, {
                    equipmentName: '门',
                    recondingTime: '2019-05-21 10:08:56',
                    equipmentState: '正常',
                    localtion: '001室',
                    state: 0,
                }, {
                    equipmentName: '窗帘',
                    recondingTime: '2019-05-21 10:08:56',
                    equipmentState: '异常',
                    localtion: '001室',
                    state: 1,
                }, {
                    equipmentName: '窗帘',
                    recondingTime: '2019-05-21 10:08:56',
                    equipmentState: '正常',
                    localtion: '001室',
                    state: 0,
                }, {
                    equipmentName: '窗帘',
                    recondingTime: '2019-05-21 10:08:56',
                    equipmentState: '异常',
                    localtion: '001室',
                    state: 1,
                }
            ],
            equipmentInfo1: [
                {
                    equipmentName: '空调',
                    recondingTime: '2019-05-21 10:08:56',
                    equipmentState: '正常',
                    localtion: '001室',
                    state: 0,    //状态 0--正常  1---异常
                }, {
                    equipmentName: '灯',
                    recondingTime: '2019-05-21 10:08:56',
                    equipmentState: '异常',
                    localtion: '001室',
                    state: 1,
                }, {
                    equipmentName: '门',
                    recondingTime: '2019-05-21 10:08:56',
                    equipmentState: '正常',
                    localtion: '001室',
                    state: 0,
                }, {
                    equipmentName: '窗帘',
                    recondingTime: '2019-05-21 10:08:56',
                    equipmentState: '异常',
                    localtion: '001室',
                    state: 1,
                }, {
                    equipmentName: '窗帘',
                    recondingTime: '2019-05-21 10:08:56',
                    equipmentState: '正常',
                    localtion: '001室',
                    state: 0,
                }, {
                    equipmentName: '窗帘',
                    recondingTime: '2019-05-21 10:08:56',
                    equipmentState: '异常',
                    localtion: '001室',
                    state: 1,
                }, {
                    equipmentName: '空调',
                    recondingTime: '2019-05-21 10:08:56',
                    equipmentState: '正常',
                    localtion: '001室',
                    state: 0,    //状态 0--正常  1---异常
                }, {
                    equipmentName: '灯',
                    recondingTime: '2019-05-21 10:08:56',
                    equipmentState: '异常',
                    localtion: '001室',
                    state: 1,
                }, {
                    equipmentName: '门',
                    recondingTime: '2019-05-21 10:08:56',
                    equipmentState: '正常',
                    localtion: '001室',
                    state: 0,
                }, {
                    equipmentName: '窗帘',
                    recondingTime: '2019-05-21 10:08:56',
                    equipmentState: '异常',
                    localtion: '001室',
                    state: 1,
                }, {
                    equipmentName: '窗帘',
                    recondingTime: '2019-05-21 10:08:56',
                    equipmentState: '正常',
                    localtion: '001室',
                    state: 0,
                }, {
                    equipmentName: '窗帘',
                    recondingTime: '2019-05-21 10:08:56',
                    equipmentState: '异常',
                    localtion: '001室',
                    state: 1,
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
                }
            ],
            equipStatusInfo: [],
            ops: {  //滚动条参数配置
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
    mounted () {
        this.equipmentInfo = this.equipmentInfo0
        this.equipStatusInfo = this.equipmentInfo0
        this.totalCount = this.equipmentInfo.length
    },
    methods: {
        selectTIime (n) {
            if (n == 0) {
                this.equipmentInfo = this.equipmentInfo0
                this.equipStatusInfo = this.equipmentInfo0
            } else if (n == 1) {
                this.equipmentInfo = this.equipmentInfo1
                this.equipStatusInfo = this.equipmentInfo1
            }
            this.totalCount = this.equipmentInfo.length
        },
        scaleout (index) {
            console.log(index)
            console.log(this.$refs.scaleImg[index])
            let nel = this.$refs.scaleImg[index]
            nel.classList.add('dynamic')
        },
        scalein (index) {
            let nel = this.$refs.scaleImg[index]
            nel.classList.remove('dynamic')
            // remove
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
}
.timeline-item {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
}
.camera-img {
    width: 24px;
    height: 24px;
    display: inline-block;
}
.warning-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: red;
}
.success-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: green;
}
.dynamic {
    animation:scaleout 1.3s infinite ease-in-out;
}
@keyframes scaleout {
    0% {
        /* transform: scale(1.0);
        -webkit-transform: scale(1.0); */
        box-shadow: 0 0 8px 6px #fff;
    } 
    50% {
        box-shadow: 0 0 8px 6px #ff6633;
    }
    100% {
          /* transform: scale(1.2);
          -webkit-transform: scale(1.2);
          opacity: 1; */
          box-shadow: 0 0 8px 6px #fff;
      }
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
