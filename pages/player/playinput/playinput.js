const app = getApp();
var mzplugin = require('../../../mzinterface/utils/mzSDK')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    ticketId: "",
    ticketIdDefault: "10181510",
    userInfo: {
      avatarUrl: '',
      nickName: '',
      uniqueId: '',
      phone: ''
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  ticketId: function (e) {
    this.setData({
      ticketId: e.detail.value
    })
  },

  uniqueId: function (e) {
    this.setData({
      'userInfo.uniqueId': e.detail.value
    })
  },

  nickName: function (e) {
    this.setData({
      'userInfo.nickName': e.detail.value
    })
  },

  phone: function (e) {
    this.setData({
      'userInfo.phone': e.detail.value
    })
  },

  avatarUrl: function (e) {
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
        url: `/pages/player/livecheckpermission/livecheckpermission?ticket_id=${_this.data.ticketId || _this.data.ticketIdDefault}&live_style=${live_style}`
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
  }

})