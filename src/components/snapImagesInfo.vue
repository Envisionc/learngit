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
            <!-- <vuescroll :ops="ops">
                
            </vuescroll> -->
            <vuescroll :ops="ops">
            <div class="timeline-box">
                
                    <div class="timeline-item" v-for="(item, index) in snapImages" :key="index">
                        <img class="camera-img" src="../assets/image/camera.jpg" alt="">
                        <div class="line"></div>
                        <p class="date-text">{{ item.title }}</p>
                        <img class="snap-small-img" :src="item.url" alt="">
                    </div>
                
            </div>
            </vuescroll>
        </div>
        <el-table :data="imagesList" style="width: 100%;margin-bottom:55px;margin-top:80px;">
            <el-table-column  prop="snapLocal"  label="抓拍位置" align="center"></el-table-column>
            <el-table-column  prop="snapType" label="抓拍类型" align="center"></el-table-column>
            <el-table-column  prop="snapIamge"  label="抓拍图片"    align="center">
                <template slot-scope="scope">
                    <el-button @click.native.prevent="checkSubmember(scope.row,scope.$index)" size="medium">查看</el-button>
                    <!-- <img :src="scope.row.snapImage" class="snapImage"> -->
                    <div v-if="dialogTableVisible" class="modalBox">
                        <div class="modal">
                            <img :src="currImage" class="modalImg">
                            <img src="../assets/image/quxiao.png" class="modalIcon" @click="checkDisappear">
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column  prop="snapTime"  label="抓拍时间" width="140" align="center"></el-table-column>
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
export default {
    data() {
        return {
            imagesList: [
                {
                    snapLocal: '房间一一度门',
                    snapType: '门禁',
                    snapIamge: require('../assets/002.jpg'),
                    snapTime: '2019-05-21'
                }, {
                    snapLocal: '房间二一度门',
                    snapType: '门禁',
                    snapIamge: require('../assets/003.jpg'),
                    snapTime: '2019-05-25'
                }, {
                    snapLocal: '房间三一度门',
                    snapType: '门禁',
                    snapIamge: require('../assets/005.jpg'),
                    snapTime: '2019-05-22'
                }, {
                    snapLocal: '房间三二度门',
                    snapType: '门禁',
                    snapIamge: require('../assets/006.jpg'),
                    snapTime: '2019-05-28'
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
            snapImages: [
                {
                    title: '2019-02-14 18:25:08',
                    url: require('../assets/002.jpg')
                },
                {
                    title: '2019-02-14 18:25:08',
                    url: require('../assets/002.jpg')
                },
                {
                    title: '2019-02-14 18:25:08',
                    url: require('../assets/002.jpg')
                },
                {
                    title: '2019-02-14 18:25:08',
                    url: require('../assets/002.jpg')
                },
                {
                    title: '2019-02-14 18:25:08',
                    url: require('../assets/002.jpg')
                },
                {
                    title: '2019-02-14 18:25:08',
                    url: require('../assets/002.jpg')
                },
                {
                    title: '2019-02-14 18:25:08',
                    url: require('../assets/002.jpg')
                },
                {
                    title: '2019-02-14 18:25:08',
                    url: require('../assets/002.jpg')
                },
                {
                    title: '2019-02-14 18:25:08',
                    url: require('../assets/002.jpg')
                },
                {
                    title: '2019-02-14 18:25:08',
                    url: require('../assets/002.jpg')
                },
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
        vuescroll
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
