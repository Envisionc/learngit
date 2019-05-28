<template>
    <div class="con-item">
        <el-table :data="imagesList" style="width: 100%;margin-bottom:55px">
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
export default {
    data() {
        return {
            imagesList: [
                {
                    snapLocal: '房间一摄像头',
                    snapType: '摄像头',
                    snapIamge: require('../assets/002.jpg'),
                    snapTime: '2019-05-21'
                }, {
                    snapLocal: '房间二一度门',
                    snapType: '门禁',
                    snapIamge: require('../assets/003.jpg'),
                    snapTime: '2019-05-25'
                }, {
                    snapLocal: '房间三摄像头',
                    snapType: '摄像头',
                    snapIamge: require('../assets/005.jpg'),
                    snapTime: '2019-05-22'
                }, {
                    snapLocal: '房间三门禁',
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
        }
    },
    methods: {
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
