// miniprogram/pages/team-detail/team-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    teamInfo: null,
    goodslist: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    this.getGoodslist()
    this.getData()
  },

  getData() {
    let list = wx.getStorageSync('teamList')
    let {
      id,
      goodsList
    } = this.data
    list = list.filter(item => item._id === id)[0];
    // 核心装备 - 对应的组成装备
    let line_hero_1 = list.line_hero_1.filter(item => item.equipment_id)
    line_hero_1 = line_hero_1.map(item => {
      return Object.assign({}, item, {
        equipment_id: item.equipment_id.map(id => {
          return {
            eqId: id,
            compose: goodsList.find(goods => id === goods.equipmentId).eq_formula
          }
        })
      })
    })
    this.setData({
      teamInfo: Object.assign({}, list, {
        line_hero_1
      })
    }, () => {
      wx.setNavigationBarTitle({
        title: '阵容详情'
      })
    })
  },

  getGoodslist() {
    let goodslist = wx.getStorageSync('goodsList')
    if (!goodslist) {
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
            goodsList: list
          })
        }
      })
    } else {
      this.setData({
        goodsList: goodslist
      })
    }
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
    return {
      title: '仿掌上英雄联盟-云顶之奕',
      path: '/pages/hero/hero',
      imageUrl: '/images/share.jpg'
    }
  }
})