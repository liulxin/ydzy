// miniprogram/pages/hero/hero.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: false, // false: list true: block
    heroList: []
  },

  changeMode: function (e) {
    let mode = !this.data.mode
    this.setData({
      mode
    })
  },

  // 监听自定义组件 search-com 触发的search事件
  searchHandler(e) {
    console.log(e.detail)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    wx.cloud.callFunction({
      name: 'heros',
      success(res) {
        let list = res.result.list.data.map(hero => {
          return Object.assign({}, hero, {
            headPic: `cloud://ydzy-yun-3c5429.7964-ydzy-yun-3c5429-1300746035/cham-icons/${hero.heroId}.png`,
            bgPic: `cloud://ydzy-yun-3c5429.7964-ydzy-yun-3c5429-1300746035/cham-icons/${hero.heroId}.jpg`
          })
        })
        _this.setData({
          heroList: list
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})