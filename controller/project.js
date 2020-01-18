const {
  exec
} = require('../db/mysql')

// 申请/创建项目
const create_project = (projectName, templateId, description, teamName, username) => {
  const member_name = username
  // 判断当前用户是否为该团队队长
  const test_leader_sql = `
      select  *from system_member where (team='${teamName}' and member_name='${member_name}' and is_team_leader = '1' )
  `
  // 判断当前用户是否加入了团队
  const test_sql = `
      select  *from system_member where (member_name='${member_name}' )
  `
  // 验证属于该团队的项目名是否有跟申请项目名重复
  const test_same_sql = `
      select *from system_project where (team='${teamName}' and project_name='${projectName}')
  `
  // 通过验证后申请项目
  const apply_sql = `
      insert into system_project 
      (project_name,template_id,description,creator,team) values 
      ('${projectName}','${templateId}','${description}','${username}','${teamName}' )
    `
  // 验证为团队队长后直接创建项目 
  const create_project = `
      insert into system_project 
      (project_name,template_id,description,creator,able,team) values 
      ('${projectName}','${templateId}','${description}','${username}',1,'${teamName}' )
  `
  return exec(test_sql).then(() => {
    return exec(test_leader_sql).then((rows) => {
      if (rows[0]) {
        return exec(test_same_sql).then((rows) => {
          if (!rows[0]) {
            console.log(create_project);

            return exec(create_project).then(() => {

              return 1 // 创建成功
            })
          } else {
            return -2 // 项目已存在
          }
        })

      } else {
        return exec(test_same_sql).then((rows) => {
          if (!rows[0]) {
            return exec(apply_sql).then(() => {
              return 0 // 申请成功
            })
          } else {
            return -2 // 项目已存在
          }
        })
      }
    })
  })

}

module.exports = {
  create_project
}