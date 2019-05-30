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
                    <el-tab-pane v-for="(item,index) in roomList" :key="index" :label="item.name">
                        <div class="tab-content" v-if="index == 0">
                            <electronicTagInfo />
                        </div>
                        <div class="tab-content" v-if="index == 1">我是房间二</div>
                        <div class="tab-content" v-if="index == 2">我是房间三</div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import electronicTagInfo  from '@/components/electronicTagInfo'
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
        electronicTagInfo
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
</style>
