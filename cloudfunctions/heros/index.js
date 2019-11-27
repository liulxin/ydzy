// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
const $ = _.aggregate

// 云函数入口函数
exports.main = async(event, context) => {
  let list = await db.collection('heros').aggregate().lookup({
      from: 'jobs',
      let: {
        heros_job: '$job',
        heros_ojob: '$otherjob'
      },
      pipeline: $.pipeline()
        .match(_.expr($.or([
          $.eq(['$key', '$$heros_job']),
          $.eq(['$key', '$$heros_ojob'])
        ]))).done(),
      as: 'job_'
    }).lookup({
      from: 'traces',
      let: {
        traces_race: '$race',
        traces_orace: '$otherrace'
      },
      pipeline: $.pipeline()
        .match(_.expr($.or([
          $.eq(['$key', '$$traces_race']),
          $.eq(['$key', '$$traces_orace'])
        ]))).done(),
      as: 'race_'
    })
    .limit(100)
    .end()

  return list
}