var mzplugin = require('../../utils/mzSDK');

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    live_style: 0,
    ticket_id: '000000',
    //观看方式 1免费 5白名单 6F码
    view_mode: 1,
    //用户输入的F码
    fcode: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    this.setData({
      live_style: options.live_style,
      ticket_id: options.ticket_id
    }, () => {
      console.log("需要进行观看权限检测的活动是：", this.data.live_style, this.data.ticket_id);
    })
    wx.showLoading()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getTickePlayPermission()

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  /**
   * 获取活动观看方式
   */
  getTickePlayPermission: function () {
    var _this = this;

    var loginTokenData = {
      unique_id: app.globalData.userInfo.uniqueId,
      name: app.globalData.userInfo.nickName,
      avatar: app.globalData.userInfo.avatarUrl
    }
    // 先获取登录token
    var data = {
      ticketId: _this.data.ticket_id,
      phone: app.globalData.userInfo.phone
    }

    mzplugin.mzSDK.checkPlayPermission(data).then(function (res) {
      wx.hideLoading()
      console.log(res);
      // "view_mode": 6, // 视频观看模式 1:免费 2:vip 3:付费 4:密码  5:白名单观看 6:F码观看
      // "allow_play": 1 // 是否有权限观看 0:否 1:是
      if (res.allow_play == 1) {
        _this.toPlayerView();
        return;
      }

      if (res.view_mode == 5 || res.view_mode == 6) {
        _this.setData({
          view_mode: res.view_mode
        })
      } else {
        _this.toPlayerView();
      }
    }, function (err) {
      _this.showErrorAlert(err.msg);
      console.log("获取该活动的观看权限失败:", err);
    })
  },

  /**
   * 展示错误弹窗
   */
  showErrorAlert: function (errString) {
    wx.hideLoading()
    wx.showModal({
      title: '提示',
      content: errString || '',
      confirmText: '返回',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          wx.navigateBack()
        }
      }
    })
  },

  /**
   * 去播放器界面
   */
  toPlayerView: function () {
    var _this = this;
    wx.redirectTo({
      url: `/pages/liveroom/liveroom?ticket_id=${this.data.ticket_id}&live_style=${this.data.live_style}`,
      success: function () {
        _this.setData({
          view_mode: -1
        })
      }
    })
  },

  /**
   * 原路返回
   */
  backTap: function () {
    wx.navigateBack({})
  },

  /**
   * 获取输入的F码
   */
  fcodeinput: function (e) {
    var _this = this;
    this.setData({
      fcode: e.detail.value
    })
  },

  /**
   * 提交输入的F码
   */
  fcodesure: function () {
    var _this = this;
    if (this.data.fcode == undefined || this.data.fcode.length <= 0) {
      wx.showToast({
        title: "请输入F码",
        icon: 'none'
      })
      return;
    }
    wx.showLoading()
    console.log("提交的F码：", this.data.fcode)

    var data = {
      ticketId: this.data.ticket_id,
      fCode: this.data.fcode
    }

    mzplugin.mzSDK.useFCode(data).then(function (res) {
      wx.hideLoading()
      _this.toPlayerView()
    }, function (err) {
      wx.hideLoading()
      wx.showToast({
        title: err.msg,
        icon: 'none'
      })
    })
  }
});