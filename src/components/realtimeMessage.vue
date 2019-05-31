<template>
    <div class="con-item">
        <div class="time-msg">
            <div class="time-query">
                <el-select @change="selectTIime" v-model="form.region" placeholder="请选择库房">
                    <el-option 
                        v-for="item in dateList" 
                        :key="item.id"
                        :label="item.date"
                        :value="item.id"
                    ></el-option>
                </el-select>
                <div class="box">
                    <ul class="con1" ref="con1" :class="{anim:animate==true}">
                        <li class="con1-item" v-for='(item, index) in items' :key="index">
                            <img class="msg-type" :src="msgIcon0" v-if="item.state == 0">
                            <img class="msg-type" :src="msgIcon1" v-else-if="item.state == 1">
                            <img class="msg-type" :src="msgIcon2" v-else-if="item.state == 2">
                            <div class="message">
                                {{item.name}}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <el-table :data="messageInfo" style="width: 100%;margin-bottom:55px;margin-top:80px;">
            <el-table-column  prop="title"  label="消息标题" align="center"></el-table-column>
            <el-table-column  prop="msgType" label="消息类别" align="center"></el-table-column>
            <el-table-column  prop="createTime"  label="生成时间" align="center"></el-table-column>
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
            messageInfo: [],
            messageInfo0: [
                {
                    title: '新闻新闻顺风顺水防守该方法是德国官方粉丝第三帝国方法',
                    msgType: '新闻',
                    createTime: '2019-05-21 10:08:56',
                    localtion: '001室',
                    state: 0,   // 0--新闻， 1-- 公告， 2-- 警报
                },{
                    title: '公告一月份电费',
                    msgType: '公告',
                    createTime: '2019-05-21 10:48:56',
                    localtion: '001室',
                    state: 1,
                },{
                    title: '东一楼的空调异常了啊',
                    msgType: '警报',
                    createTime: '2019-05-21 10:58:56',
                    localtion: '001室',
                    state: 2,
                },
            ],
            messageInfo1: [
                {
                    title: '新闻新闻顺风顺水防守该方法是德国官方粉丝第三帝国方法',
                    msgType: '新闻',
                    createTime: '2019-05-21 10:08:56',
                    localtion: '001室',
                    state: 0,
                },{
                    title: '公告一月份电费',
                    msgType: '公告',
                    createTime: '2019-05-21 10:48:56',
                    localtion: '001室',
                    state: 1,
                },{
                    title: '东一楼的空调异常了啊',
                    msgType: '警报',
                    createTime: '2019-05-21 10:58:56',
                    localtion: '001室',
                    state: 2,
                },{
                    title: '分段式结构上的反对反对房价跌幅',
                    msgType: '新闻',
                    createTime: '2019-05-22 10:08:56',
                    localtion: '001室',
                    state: 0,
                },{
                    title: '公告--我们一起做好事',
                    msgType: '公告',
                    createTime: '2019-05-24 10:48:56',
                    localtion: '001室',
                    state: 1,
                },{
                    title: '东一楼的灯坏了',
                    msgType: '警报',
                    createTime: '2019-05-26 10:58:56',
                    localtion: '001室',
                    state: 2,
                },
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
                    fileNumber: '', //档案号
                    archivesTitle: '《孔府档案选》',  //档案题名
                    loanTime: '2019-02-14 18:25:08',   //借出时间
                    archiveTime: '2019-02-17 18:25:08', //归档时间
                    state: 0,    //状态 0--借出  1---归档
                },
                {
                    fileNumber: '#15121', //档案号
                    archivesTitle: '',  //档案题名
                    loanTime: '2019-02-14 18:25:08',   //借出时间
                    archiveTime: '2019-02-17 18:25:08', //归档时间
                    state: 1,    //状态
                },
                {
                    fileNumber: '#12301', //档案号
                    archivesTitle: '',  //档案题名
                    loanTime: '2019-02-14 18:25:08',   //借出时间
                    archiveTime: '2019-02-17 18:25:08', //归档时间
                    state: 1,    //状态
                },
                {
                    fileNumber: '#12351', //档案号
                    archivesTitle: '',  //档案题名
                    loanTime: '2019-02-14 18:25:08',   //借出时间
                    archiveTime: '2019-02-17 18:25:08', //归档时间
                    state: 0,    //状态
                },
                {
                    fileNumber: '#45121', //档案号
                    archivesTitle: '',  //档案题名
                    loanTime: '2019-02-14 18:25:08',   //借出时间
                    archiveTime: '2019-02-17 18:25:08', //归档时间
                    state: 1,    //状态
                },
                {
                    fileNumber: '#24121', //档案号
                    archivesTitle: '',  //档案题名
                    loanTime: '2019-02-14 18:25:08',   //借出时间
                    archiveTime: '2019-02-17 18:25:08', //归档时间
                    state: 0,    //状态
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
            animate:false,
            items:[
                {
                    name: "新闻新闻顺风顺水防守该方法是德国官方粉丝第三帝国方法",
                    state: 0,   // 0--新闻， 1-- 公告， 2-- 警报
                },
                {
                    name: "公告一月份电费",
                    state: 1
                },
                {
                    name: "东一楼的空调异常了啊",
                    state: 2
                }
            ],
            msgIcon0: require('../assets/image/xinwen.png'),
            msgIcon1: require('../assets/image/gonggao.png'),
            msgIcon2: require('../assets/image/jinggao.png'),
        }
    },
    components: {
        vuescroll,
        imageSnapTimeline
    },
    created(){
        setInterval(this.scroll,1000)
    },
    mounted () {
        this.messageInfo = this.messageInfo0
        this.totalCount = this.messageInfo.length
    },
    methods: {
        scroll(){
            this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
            setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
                this.items.push(this.items[0]);  // 将数组的第一个元素添加到数组的
                this.items.shift();               //删除数组的第一个元素
                this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
            },500)
        },
        selectTIime (i) {
            if (i == 0) {
                this.messageInfo = this.messageInfo0
            } else if (i == 1) {
                this.messageInfo = this.messageInfo1
            }
            this.totalCount = this.messageInfo.length
        },
        scaleout (index) {
            // console.log(index)
            // console.log(this.$refs.scaleImg[index])
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
.time-msg {
    width: 100%;
}
.time-query {
    display: flex;
    justify-content: space-between;
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
.box{
    width: 400px;
    height: 40px;
    overflow: hidden;
    /* padding-left: 30px; */
    border: 1px solid #eee;
    box-sizing: border-box;
}
.anim{
    transition: all 0.5s linear;
    margin-top: -40px;
}
.con1-item{
    list-style: none;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.message {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    text-align: left;
    box-sizing: border-box;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}
.msg-type {
    width: 24px;
    height: 24px;
    margin-left: 10px;
    display: block;
}
</style>
