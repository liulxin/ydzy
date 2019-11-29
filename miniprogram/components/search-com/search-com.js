// components/search-com/search-com.js
Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['search-class'],
  properties: {
    
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
    inputHandler(e) {
      this.triggerEvent('search',e.detail.value)
    }
  }
})
