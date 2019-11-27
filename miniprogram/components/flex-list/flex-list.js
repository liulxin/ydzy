// components/flex-list/flex-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
    active: {
      type: Number,
      value: 0,
      observer: function(newVal, oldVal) {
        console.log(newVal)
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
    itemClick(e) {
      this.triggerEvent('click', e.target.dataset.key)
    }
  }
})
