// component/goodsInfo/goodsInfo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    'goodsListDataReverse': {
      type: Object,
      value: {}
    },
    'goodsItemPush': {
      type: Object,
      value: {}
    },
    'defaultInfo': {
      type: Object,
      value: {}
    },
    'loopAnimationStart': {
      type: Object,
      value: {}
    },
    'hiddenIcon': {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    loopAnimationStart: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    showPopup: function() {
      this.triggerEvent('ShowPopup', { chooseSize: true });
    },
    toBuyGoods: function(e) {
      console.log("商品购买连接是：" + e.currentTarget.dataset.url);
      },
  },
})
