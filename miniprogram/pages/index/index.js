
var mzplugin = requirePlugin('mz-plugin');
// pages/index/index.js
const app = getApp();

Page({
  data: {

    ticketId: "",
    ticketIdDefault: "10181510",
    userInfo: {
      avatarUrl: '',
      nickName: '',
      uniqueId: '',
      phone: ''
    },

    appId: "",
    secret: "",
    channelId: '',
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
      console.log("实例化盟主SDK的结果：",res);
    })

    wx.getUserInfo({
      success: function(res) {
        console.log(res)
      }
    })
    wx.getSetting({
      success: function(res) {
        console.log(res)
      }
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

  },

  ticketId: function(e){
    this.setData({
      ticketId: e.detail.value
   }) 
  },
  uniqueId: function(e){
    this.setData({
      'userInfo.uniqueId': e.detail.value
   }) 
  },
  
  nickName: function(e){
    this.setData({
      'userInfo.nickName': e.detail.value
   }) 
  },

  phone: function(e){
    this.setData({
      'userInfo.phone': e.detail.value
    })
  },

  avatarUrl: function(e){
    this.setData({
      'userInfo.avatarUrl': e.detail.value
   }) 
  },

  toLive: function (live_style) {
    var _this = this;
    if (this.data.ticketId.length <= 0) {
      this.data.ticketId = this.data.ticketIdDefault
    }
    if (this.data.userInfo.uniqueId.length <= 0) {
      this.data.userInfo.uniqueId = "mengzhuyouke";
    }
    if (this.data.userInfo.nickName.length <= 0) {
      this.data.userInfo.nickName = "游客";
    }
    if (this.data.userInfo.phone.length <= 0) {
      this.data.userInfo.phone = "19912344321";
    }
    if (this.data.userInfo.avatarUrl.length <= 0) {
      this.data.userInfo.avatarUrl = "https://s1.zmengzhu.com/user/images/user-default-image.png";
    }
    //获取用户信息
    app.globalData.userInfo.uniqueId = this.data.userInfo.uniqueId;
    app.globalData.userInfo.nickName = this.data.userInfo.nickName;
    app.globalData.userInfo.avatarUrl = this.data.userInfo.avatarUrl;
    app.globalData.userInfo.phone = this.data.userInfo.phone;

    //保存到本地缓存里
    var user = {
      uniqueId: app.globalData.userInfo.uniqueId,
      name: app.globalData.userInfo.nickName,
      avatar: app.globalData.userInfo.avatarUrl,
    }

    mzplugin.mzSDK.initUser(user).then(function (res) {
      wx.navigateTo({
        url: `/pages/livecheckpermission/livecheckpermission?ticket_id=${_this.data.ticketId || _this.data.ticketIdDefault}&live_style=${live_style}`
    })
    }, function (err) {
      console.log(err);
    })
  },

  // 横屏播放
  toLandspacePlayerView: function () {
    this.toLive(0);
  },
  
  // 竖屏播放
  toPortraitPlayerView: function () {
    this.toLive(1);
  },

  // 推流测试
  toLivePuhser: function () {
    var that = this
    wx.navigateTo({
      url: `/pages/createactivity/createactivity?channelId=${that.data.channelId}`
    })
  },

})
