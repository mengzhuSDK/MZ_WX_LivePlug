// component/backToHome/backToHome.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    'menuButton': {
      type: Object,
      value: {}
    }
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
    showQuitModel: function() {
      console.log("Quit");
      this.triggerEvent('tap', { quitPageState: true });
    },
  }
})
