<template>
    <div class="con">
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
</template>

<script>
import vuescroll from 'vuescroll';
export default {
    data () {
        return {

        }
    },
    components: {
        vuescroll
    },
    props: {
        snapImages: Array,
        ops: Object
    }
}
</script>

<style scoped>
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
</style>
