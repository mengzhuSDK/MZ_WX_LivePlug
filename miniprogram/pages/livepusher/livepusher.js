const {
  op
} = require("../image/voice_live_am");

import lottie from 'lottie-miniprogram'

var mzplugin = require('../../utils/mzSDK')
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
    ticket_id: '',
    channelId: '',
    chatUid: '',
    beautfy_level: '', //清晰度级别
    src: "",
    //横屏还是竖屏 0 = 横屏， 1 = 竖屏
    live_style: 1,
    //0是视频，1是音频
    live_type: 0,
    //视频起始top
    playerViewTop: '138rpx',
    defaultInfo: {

    },

    anchorInfo: {
      anchorPic: '',
      anchorName: '',
      anchorPopularityNum: '0'
    },

    //页面文本信息（便于修改）
    defaultText: {
      placeholderText: "聊点什么?",
      anchorPopularity: "人气"
    },

    showQuitModelState: false,
    quitPageState: '',
    quitModelState: '',
    classNameKeyboardUp: "user-addcomment",
    inputHeight: "3.2vw",
    inputShow: false,
    iconList: [],

    userOnlineName: "",
    userOnlineAnimation: "",
    userOnlineDefaule: {
      left: "-29.33vw",
      opacity: "0"
    },
    timerUserOnline: null,
    commentList: [],
    scrollY: true,
    scrollTop: 0,

    // 当前登录用户
    currentUser: {
      uniqueId: '',
      nickName: '',
      avatarUrl: 'https://s1.zmengzhu.com/user/images/user-default-image.png'
    },

    //底部设置按钮
    settingCheck: {
      setting: false,
      beautyClick: false,
      beauty: 0,
      whiteness: 0,
      image: false,
      flash: false,
      mute: false,
      chat: false,
      defClick: false,
      def: 'SD',
      defImage: '../../images/vx_setting_def1.png',
    },

    bitrate: '0',
    push_time: parseInt(0),
    push_time_format: '',

    pushTimeNumber: 0,

    pushCtx: '',

    // 语音动画是否展示
    auaniIsHidden: false,
    menuButton: wx.getMenuButtonBoundingClientRect(),
  },


  ComponentsQuitPageTap: function (e) {
    wx.showModal({
      title: '提示',
      content: '是否关闭推流直播间',
      success(res) {
        if (res.confirm) {
          wx.navigateBack({
            delta: 1 //返回的页面数，如果 delta 大于现有页面数，则返回到首页,
          });
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //文本框获取焦点-处理键盘高度
  userAddCommentfocus: function (e) {
    console.log("点击了文本框")
    var _this = this;
    var height = e.detail.height
    _this.setData({
      inputHeight: height + "px",
      classNameKeyboardUp: "user-addcomment-up"
    });
  },

  //文本框失去焦点-处理键盘高度
  userAddCommentblur: function (e) {
    var _this = this;
    _this.setData({
      inputHeight: '3.2vw',
      classNameKeyboardUp: "user-addcomment",
      inputShow: false
    });
  },

  //点击完成按钮时触发
  userAddComment: function (e) {
    var _this = this
    var data = e.detail.value;
    var commentList_temp = [].concat(_this.data.commentList)
    console.log("唯一标识符和昵称都不能为空");
    console.log("唯一标识符：", _this.data.currentUser.uniqueId + "      昵称：", _this.data.currentUser.nickName)
    commentList_temp.push({
      text: {
        user_name: _this.data.currentUser.nickName,
        avatar: _this.data.currentUser.avatarUrl,
        data: {
          text: data
        }
      }
    })

    _this.setData({
      test: "",
      inputShow: false,
      commentList: commentList_temp,
      scrollTop: _this.data.commentList.length * 1000,
    });
    mzplugin.mzSDK.push(data);
  },

  activeInput: function () {
    this.setData({
      inputShow: true
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getParams(options);

    // 从全局复制出来用户信息
    var _this = this
    if (app.globalData.userInfo) {
      _this.setData({
        'currentUser.uniqueId': app.globalData.userInfo.uniqueId,
        'currentUser.nickName': app.globalData.userInfo.nickName,
        'currentUser.avatarUrl': app.globalData.userInfo.avatarUrl || "https://s1.zmengzhu.com/user/images/user-default-image.png",
        'anchorInfo.anchorName': app.globalData.userInfo.nickName,
        'anchorInfo.anchorPic': app.globalData.userInfo.avatarUrl || "https://s1.zmengzhu.com/user/images/user-default-image.png",
      })
    }
    // 处理语音播放动画
    if (_this.data.live_type == 1) {
      _this.showAudioAnimation();
    }
    mzplugin.mzSDK.connect();
    //挂载事件
    mzplugin.mzSDK.mzee.on("msg", this.getMsg);
    mzplugin.mzSDK.mzee.on("online", this.getOnline);
    mzplugin.mzSDK.mzee.on("offline", this.getOffline);

  },

  getParams(options) {
    console.log(options)
    var url = decodeURIComponent(options.pushUrl)
    this.setData({
      src: url,
      live_type: options.live_type,
      live_style: options.live_style,
      beautfy_level: options.beautfy_level,
      "check.beauty": JSON.parse(options.beautfy),
      "check.back_camera":  JSON.parse(options.back_camera),
      "check.mute": JSON.parse(options.mute),
      "check.all_ban_chat": JSON.parse(options.all_ban_chat),
      "check.isPlayBack":  JSON.parse(options.isPlayBack),
      ticket_id: options.ticket_id,
      chatUid: options.chatUid,
      channelId: options.channelId,
    } ,() => {
      var def = '';
      var defImage = '../../images/vx_setting_def1.png'
      if (this.data.beautfy_level == 1) {
        def = "SD"
        defImage = '../../images/vx_setting_def1.png'
      } else if (this.data.beautfy_level == 2) {
        def = "HD"
        defImage = '../../images/vx_setting_def2.png'
      } else if (this.data.beautfy_level == 3) {
        def = "FHD"
        defImage = '../../images/vx_setting_def3.png'
      }
      var beauty = this.data.check.beauty ? '2' : '0';
      var mute = this.data.check.mute;
      var chat = this.data.check.all_ban_chat;
      console.log(this.data.check.beauty)
      console.log(options.beautfy)
      this.setData({
        "settingCheck.def": def,
        "settingCheck.beauty": beauty,
        "settingCheck.whiteness": beauty,
        "settingCheck.defImage": defImage,
        "settingCheck.mute": mute,
        "settingCheck.chat": chat,
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.pushCtx = wx.createLivePusherContext(this)
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
  onUnload: function () {
    //卸载事件
    mzplugin.mzSDK.disconnect();
    mzplugin.mzSDK.mzee.removeListener("msg", this.getMsg);
    mzplugin.mzSDK.mzee.removeListener("online", this.getOnline);
    mzplugin.mzSDK.mzee.removeListener("offline", this.getOffline);

    this.endSetInter()
    this.pushCtx.stop()

    var that = this;
    var data = {
      channelId: that.data.channelId,
      ticketId: that.data.ticket_id,
    }
    mzplugin.mzSDK.stopLive(data).then(function (res) {
      console.log(res)

    }, function (err) {
      console.log(err);
    })
  },

  //启动语音播放动画
  showAudioAnimation: function () {
    wx.createSelectorQuery().select('#canvas').node(res => {
      const canvas = res.node
      const context = canvas.getContext('2d')
      lottie.setup(canvas)

      this.auani = lottie.loadAnimation({
        loop: true,
        autoplay: true,
        animationData: require('../image/voice_live_am'),
        rendererSettings: {
          context,
        },
      })
    }).exec()
  },

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
   * 全体禁言
   */
  allBanChat(isChangeData) {
    var that = this;
    var isAllChat = this.data.check.all_ban_chat ? "0" : "1";
    var data = {
      channelId: that.data.channelId,
      ticketId: that.data.ticket_id,
      isChat: isAllChat,
    }
    console.log(data)
    mzplugin.mzSDK.blockTicket(data).then(function (res) {
      console.log("success" + res.msg)
      if(!isChangeData){
        return;
      }
      that.setData({
        "check.all_ban_chat": that.data.check.all_ban_chat,
        "settingCheck.chat": that.data.check.all_ban_chat,
      } , () =>{
        console.log(that.data.check.all_ban_chat)
      })

    }, function (err) {
      console.log("fail" + err);
    })
  },

  getMsg: function (res) {
    var _this = this;
    console.log(res)
    console.log(res.user_id)
    if (_this.data.chatUid == res.user_id) {
      return;
    } else {
      _this.setData({
        commentList: _this.data.commentList.concat([{
          text: {
            avatar: res.avatar,
            user_name: res.user_name,
            data: {
              text: res.data.text
            }
          }
        }])
      }, () => {
        _this.setData({
          scrollTop: _this.data.commentList.length * 1000,
        })

      })
    }
  },


  //用户上线
  getOnline: function (res) {
    console.log('用户上线', res, arr);
    var _this = this;
    var arr = _this.data.iconList;

    //用户上线提示
    _this.setData({
      "anchorInfo.anchorPopularityNum": res.data.last_pv,
      userOnlineName: res.user_name
    }, () => {
      _this.createUserOnlineAnimation()
    })


    if (!res.avatar) {
      return;
    }

    if (res.user_id > 5000000000) {
      return;
    }

    arr.push(res.avatar);
    _this.unique(arr);
    if (arr.length > 3) {
      arr.shift();
    }
    _this.setData({
      iconList: [].concat(arr)
    })

  },

  //用户下线
  getOffline: function (res) {
    console.log("用户下线")
  },

  unique: function (arr) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        if (arr[i] == arr[j]) { //第一个等同于第二个，splice方法删除第二个
          arr.splice(j, 1);
          j--;
        }
      }
    }
    return arr;
  },

  // 创建用户上线提示动画
  createUserOnlineAnimation: function () {
    var _this = this;
    clearTimeout(_this.data.timerUserOnline)
    _this.setData({
      "userOnlineDefaule.left": "-29.33vw",
      "userOnlineDefaule.opacity": "0",
      userOnlineAnimation: ""
    }, () => {
      var UserAnimation = wx.createAnimation({
        duration: 300,
        timingFunction: "linear",
        delay: 0,
        transformOrigin: "50% 50% 0",
      });
      UserAnimation.left("3.2vw").opacity(1).step();


      _this.setData({
        userOnlineAnimation: UserAnimation.export(),
        timerUserOnline: setTimeout(function () {
          UserAnimation.left("-29.33vw").opacity(0).step();
          _this.setData({
            userOnlineAnimation: UserAnimation.export(),
          })
        }, 2600)
      })
    })
  },

  //底部按钮点击事件
  settingClick(e) {
    var type = e.currentTarget.dataset.type
    console.log(type)
    if (type == "setting") {
      var ischeck = !this.data.settingCheck.setting
      this.setData({
        "settingCheck.setting": ischeck,
      })
    }
    if (type == "camera") {
      var ischeck = !this.data.check.back_camera
      this.setData({
        "check.back_camera": ischeck,
      })
      this.pushCtx.switchCamera()
    }
    if (type == "beauty") {
      var beautyClick = !this.data.settingCheck.beautyClick
      this.setData({
        "settingCheck.beautyClick": beautyClick,
      })
    }
    if (type == "image") {
      var image = !this.data.settingCheck.image
      this.setData({
        "settingCheck.image": image,
      } ,() =>{
        this.pushReset()
      })
    }
    if (type == "flash") {
      var flash = !this.data.settingCheck.flash
      var that = this
      this.setData({
        "settingCheck.flash": flash,
      }, () => {
        setTimeout(function(){
          that.pushCtx.toggleTorch()
        } , 100)
      })
    }
    if (type == "mute") {
      var mute = !this.data.settingCheck.mute
      this.setData({
        "settingCheck.mute": mute,
      } ,() =>{
        this.pushReset()
      })
    }
    if (type == "chat") {
      this.data.check.all_ban_chat = !this.data.check.all_ban_chat
      this.allBanChat(true);
    }
    if (type == "def") {
      var defClick = !this.data.settingCheck.defClick
      this.setData({
        "settingCheck.defClick": defClick,
      })
    }
    if (type == "SD") {
      this.setData({
        "settingCheck.def": type,
        "settingCheck.defImage": '../../images/vx_setting_def1.png',
        "settingCheck.defClick": false,
      } ,() =>{
        this.pushReset()
      })
    }

    if (type == "HD") {
      this.setData({
        "settingCheck.def": type,
        "settingCheck.defImage": '../../images/vx_setting_def2.png',
        "settingCheck.defClick": false,
      } ,() =>{
        this.pushReset()
      })
    }

    if (type == "FHD") {
      this.setData({
        "settingCheck.def": type,
        "settingCheck.defImage": '../../images/vx_setting_def3.png',
        "settingCheck.defClick": false,
      } ,() =>{
        this.pushReset()
      })
    }

    if (type == "0" || type == "2" || type == "4" || type == "6" || type == "9") {
      this.setData({
        "settingCheck.beauty": type,
        "settingCheck.whiteness": type,
        "settingCheck.beautyClick": false,
      } ,() =>{
        this.pushReset()
      })
    }
  },

  /**
   * 重新初始化pusher控件
   */
  pushReset(){
    this.pushCtx.stop()
    this.pushCtx.start()
  },

  startSetInter: function () {
    var that = this;
    //将计时器赋值给setInter
    var pushNumber = ''
    pushNumber = setInterval(
      function () {
        var data = parseInt(parseInt(that.data.push_time) + parseInt(1))
        var format = that.formateSeconds(data)
        that.setData({
          push_time: data,
          push_time_format: format,
          pushTimeNumber: pushNumber,
        })
      }, 1000)
  },

  //微信小程序在页面卸载的时候删除定时器
  endSetInter: function () {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.pushTimeNumber)
  },

  formateSeconds: function (endTime) {
    let secondTime = parseInt(endTime)
    let min = 0
    let h = 0
    let result = ''
    if (secondTime > 60) {
      min = parseInt(secondTime / 60)
      secondTime = parseInt(secondTime % 60)
      if (min > 60) {
        h = parseInt(min / 60)
        min = parseInt(min % 60)
      }
    }
    result =
      `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secondTime.toString().padStart(2, '0')}`
    return result
  },

  pushStatechange(e) {
    console.log('live-pusher code:', e.detail.code)
    if (e.detail.code == 1002) {
      var that = this
      if (this.data.check.all_ban_chat) {
        setTimeout(function(){
          that.allBanChat(false)
        } , 1000)
      }
      if (this.data.pushTimeNumber == 0) {
        this.startSetInter()
      }
    }
  },

  pushNetStatus(e) {
    var value = ''
    if (this.data.live_type == 1) {
      value = e.detail.info.audioBitrate
    } else {
      value = e.detail.info.videoBitrate
    }
    if(value){
      this.setData({
        bitrate: value,
      })
    }
  },
});