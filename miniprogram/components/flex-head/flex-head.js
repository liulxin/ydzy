// components/flex-head/flex-head.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    str: {
      type: String,
      observer: function(newV, oldV) {
        this.setData({
          list: newV.split(',')
        })
      }
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

  }
})