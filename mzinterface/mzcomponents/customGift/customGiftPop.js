var mzplugin = require('../../utils/mzSDK');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ticketId: {
      type: String
    },

    isShow: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    //按8个一组切割的数据数组
    splitDataList: [],

    current: 0,
    selectIndex: -1,
    selectIndex2: -1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //请求礼物列表
    loadGiftData() {
      var that = this
      mzplugin.mzSDK.getGiftList(this.data.ticketId, 0, 50).then(function (data) {
        console.log('礼物列表====>', data)
        var array = data
        var result = [];
        for (var i = 0; i < array.length; i += 8) {
          result.push(array.slice(i, i + 8));
        }
        that.setData({
          splitDataList: result
        })
      }, function (err) {

      })
    },

    //切换事件
    swiperChange(event) {
      this.setData({
        current: event.detail.current
      })
    },

    //礼物选中事件
    giftItemClick(e) {
      var index = e.currentTarget.dataset.index1
      var index2 = e.currentTarget.dataset.index2
      if (this.data.selectIndex == index && this.data.selectIndex2 == index2) {
        index = -1
        index2 = -1
      }
      this.setData({
        selectIndex: index,
        selectIndex2: index2
      })
    },

    //赠送点击事件
    sendClick() {
      var that = this
      if (this.data.selectIndex != -1 && this.data.selectIndex2 != -1) {
        var giftId = this.data.splitDataList[this.data.selectIndex][this.data.selectIndex2].id
        mzplugin.mzSDK.pushGift(this.data.ticketId, giftId, 1).then(function (res) {
          console.log('发送礼物回调 ==== >', res)
          that.setData({
            isShow: false
          })
        }, function (err) {

        })
      }
    },

    emptyClick() {
      this.setData({
        isShow: false
      })
    }
  }
})