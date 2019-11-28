// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
const $ = _.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
  let raceList, jobList
  await db.collection('heros').where({
    heroId: event.id
  }).get().then(async res => {
    raceList = await db.collection('heros').where({
      race: res.data[0].race,
      heroId: _.not(_.eq(event.id))
    }).get()
  })

  await db.collection('heros').where({
    heroId: event.id
  }).get().then(async res => {
    jobList = await db.collection('heros').where({
      job: res.data[0].job,
      heroId: _.not(_.eq(event.id))
    }).get()
  })

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
  }).addFields({
    jobList,
    raceList
  }).end()
  return res
}