// miniprogram/pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    showList: [],
    baseList: [],
    activeIndex: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.fetchData()
  },

  // 请求数据
  fetchData() {
    const _this = this
    wx.showLoading({
      title: 'loading',
    })
    wx.cloud.callFunction({
      name: 'goods',
      complete(res) {
        wx.hideLoading()
        let data = res.result.data
        let list = data.map(item => Object.assign({}, item, {
          eq_formula: item.eq_formula.split(',')
        }))
        wx.setStorageSync('goodsList', list)
        _this.setData({
          activeIndex: -1,
          list: list,
          showList: list,
          baseList: data.filter(item => !item.eq_formula)
        })
        // 暂停下拉刷新
        wx.stopPullDownRefresh()
      }
    })
  },

  // 选择基础装备 装备列表显示数据改变
  baseChange(e) {
    let index = e.currentTarget.dataset.index
    let id = this.data.baseList[index].equipmentId
    let list = this.data.list.filter(item => item.eq_formula.indexOf(id) !== -1)
    this.setData({
      activeIndex: index,
      showList: list
    })
  },

  searchHandler(e) {
    let {
      list
    } = this.data
    if (e.detail === '') {
      this.setData({
        activeIndex: -1,
        showList: list
      })
      return
    }
    let list_ = list.filter(item => item.eq_name.indexOf(e.detail) > -1)
    this.setData({
      activeIndex: -1,
      showList: list_
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.fetchData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})