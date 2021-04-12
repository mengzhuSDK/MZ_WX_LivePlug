var mzplugin = require('../../utils/mzSDK')
var mzSDK=mzplugin.mzSDK;
// component/settingInfo/settingInfo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    'count': {
      type: Number,
      value: 0
    },
    'settingPopupState': {
      type: Boolean,
      value: false
    },
    'hiddenSelf': {
      type: Boolean,
      value: false
    },
    'pageInfo': {
      type: Object,
      value: {}
    },
    'defaultInfo': {
      type: Object,
      value: {}
    },
    'chatUid': {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    settingPopupState: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    likeShowHeart: function() {
      var _this = this;
      var random = Math.random() > 0.5 ? 3 : 4;
      for (var i = 0; i < random; i++) {
        _this.setData({
          count: _this.data.count + 1
        });
      }
      var data = {
        ticketId: _this.properties.pageInfo.ticketId,
        channelId: _this.properties.defaultInfo.channelId,
        praises: 1,
        chatUid: _this.properties.chatUid,
      }
      console.log("点击了小心心");
      mzSDK.getPraise(data)
  
    },
    shareInfo: function(){
      console.log('点击了分享')
    },
    openSettingPopup: function(){
      this.setData({
        settingPopupState: true
      })
    },
    closeSettingPopup: function(){
      this.setData({
        settingPopupState: false
      })
    },
    reportInfo: function(){
      console.log("点击了举报");
    }
  }
})
