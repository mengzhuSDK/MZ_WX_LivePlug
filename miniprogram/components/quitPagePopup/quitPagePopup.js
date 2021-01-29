// component/quitPagePopup/quitPagePopup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    'showQuitModelState': {
      type: Boolean,
      value: false
    },
    'defaultInfo': {
      type: Object,
      value: {}
    },
    'defaultText': {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showQuitModelState: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    backHome: function() {
      console.log("返回上一层");
      wx.navigateBack({
        delta: 2,
      })
    },
    _closeQuitModel: function() {
      this.setData({
        showQuitModelState: false
      })
      // this.triggerEvent('tap', { quitModelState: false });
      this.triggerEvent('closeQuitModel', { quitModelState: false });
    },
  }
})
