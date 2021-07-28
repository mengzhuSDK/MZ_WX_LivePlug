// components/horizontalMenu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    menuTitles: {
      type: Array,
      value: ['互动','文档','问答']
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    color_normal: '#7A7A7A',
    color_select: '#FF1F60',
    showIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    menuTitleClick: function (e) {
      this.setData({
        showIndex: e.currentTarget.dataset.index
      })
      this.triggerEvent('showIndex', {index: e.currentTarget.dataset.index})
    }
  }
})