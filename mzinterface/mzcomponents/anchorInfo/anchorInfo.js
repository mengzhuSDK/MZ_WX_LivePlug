// component/anchorInfo/anchorInfo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    'followText': {
      type: Object,
      value: {}
    },
    'menuButton': {
      type: Object,
      value: {}
    },
    'anchorInfo': {
      type: Object,
      value: {}
    },
    'defaultText': {
      type: Object,
      value: {}
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    followAnchor: function() {
      console.log("关注主播")
    },
  }
})
