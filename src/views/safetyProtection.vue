<template>
    <div class="contanier">
        <div class="vd-demo__block vd-demo__block-2">
            <!-- <vm-progress type="circle" :percentage="percentage" style="vertical-align: middle;">占比{{percentage}}%</vm-progress> -->
            <vm-progress type="circle" :percentage="percentage" style="vertical-align: middle;"></vm-progress>
            <!-- <vm-progress type="circle" :percentage="percentage" reverse style="vertical-align: middle;"></vm-progress> -->
            <!-- <vm-button-group>
                <vm-button type="default" @click="increase">增加</vm-button>
                <vm-button type="default" @click="decrease">减少</vm-button>
            </vm-button-group> -->
            <button @click="increase">增加</button>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Progress from '../../node_modules/vue-multiple-progress'
Vue.use(Progress)
export default {
    data () {
        return {
            percentage: 60
        }
    },
    methods: {
        increase () {
            if (this.percentage === 100) return
            this.percentage += 10
        },
        decrease () {
            if (this.percentage === 0) return
            this.percentage -= 10
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
