<template>
    <div class="wrap">
        <secondaryPages :selectList="selectList" :form="form" :roomList="roomList"/>
    </div>
</template>

<script>
import secondaryPages from '@/components/public/secondaryPages'
export default {
    data() {
        return {
            selectList: [
                {
                    id:0,
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
                {id:0,name:'东一房'},
                {id:1,name:'北三房'},
                {id:2,name:'南一房'},
            ]
        }
    },
    components: {
        secondaryPages
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
.wrap {
    width: 100%;
    height: 100%;
}
</style>
