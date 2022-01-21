// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    let that = this;
    wx.getSystemInfo({
      success: res => {
        if(res.safeArea.top > 20){
          that.globalData.isIphoneX = true
        }
      }
    })
  },
  globalData: {
    isIphoneX: false,
    userInfo: {
      avatarUrl: '',  //存放全局登录用户头像地址
      nickName: '',   //存放全局登录用户昵称
      uniqueId: '',   //存放全局登录用户唯一标识
      phone: ''       //存放全局登录用户的手机号
    },
    // 是否使用live-player组件，因为使用live-player组件（可以使用rtmp流地址，延迟跟移动端APP一样很低），微信需要使用者有一定的资质，具体参考 https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html
    // 如果没有使用live-player的权限，那就这里设置false，会默认使用video标签（使用m3u8流，跟普通h5页面一样）
    isCanUseLivePlayer: true,
  }
})
