// component/goodsInfoPopup/goodsInfoPopup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    'chooseSize': {
      type: Boolean,
      value: false
    },
    'defaultText':{
      type: Object,
      value: false
    },
    'defaultInfo':{
      type: Object,
      value: false
    },
    'goodsListDataReverse':{
      type: Object,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    chooseSize: false,
    animationData: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onReady: function(){
      console.log("触发了弹窗")
    },
    closeShopping: function(){
      this.setData({
        chooseSize: false
      })
    },
    closeShoppingPic: function(){
      this.setData({
        chooseSize: false
      })
    },
    toBuyGoods: function(e){
      console.log("商品购买连接是：" + e.currentTarget.dataset.url)
    }
  }
})
