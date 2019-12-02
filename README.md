# 仿掌上英雄联盟云顶之弈 - 微信小程序版

包含英雄、英雄详情、装备、阵容 4 个页面

## 功能
1. 英雄列表切换、排序、筛选、搜索、详情跳转
2. 英雄详情、跳转
3. 装备列表、搜索、筛选
4. 阵容列表、上拉加载更多
5. 云函数

## Demo
![云顶zy.png](https://upload-images.jianshu.io/upload_images/9279065-f70a1eb8850d9a2a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 数据库数据
可以通过云数据库的导入功能进行导入。这里数据是拿的官网数据，但是阵容部分数据有缺失没有进行补充。  
数据地址 [https://github.com/liulxin/ydzy/tree/master/miniprogram](https://github.com/liulxin/ydzy/tree/master/miniprogram)

## 云函数
云函数地址 [https://github.com/liulxin/ydzy/tree/master/cloudfunctions](https://github.com/liulxin/ydzy/tree/master/cloudfunctions)

## 图片
图片资源地址 [https://github.com/liulxin/ydzy/tree/master/image](https://github.com/liulxin/ydzy/tree/master/image)

## 注意
本地拉取代码后需将云数据库，云存储，云函数等进行更新。注意`app.js`中云环境需要修改为自己的云环境id
```
 wx.cloud.init({
    env: 'ydzy-yun-3c5429',
    traceUser: true,
  })
```

## 效果图
![英雄](https://upload-images.jianshu.io/upload_images/9279065-0eeb805886895b83.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![英雄](https://upload-images.jianshu.io/upload_images/9279065-a90257966cefcaf7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![英雄详情](https://upload-images.jianshu.io/upload_images/9279065-aa16ae983e817d0c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![装备](https://upload-images.jianshu.io/upload_images/9279065-1215480fca7d0a37.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![阵容](https://upload-images.jianshu.io/upload_images/9279065-892fd79392838e8e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
