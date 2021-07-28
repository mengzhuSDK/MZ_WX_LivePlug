var mzplugin = require('../../mzinterface/utils/mzSDK')

Page({
  data: {
    appId: "",
    secret: "",
    channelId: '',//推流所需要的频道ID
  },

  onLoad: function () {
    //实例化盟主SDK,请一切操作都在实例化成功之后处理
    var _this = this;
    var data = {
      permision: {
        id: _this.data.appId,
        key: _this.data.secret
      },
      isShowLog: false,
    }
    mzplugin.mzSDK.initSDK(data).then(function (res) {
      console.log("实例化盟主SDK的结果：", res);
    })
  },

  // 直播｜回放
  toPlayerInput: function () {
    var that = this
    wx.navigateTo({
      url: `/pages/player/playinput/playinput`,
    })
  },

  // 推流测试
  toLivePuhser: function () {
    var that = this
    wx.navigateTo({
      url: `/pages/live/createactivity/createactivity?channelId=${that.data.channelId}`
    })
  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }

})