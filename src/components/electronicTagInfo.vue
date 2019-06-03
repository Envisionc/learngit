<template>
    <div class="con-item">
        <div class="time-line">
            <div class="time-query">
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
                        <div class="timeline-item" v-for="(item, index) in archivesInfo" :key="index">
                            <img class="camera-img" ref="scaleImg" v-if="item.state == 1" src="../assets/image/on.png" alt="" @mousemove="scalein(index, item.state)" @mouseout="scaleout(index, item.state)">
                            <img class="camera-img" ref="scaleImg" v-if="item.state == 0" src="../assets/image/off.png" alt="" @mousemove="scalein(index, item.state)" @mouseout="scaleout(index, item.state)">
                            <div class="line" :style="{visibility:index == (archivesInfo.length - 1) ? 'hidden': 'visible'}"></div>
                            <p class="date-text" v-if="item.state == 0">{{ item.loanTime }}</p>
                            <p class="date-text" v-if="item.state == 1">{{ item.archiveTime }}</p>
                            <p class="operator" v-if="item.state == 0">{{ item.fileNumber }} (借出)</p>
                            <p class="operator" v-if="item.state == 1">{{ item.fileNumber }} (归档)</p>
                        </div>
                    </div>
                </vuescroll>
            <!-- </div> -->
        </div>
        <el-table :data="archivesInfo" style="width: 100%;margin-bottom:55px;margin-top:80px;">
            <el-table-column  prop="fileNumber"  label="档案号" align="center"></el-table-column>
            <el-table-column  prop="archivesTitle" label="题名" align="center"></el-table-column>
            <el-table-column  prop="loanTime"  label="借出时间" align="center"></el-table-column>
            <el-table-column  prop="archiveTime"  label="归档时间" align="center"></el-table-column>
            <el-table-column  prop="operator"  label="操作人" align="center"></el-table-column>
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
                    conditionName: '120103011111',
                    conditionTemp: '《孔府档案选》',
                    recondingTime: '2019-05-21 10:08:56',
                    operator: '2019-05-29 12:08:56'
                }, {
                    conditionName: '120103011112',
                    conditionTemp: '孔府档案选编',
                    recondingTime: '2019-05-21 10:08:56',
                    operator: '2019-06-21 10:00:56'
                }, {
                    conditionName: '120103011113',
                    conditionTemp: '孔府档案的法律史料价值研究',
                    recondingTime: '2019-05-21 10:08:56',
                    operator: '2019-05-23 19:08:56'
                }, {
                    conditionName: '120103011114',
                    conditionTemp: '孔府档案概述',
                    recondingTime: '2019-05-21 10:08:56',
                    operator: '2019-05-25 13:08:23'
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
            archivesInfo: [
                {
                    fileNumber: '#15121', //档案号
                    archivesTitle: '《孔府档案选》',  //档案题名
                    loanTime: '2019-02-14 18:25:08',   //借出时间
                    archiveTime: '2019-02-17 18:25:08', //归档时间
                    state: 0,    //状态 0--借出  1---归档
                    operator: '张晓刚'
                },
                {
                    fileNumber: '#15121', //档案号
                    archivesTitle: '孔府档案选编',  //档案题名
                    loanTime: '2019-02-14 18:25:08',   //借出时间
                    archiveTime: '2019-02-17 18:25:08', //归档时间
                    state: 1,    //状态
                    operator: '程大开'
                },
                {
                    fileNumber: '#12301', //档案号
                    archivesTitle: '孔府档案的法律史料价值研究',  //档案题名
                    loanTime: '2019-02-14 18:25:08',   //借出时间
                    archiveTime: '2019-02-17 18:25:08', //归档时间
                    state: 1,    //状态
                    operator: '刘哲思'
                },
                {
                    fileNumber: '#12351', //档案号
                    archivesTitle: '孔府档案的由来',  //档案题名
                    loanTime: '2019-02-14 18:25:08',   //借出时间
                    archiveTime: '2019-02-17 18:25:08', //归档时间
                    state: 0,    //状态
                    operator: '朱小军'
                },
                {
                    fileNumber: '#45121', //档案号
                    archivesTitle: '孔府档案的法律史料价值研究',  //档案题名
                    loanTime: '2019-02-14 18:25:08',   //借出时间
                    archiveTime: '2019-02-17 18:25:08', //归档时间
                    state: 1,    //状态
                    operator: '王宇恒'
                },
                {
                    fileNumber: '#24121', //档案号
                    archivesTitle: '孔府档案概述',  //档案题名
                    loanTime: '2019-02-14 18:25:08',   //借出时间
                    archiveTime: '2019-02-17 18:25:08', //归档时间
                    state: 0,    //状态
                    operator: '马谡年'
                }
            ],
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
        this.totalCount = this.archivesInfo.length
    },
    methods: {
        selectTIime () {
            console.log("111")
        },
        // 移入事件
        scalein (index,state) {
            if (state == 1) {
                let nel = this.$refs.scaleImg[index]
                nel.classList.add('dynamic-success')
            } else if (state == 0) {
                let nel = this.$refs.scaleImg[index]
                nel.classList.add('dynamic-warning')
            }
            
        },
        // 移出事件
        scaleout (index,state) {
            if (state == 1) {
                let nel = this.$refs.scaleImg[index]
                nel.classList.remove('dynamic-success')
            } else if (state == 0) {
                let nel = this.$refs.scaleImg[index]
                nel.classList.remove('dynamic-warning')
            }
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
    border-radius: 50%;
}
.dynamic-warning {
    animation:warning 1.3s infinite ease-in-out;
}
.dynamic-success {
    animation:success 1.3s infinite ease-in-out;
}
@keyframes warning {
    0% {
        box-shadow: 0 0 8px 6px #fff;
    } 
    50% {
        box-shadow: 0 0 8px 6px #ec2020;
    }
    100% {
        box-shadow: 0 0 8px 6px #fff;
      }
}
@keyframes success {
    0% {
        box-shadow: 0 0 8px 6px #fff;
    } 
    50% {
        box-shadow: 0 0 8px 6px #0d4f3c;
    }
    100% {
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
