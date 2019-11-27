// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
const $ = _.aggregate

// 云函数入口函数
exports.main = async(event, context) => {
  let res = db.collection('heros').aggregate().match({
    heroId: event.id
  }).lookup({
    from: 'jobs',
    localField: 'job',
    foreignField: 'key',
    as: 'job'
  }).lookup({
    from: 'traces',
    localField: 'race',
    foreignField: 'key',
    as: 'race'
  }).end()
  return res
}