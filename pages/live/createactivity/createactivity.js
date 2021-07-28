// miniprogram/pages/createactivity.js

var mzplugin = require('../../../mzinterface/utils/mzSDK');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    check: {
      beauty: true, //是否美颜
      back_camera: false, //是否打开后置摄像头
      mute: false, //是否静音
      all_ban_chat: false, //是否开启全体禁言
      isPlayBack: false //是否生成回放
    },
    categoryName: '未选择',
    category_id: '',

    beauty_level: 2,
    // auto_record 是否生成回放 1是
    // live_style 横屏还是竖屏 0-横屏 1-竖屏
    // live_type 语音还是视频直播，0-视频直播 1-语音直播
    // view_mode 观看方式 1-免费，5-白名单， 6-F码
    // pay_notice 使用白名单的提示文案
    activityInfo: {
      liveCover: 'http://s1.t.zmengzhu.com/upload/img/50/6d/506da693ecb2cf6f2fd0e3e92656dde4.png', //活动封面图
      liveName: '小程序活动名称',
      liveIntroduction: '小程序活动简介',
      auto_record: '',
      channelId: '',
      live_style: '1',
      live_type: '0',
      view_mode: '1',
      category_id: '',
      pay_notice: '默认提示文案',
      white_id: '',
      fcode_id: '',
    },

    isStopLiveDialogShow: false,
    isStopDialogButtons: [{
      text: '返回上级'
    }, {
      text: '结束直播'
    }],

    //分类相关
    showCategory: false,
    // 权限相关
    view_mode: 1, //1,免费，5白名单，6F码
    showWhiteList: false,
    showFCode: false,

    // 当前登录用户
    currentUser: {
      uniqueId: '',
      nickName: '',
      avatarUrl: 'https://s1.zmengzhu.com/user/images/user-default-image.png'
    },

    live_tk: '',
    ticket_id: '',

    startPush: {
      live_tk: '',
      ticketId: '',
      uniqueId: '',
      name: '',
      avatar: ''
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    console.log(app.globalData.userInfo)
    this.setData({
      "activityInfo.channelId": options.channelId
    })
    // 从全局复制出来用户信息
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
        if (res.userInfo) {
          _this.data.currentUser.nickName = res.userInfo.nickName,
            _this.data.currentUser.avatarUrl = res.userInfo.avatarUrl
          //保存到本地缓存里
          app.globalData.userInfo.nickName = _this.data.currentUser.nickName;
          app.globalData.userInfo.avatarUrl = _this.data.currentUser.avatarUrl;
        }
      },
      fail: function () {
        _this.data.currentUser.nickName = "主播名称",
          _this.data.currentUser.avatarUrl = "http://s1.t.zmengzhu.com/upload/img/50/6d/506da693ecb2cf6f2fd0e3e92656dde4.png"
        //保存到本地缓存里
        app.globalData.userInfo.nickName = _this.data.currentUser.nickName;
        app.globalData.userInfo.avatarUrl = _this.data.currentUser.avatarUrl;
      }
    })

    this.checkPush();
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

  isStopLiveDialogButton(e) {
    console.log(e)
  },

  /**
   * 检查当前账号是否有推流未结束
   */
  checkPush: function () {
    var that = this
    var data = {
      channelId: that.data.activityInfo.channelId
    }
    mzplugin.mzSDK.getLiveInfoOfChannel(data).then(function (res) {
      console.log(res);
      var is_multipath = res.is_multipath;
      var is_live = res.is_live;
      that.setData({
        isStopLiveDialogShow: false
      })
      if (is_multipath != 1 && is_live != 0) {

      }

    }, function (err) {

    })
  },

  /**
   * 分类选择事件
   */
  bindCategoryClose: function (e) {
    console.log("分类点击 ====   ", e)
    var isSure = e.detail.isSure
    var data = e.detail.data
    var id = data.id
    var name = data.name
    if (isSure) {
      if (id) {
        this.setData({
          category_id: id,
          "activityInfo.category_id": id,
          categoryName: name,
        })
      } else {
        this.setData({
          category_id: '',
          "activityInfo.category_id": '',
          categoryName: '未选择',
        })
      }
    }
  },

  getCategoryList: function () {
    var that = this;
    that.setData({
      showCategory: true,
    })
  },

  /**
   * F码选择事件
   */
  bindFCodeClose: function (e) {
    console.log("F码点击 ====   ", e)
    var isSure = e.detail.isSure
    var data = e.detail.data
    var id = data.id
    var name = data.name
    if (isSure) {
      if (id) {
        this.setData({
          view_mode: 6,
          "activityInfo.view_mode": 6,
          "activityInfo.fcode_id": id,
        })
      } else {
        this.setData({
          view_mode: 1,
          "activityInfo.view_mode": 1,
        })
      }
    }
  },

  getFCodeList: function () {
    var that = this;
    that.setData({
      showFCode: true,
    })
  },

  /**
   * 白名单选择事件
   */
  bindWhitelistClose: function (e) {
    console.log("F码点击 ====   ", e)
    var isSure = e.detail.isSure
    var data = e.detail.data
    var id = data.id
    var name = data.name
    if (isSure) {
      if (id) {
        this.setData({
          view_mode: 5,
          "activityInfo.view_mode": 5,
          "activityInfo.white_id": id,

        })
      } else {
        this.setData({
          view_mode: 1,
          "activityInfo.view_mode": 1,
        })
      }
    }
  },
  getWhiteList: function () {
    var that = this;
    that.setData({
      showWhiteList: true,
    })
  },

  /**
   * 免费点击事件
   */
  freeClick() {
    this.setData({
      view_mode: 1,
      "activityInfo.view_mode": 1,
    })
  },

  beautfyClick(e) {
    console.log(e.currentTarget.dataset.beautfy)
    var value = e.currentTarget.dataset.beautfy
    this.setData({
      beauty_level: value
    })
  },

  /**
   * 条件选择点击事件
   * @param {从上到下 1-5} e 
   */
  checkClick(e) {
    var index = e.currentTarget.dataset.check
    var isCheck
    switch (index) {
      case '1':
        isCheck = !this.data.check.beauty
        this.setData({
          "check.beauty": isCheck
        })
        break;
      case '2':
        isCheck = !this.data.check.back_camera
        this.setData({
          "check.back_camera": isCheck
        })
        break;
      case '3':
        isCheck = !this.data.check.mute
        this.setData({
          "check.mute": isCheck
        })
        break;
      case '4':
        isCheck = !this.data.check.all_ban_chat
        this.setData({
          "check.all_ban_chat": isCheck
        })
        break;
      case '5':
        isCheck = !this.data.check.isPlayBack
        var auto_record = isCheck ? 1 : 0
        this.setData({
          "check.isPlayBack": isCheck,
          "activityInfo.auto_record": auto_record
        })
        break;
    }
  },

  uniqueIdInput(e) {
    this.setData({
      'currentUser.uniqueId': e.detail.value,
    })
  },

  liveTkInput(e) {
    this.setData({
      live_tk: e.detail.value,
    })
  },

  ticketIdInput(e) {
    this.setData({
      ticket_id: e.detail.value,
    })
  },

  pushClick(e) {
    var type = e.currentTarget.dataset.type
    if (type == 'p') {
      this.setData({
        "activityInfo.live_style": '1',
        "activityInfo.live_type": '0'
      })
    } else if (type == 'l') {
      this.setData({
        "activityInfo.live_style": '0',
        "activityInfo.live_type": '0'
      })
    } else if (type == 'audio') {
      this.setData({
        "activityInfo.live_style": '1',
        "activityInfo.live_type": '1'
      })
    }
    console.log(this.data.currentUser.uniqueId)
    if (this.data.currentUser.uniqueId == '') {
      wx.showToast({
        title: 'uniqueId不能为空', //提示的内容,
        icon: 'error', //图标,
        duration: 2000, //延迟时间,
        mask: true, //显示透明蒙层，防止触摸穿透,
        success: res => {}
      });
      return
    }
    app.globalData.userInfo.uniqueId = this.data.currentUser.uniqueId;
    var user = {
      uniqueId: app.globalData.userInfo.uniqueId,
      name: app.globalData.userInfo.nickName,
      avatar: app.globalData.userInfo.avatarUrl,
    }
    var that = this
    mzplugin.mzSDK.initUser(user).then(function (res) {
      mzplugin.mzSDK.createNewLive(that.data.activityInfo).then(function (res) {
        console.log(res)
        that.setData({
          live_tk: res.live_tk,
          ticket_id: res.ticket_id
        })
        that.startPush();
      }, function (err) {
        console.log(err);
      })
    }, function (err) {
      console.log(err);
    })
  },

  //开始推流
  startPush() {
    var that = this
    this.setData({
      "startPush.live_tk": that.data.live_tk,
      "startPush.ticketId": that.data.ticket_id,
      "startPush.uniqueId": that.data.currentUser.uniqueId,
      "startPush.name": that.data.currentUser.nickName,
      "startPush.avatar": that.data.currentUser.avatarUrl,
    })
    mzplugin.mzSDK.startLive(this.data.startPush).then(function (res) {
      console.log(res)
      var url = encodeURIComponent(res.push_url)
      if (that.data.activityInfo.live_style == 1) {
        wx.navigateTo({
          url: `/pages/live/livepusher/livepusher?live_style=${that.data.activityInfo.live_style}&live_type=${that.data.activityInfo.live_type}&channelId=${that.data.activityInfo.channelId}&beautfy_level=${that.data.beauty_level}&beautfy=${that.data.check.beauty}&back_camera=${that.data.check.back_camera}&mute=${that.data.check.mute}&all_ban_chat=${that.data.check.all_ban_chat}&isPlayBack=${that.data.check.isPlayBack}&ticket_id=${that.data.ticket_id}&chatUid=${res.webinar_id}&pushUrl=${url}`,

        })
      } else {
        wx.navigateTo({
          url: `/pages/live/landpush/livepusher?live_style=${that.data.activityInfo.live_style}&live_type=${that.data.activityInfo.live_type}&channelId=${that.data.activityInfo.channelId}&beautfy_level=${that.data.beauty_level}&beautfy=${that.data.check.beauty}&back_camera=${that.data.check.back_camera}&mute=${that.data.check.mute}&all_ban_chat=${that.data.check.all_ban_chat}&isPlayBack=${that.data.check.isPlayBack}&ticket_id=${that.data.ticket_id}&chatUid=${res.webinar_id}&pushUrl=${url}`,

        })
      }


    }, function (err) {
      console.log(err);
    })
  },
})