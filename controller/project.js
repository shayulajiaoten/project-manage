const {
  exec,
  con
} = require('../db/mysql')

// 申请创建项目
const create_project = (teamName) => {
  // 判断当前用户是否为队长
  const test_sql = `
      select  *from system_member where (team='${teamName}' and )
  `
  const create_sql = `
      insert into team_create (team,creator) values ('${teamName}','321' )
    `
  return exec(test_sql).then((rows) => {
    if (rows[0]) {
      return false
    } else {
      return exec(create_sql).then(() => {
        return true
      })
    }
  })
}

module.exports = {
  create_project
}