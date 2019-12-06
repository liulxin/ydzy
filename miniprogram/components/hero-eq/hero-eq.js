// components/hero-eq/hero-eq.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      observer(newV, oldV) {
        console.log(newV)
        this.setData({
          heroList: newV.filter(item => item.equipment_id)
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
