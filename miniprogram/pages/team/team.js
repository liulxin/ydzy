// miniprogram/pages/team/team.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    nowSkip: 0,
    isOver: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.fetchData(0)
  },

  fetchData(skip) {
    let _this = this
    wx.showLoading({
      title: 'loading...'
    })
    wx.cloud.callFunction({
      name: 'teams',
      data: {
        skip
      },
      complete(res) {
        let {
          list
        } = _this.data
        wx.hideLoading()
        wx.stopPullDownRefresh()
        if (res.result.data.length) {
          _this.setData({
            list: list.concat(res.result.data)
          })
          if (res.result.data.length < 15) {
            _this.setData({
              isOver: true
            })
          }
        } else {
          _this.setData({
            isOver: true
          })
        }

      }
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
    this.setData({
      list: [],
      nowSkip: 0,
      isOver: false
    }, this.fetchData(0))
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let {
      nowSkip,
      isOver
    } = this.data
    if (isOver) {
      wx.showToast({
        title: '已经到底啦~'
      })
      return
    }
    this.fetchData(nowSkip + 1)
    this.setData({
      nowSkip: nowSkip + 1
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})