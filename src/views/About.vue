<template>
    <div class="wrap">
        <topHeader />
        <div class="contanier" ref="container">
        <!-- <div class="contanier" ref="container" :style="{width: '100%', height: divH + 'px'}"> -->
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
                        <el-tab-pane v-for="(item,index) in roomList" :key="index" :label="item.name">
                            <div class="tab-content" v-if="index == 0">
                                <roomInfo></roomInfo>
                            </div>
                            <div class="tab-content" v-if="index == 1">我是房间二</div>
                            <div class="tab-content" v-if="index == 2">我是房间三</div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import roomInfo from '@/components/roomInfo'
import topHeader from '@/components/public/topHeader'
export default {
    data() {
        return {
            selectList: [
                {
                    id: 0,
                    name:'库房一'
                },
                {
                    id:1,
                    name:'库房二'
                },
                {
                    id:2,
                    name:'库房三'
                },
            ],
            form: {
                region: ''
            },
            roomList: [
                {
                    id: 0 ,
                    name: '东一房'
                },
                {
                    id: 1,
                    name: '北三房'
                },
                {
                    id: 2,
                    name: '南一房'
                },
            ],
            divH: 0
        }
    },
    components: {
        topHeader,
        roomInfo
    },
    watch: {

    },
    mounted () {
        let container = this.$refs.container
        console.log(container, "1----")
        this.divH = document.documentElement.clientHeight - 80
        console.log("------2", this.divH)
        console.log("------//--", document.documentElement  )
        console.log("------3", container.scrollHeight  )
    },
    methods: {
        selectGet() {
            console.log("111")
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
}
</script>

<style scoped>
.contanier {
    /* height: calc( 100% - 80px ); */
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
</style>

