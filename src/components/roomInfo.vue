<template>
    <div class="con-item">
        <div class="con-box" v-for="(item,index) in videoInfo" :key="index">
            <p class="camera-title">{{ item.title }}</p>
            <div class="camera-box">
                <div class="left">
                    <p class="l-title">实时视频</p>
                    <div class="video">
                        <video-player  class="video-player vjs-custom-skin"
                            ref="videoPlayer"
                            :playsinline="true"
                            :options="playerOptions"
                        ></video-player>
                    </div>
                </div>
                <div class="right">
                    <p class="r-title">短视频</p>
                    <div class="short-video">
                        <div class="short-video-item" v-for="(subItem,subIndex) in item.shortVideos" :key="subIndex" @click="reviewImage(subItem.poster)">
                            <img :src="subItem.poster">
                            <div class="playIcon" v-if="subItem.type == 'video'">
                                <img src="../assets/image/shipin_play.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="dialogImageVisible" class="modalBox">
            <div class="modal">
                <img :src="currImage" class="modalImg">
                <img src="../assets/image/quxiao.png" class="modalIcon" @click="checkDisappear">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            playerOptions: {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    type: "video/mp4",
                    // src: "../assets/test02.mp4" //url地址
                    src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm" //url地址
                }],
                poster: "../assets/005.jpg", //你的封面地址
                // width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true  //全屏按钮
                }
            },
            videoInfo: [
                {
                    id: 0,
                    title: '摄像头一',
                    realTimeVideo: '',
                    shortVideos: [
                        {
                            id: '0001',
                            poster: require('../assets/005.jpg'),    //短视频封面图
                            cerateTime: '2019-05-29',        //短视频截取时间
                            type: "video"
                        },
                        {
                            id: '0002',
                            poster: require('../assets/006.jpg'),
                            cerateTime: '2019-05-30',
                            type: "video"
                        },
                        {
                            id: '0003',
                            poster: require('../assets/007.jpg'),
                            cerateTime: '2019-05-31',
                            type: "video"
                        },
                        {
                            id: '0004',
                            poster: require('../assets/002.jpg'),
                            cerateTime: '2019-06-01',
                            type: "image"
                        },
                        {
                            id: '0005',
                            poster: require('../assets/003.jpg'),
                            cerateTime: '2019-06-01',
                            type: "image"
                        }
                    ]
                },
                {
                    id: 1,
                    title: '摄像头二',
                    realTimeVideo: '',
                    shortVideos: [
                        {
                            id: '0001',
                            poster: require('../assets/002.jpg'),    //短视频封面图
                            cerateTime: '2019-05-29'        //短视频截取时间
                        },
                        {
                            id: '0002',
                            poster: require('../assets/003.jpg'),    //短视频封面图
                            cerateTime: '2019-05-30'        //短视频截取时间
                        },
                        {
                            id: '0003',
                            poster: require('../assets/007.jpg'),    //短视频封面图
                            cerateTime: '2019-05-31'        //短视频截取时间
                        }
                    ]
                }
            ],
            dialogImageVisible: false,
            currImage: ''
        }
    },
    methods: {
        reviewImage (url) {
            this.currImage = url;
            this.dialogImageVisible = true
        },
        checkDisappear () {
            this.dialogImageVisible = false
        }
    }
}
</script>

<style scoped>
.con-box {
    margin-bottom: 20px;
}
.camera-title {
    height: 40px;
    line-height: 40px;
    font: bold 14px #333;
    margin-bottom: 20px;
}
.camera-box {
    display: flex;
}
.left,.right {
    flex: 1;
}
.left {
    margin-right: 20px;
}
.l-title,.r-title {
    height: 30px;
    line-height: 30px;
    font: bold 14px #333;
    margin-bottom: 10px;
}
.video {
    width: 100%;
    height: 400px;
}
.short-video {
    width: 100%;
    height: 400px;
    border: 1px solid #ccc;
    padding: 10px;
    box-sizing: border-box;
}
.short-video-item {
    width: 120px;
    height: 80px;
    margin-right: 10px;
    float: left;
    border: 1px solid #ccc;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
}
.short-video-item img {
    width: 100%;
    height: 100%;
    display: block;
}
.playIcon {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.playIcon img {
    width: 100%;
    height: 100%;
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
</style>
