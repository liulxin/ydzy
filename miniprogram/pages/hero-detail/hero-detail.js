// miniprogram/pages/hero-detail/hero-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    heroInfo: null
  },

  // 数据请求
  fetchData() {
    wx.showLoading({
      title: 'loading',
    })
    const _this = this
    wx.cloud.callFunction({
      name: 'herodetail',
      data: {
        id: _this.data.id
      },
      complete(res) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        _this.setData({
          heroInfo: Object.assign({}, res.result.list[0], {
            equipment: res.result.list[0].equipment.split(',')
          })
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    this.fetchData()
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
    this.setData({
      heroInfo: null
    }, this.fetchData())
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