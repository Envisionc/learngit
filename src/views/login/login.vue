<template>
    <div class="login-page">
      <div class="header-text">用户登录</div>
      <div class="content">
        <div class="login-info">
          <div class="user-name">
            <input type="text" placeholder="输入用户名">
          </div>
          <div class="password">
            <input type="text" placeholder="输入密码">
          </div>
          <div class="sign-in">
            <button class="btn" @click="goToListPage">登录</button>
          </div>
          <div class="more">
            <div class="more-op">
              <div class="forget-password">忘记密码</div>
              <div class="register-account">注册账号</div>
            </div>
          </div>
          <div class="bottom">
            <div class="signature">lantai.智慧库房</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    methods: {
        goToListPage() {
        console.log("1111111")
        // console.log(this.$router)
        // console.log(this)
        this.$router.push({ path:'/listPage'  })
        }
  }
}
</script>

<style lang="stylus" scoped>
    .login-page 
        width 100%
        height 100vh
        background linear-gradient(-140deg, #30E1DA, #3179D6)
        .header-text
            height 60px
            line-height 60px
            color #000
            font-size 16px
            text-align center
        .content 
            margin-top 200px
            .login-info
            .user-name 
            .password 
            .sign-in
                height 40px
                display flex
                flex-direction row
                justify-content center
                align-items center
                input 
                width 280px
                height 40px
                border 1px solid #cccccc
                border-radius 4px
                box-sizing border-box
                outline none
                text-indent 10px
            .password 
                margin-top 20px
            .sign-in 
                margin-top 20px
                .btn 
                width 280px
                height 40px
                border none
                outline none
                border-radius 4px
                background rgba(0,0,0, .2)
                color #000
                font-size 16px
                text-align center
                cursor pointer
            .more 
                display flex
                justify-content center
                margin-top 10px
                .more-op
                width 280px
                display flex
                justify-content space-between
                align-items center
                color #ffffff
                font-size 14px
            .bottom
                display flex
                justify-content center
                margin-top 170px
</style>
