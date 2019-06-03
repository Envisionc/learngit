<template>
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
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
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
</style>

