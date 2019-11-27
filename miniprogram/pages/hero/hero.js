// miniprogram/pages/hero/hero.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode: false, // false: list true: block
    heroList: [],
    showHeroList: [], // 作展示使用
    sort: '',
    raceList: [{
      label: '全部',
      value: 0
    },
    {
      label: '水晶',
      value: 15
    },
    {
      label: '沙漠',
      value: 16
    },
    {
      label: '雷霆',
      value: 17
    },
    {
      label: '极地',
      value: 18
    },
    {
      label: '地狱火',
      value: 19
    },
    {
      label: '光',
      value: 20
    },
    {
      label: '钢铁',
      value: 21
    },
    {
      label: '山脉',
      value: 22
    },
    {
      label: '海洋',
      value: 23
    },
    {
      label: '剧毒',
      value: 24
    },
    {
      label: '影',
      value: 25
    },
    {
      label: '云霄',
      value: 26
    },
    {
      label: '森林',
      value: 27
    }
    ],
    jobList: [{
      label: '全部',
      value: 0
    },
    {
      label: '炼金师',
      value: 11
    },
    {
      label: '刺客',
      value: 12
    },
    {
      label: '大元素使',
      value: 13
    },
    {
      label: '狂战士',
      value: 14
    },
    {
      label: '召唤使',
      value: 15
    },
    {
      label: '德鲁伊',
      value: 16
    },
    {
      label: '魔法师',
      value: 17
    },
    {
      label: '秘术',
      value: 18
    },
    {
      label: '掠食者',
      value: 19
    },
    {
      label: '游侠',
      value: 20
    },
    {
      label: '守护',
      value: 21
    },
    {
      label: '剑士',
      value: 22
    }
    ],
    priceList: [{
      label: '全部',
      value: 0
    },
    {
      label: '1',
      value: 1
    },
    {
      label: '2',
      value: 2
    },
    {
      label: '3',
      value: 3
    },
    {
      label: '4',
      value: 4
    },
    {
      label: '5',
      value: 5
    },
    {
      label: '6',
      value: 6
    },
    {
      label: '7',
      value: 7
    }
    ],
    filterValue: 0, // 0 全部
    filterType: '', //'' 全部 race 种族 job 职业 price 消耗
    filterType_: '', // 保存的点击态
    filterShow: -1 // -1 隐藏 0 种族 1 职业 2 消耗
  },

  changeMode: function (e) {
    let mode = !this.data.mode
    this.setData({
      mode
    })
  },

  // 监听自定义组件 search-com 触发的search事件
  searchHandler(e) {
    let { heroList } = this.data
    console.log(e.detail)
    if (e.detail === '') {
      this.setData({
        sort: '',
        showHeroList: heroList
      })
      return
    }
    let list = heroList.filter(hero => {
      return hero.hero_name.indexOf(e.detail) > -1 || hero.hero_tittle.indexOf(e.detail) > -1 || hero.price == e.detail || hero.job_.some(job => job.job_name == e.detail) || hero.race_.some(race => race.race_name == e.detail)
    })
    this.setData({
      sort: '',
      showHeroList: list
    })
  },

  // 根据price 排序英雄 asc 升序 desc 降序
  // 进行排序时 应该重置 scroll-view 的滚动位置
  sortHeroByPrice(e) {
    let {
      sort,
      showHeroList
    } = this.data

    sort = sort !== '' ? (sort === 'asc' ? 'desc' : 'asc') : 'asc'

    if (sort === 'asc') {
      showHeroList.sort((a, b) => {
        return (a.price - b.price)
      })
    } else {
      showHeroList.sort((a, b) => {
        return (b.price - a.price)
      })
    }

    this.setData({
      sort,
      showHeroList
    })
    // 重置位置
    this.scrollToTop()
  },

  // 回至顶部
  scrollToTop() {
    this.setData({
      scrollTop: 0
    })
  },

  // 获取筛选，筛选数据，点击时保存点击态
  getClick(e) {
    let {
      heroList,
      filterType,
      sort
    } = this.data
    let detail = e.detail
    let list = []
    sort = sort !== '' ? (sort === 'asc' ? 'asc' : 'desc') : 'asc'
    // 全部
    if (detail === 0) {
      list = heroList
    } else {
      list = heroList.filter(hero => {
        return hero[filterType] == detail
      })
    }

    if (sort === 'asc') {
      list.sort((a, b) => {
        return (a.price - b.price)
      })
    } else {
      list.sort((a, b) => {
        return (b.price - a.price)
      })
    }

    this.setData({
      filterValue: detail,
      filterType_: filterType,
      showHeroList: list
    })
    // 重置位置
    this.scrollToTop()
  },
  // 切换筛选显示区域
  changefilterShow(e) {
    this.setData({
      filterShow: e.currentTarget.dataset.type,
      filterType: e.currentTarget.dataset.key
    })
  },
  // 点击其他地方隐藏过滤区域
  removeFilter(e) {
    if (e.target.id !== 'fl' && this.data.filterShow !== -1) {
      setTimeout(() => {
        this.setData({
          filterShow: -1
        })
      }, 100)
    }
  },

  // 获取数据
  fetchData() {
    const _this = this
    wx.cloud.callFunction({
      name: 'heros',
      complete(res) {
        let list = res.result.list.map(hero => {
          return Object.assign({}, hero, {
            headPic: `cloud://ydzy-yun-3c5429.7964-ydzy-yun-3c5429-1300746035/cham-icons/${hero.heroId}.png`,
            bgPic: `cloud://ydzy-yun-3c5429.7964-ydzy-yun-3c5429-1300746035/cham-icons/${hero.heroId}.jpg`
          })
        })
        _this.setData({
          heroList: list,
          showHeroList: list
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData()
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