// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
const $ = _.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
  let res = db.collection('teams').aggregate().sort({ 'line_id':-1}).skip(event.skip * 15).limit(15).end()
  return res
}