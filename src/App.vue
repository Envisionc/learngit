<template>
  <div id="app">
    <!-- <img class="app-bg" src="./assets/bg001.png" alt=""> -->
    <div class="v-header">
      <div class="v-title">智慧库房大数据平台</div>
      <div id="nav">
        <router-link to="/">首页</router-link> |
        <router-link to="/about">实时监控</router-link> |
        <router-link to="/safetyProtection">门禁</router-link> |
        <router-link to="/temperatureControl">温控</router-link> |
        <router-link to="/electronicTags">电子标签</router-link> |
        <router-link to="/archivalDataStatistics">档案数据统计</router-link> |
        <router-link to="/realtimeMessage">实时消息</router-link> |
        <router-link to="/fireControl">消防</router-link> |
        <router-link to="/usageStatistics">利用统计</router-link>
      </div>
    </div>
    <!-- <div class="v-content">
      <img class="content-bg" src="./assets/warehouse_bg.jpg" alt=""> -->
      <router-view/>
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  components: {}
}
</script>

<style lang="stylus">
*
  margin 0px
  padding 0px
  box-sizing border-box
ul,li
  list-style none
  padding 0
  margin 0
.clearfix:after
  display block
  content ""
  height 0
  visibility hidden
  clear both
.clearfix
  zoom 1
#app
  width 100%
  height 100%
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #ffffff
  position relative
  // background url('assets/bg001.png') no-repeat center center
  // background-size cover
  // background-attachment fixed
  .app-bg
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    z-index -1
  .v-header
    height 80px
    display flex
    justify-content flex-start
    box-sizing border-box
    border-bottom 1px solid #023f99
    background #062a47
    .v-title
      padding 0px 60px
      font-size 20px
      color #ffffff
      font-weight 600
      line-height 80px
    #nav
      padding 30px
      a
        font-weight bold
        font-size 16px
        color #fff
        text-decoration none
        padding 0 15px
        &.router-link-exact-active
          color #23BCF8
  .v-content
    // background rgba(8,35,74, .8)
    // background url('assets/warehouse_bg.jpg') no-repeat center
    // background-size cover
    .content-bg
      width 100%
      height 100%
      display block
      position absolute
      top 80px
      left 0
      z-index -1
</style>
