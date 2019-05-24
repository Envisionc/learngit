<template>
    <div class="contanier">
        <div class="vd-demo__block vd-demo__block-2">
            <vm-progress type="circle" :percentage="percentage" style="vertical-align: middle;"></vm-progress>
            <button @click="increase">增加</button>
        </div>
        <div class="progress-circle">
            <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">  
                <!-- width/height表示svg的宽高,viewBox表示根据svg的宽高拉出来的大小 -->  
                <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent" />  
                <!-- r表示半径，cx 和 cy 属性定义圆点的 x 和 y 坐标 fill表示背景色 -->  
                <circle stroke-linecap="round" class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset" style="transition: stroke-dashoffset 0.6s ease 0s"/>  
            </svg>
            <div class="percent">
                <slot>{{ rate }}%</slot>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Progress from '../../node_modules/vue-multiple-progress'
import { setInterval } from 'timers';
Vue.use(Progress)
export default {
    data () {
        return {
            percentage: 60,
            dashArray: Math.PI * 100,
            radius: 100,
            percent: 1,
            rate: 0
            // transition: '0.6s ease 0s, stroke 0.6s ease'
        }
    },
    mounted() {
        let _this = this
        setInterval(() => {
            _this.percent = Math.random()
            _this.rate = (_this.percent * 100).toFixed(2)
        },1000)
    },
    computed: {
        dashOffset() {
            return (1 - this.percent) * this.dashArray
        }
    },
    methods: {
        // dashOffset() {
        //     return (1 - this.percent) * this.dashArray
        // },
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
.progress-circle  
    position relative  
    circle  
        stroke-width 8px  
        // stroke-width表示环形的宽度  
        transform-origin center  
        // 中心旋转  
        &.progress-background  
            transform scale(0.9)  
            stroke #04283c 
        &.progress-bar  
            transform scale(0.9) rotate(-90deg)  
            stroke #3dd4d3  
    .percent
        color #333
</style>
