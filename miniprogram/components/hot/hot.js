// components/hot/hot.js
Component({
  /**
   * 组件的属性列表
   */
  // behaviors: [computedBehavior],
  properties: {
    hotClass: {
      type: String,
      observer: function(newV,oldV) {
        this.setData({
          hot: Array(Number(newV.slice(-1))).fill('2')
        })
      }
    }
  },
  // computed: {

  // },

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
