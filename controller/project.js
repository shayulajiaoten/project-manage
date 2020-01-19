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
      select *from system_project where (team='${teamName}' and project_name='${projectName}' and able='1')
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

// 获得项目列表（不包含已归档和进入回收站）
const project_list = (teamName) => {
  const list_sql = `
    select *from system_project where (team='${teamName}' and able='1' and recycle='0' and pigeonhole='0') 
  `
  return exec(list_sql)
}

// 获得回收站项目列表
const recycle_list = (teamName) => {
  const list_sql = `
    select *from system_project where (team='${teamName}' and able='1' and recycle='1' ) 
  `
  return exec(list_sql)
}

// 获得归档项目列表
const pigeonhole_list = (teamName) => {
  const list_sql = `
    select *from system_project where (team='${teamName}' and able='1'  and pigeonhole='1') 
  `
  return exec(list_sql)
}

// 项目回收
const recycle_project = (projectId) => {
  const recycle_sql = `
    UPDATE system_project SET recycle='1' WHERE  id='${projectId}'
  `
  return exec(recycle_sql)
}

// 取消回收
const un_recycle_project = (projectId) => {
  const recycle_sql = `
    UPDATE system_project SET recycle='01' WHERE  id='${projectId}'
  `
  return exec(recycle_sql)
}

// 项目归档
const pigeonhole_project = (projectId) => {
  const recycle_sql = `
    UPDATE system_project SET pigeonhole='1' WHERE  id='${projectId}'
  `
  return exec(recycle_sql)
}

// 取消归档
const un_pigeonhole_project = (projectId) => {
  const recycle_sql = `
    UPDATE system_project SET pigeonhole='0' WHERE  id='${projectId}'
  `
  return exec(recycle_sql)
}

// 收藏项目
const collect_project = (projectId, username) => {
  const test_collect_sql = `
      select *from project_member_relation where(project_id='${projectId}' and member_name='${username}')
  `
  const add_collect_sql = `
      insert into project_member_relation
      (project_id,member_name) values
      ('${projectId}','${username}')
  `
  return exec(test_collect_sql).then((rows) => {
    if (rows[0]) {
      const relationId = rows[0].id
      const collect_sql = `
        update project_member_relation set collect='1' where id='${relationId}'
      `
      return exec(collect_sql)
    } else {
      return exec(add_collect_sql)
    }
  })
}

// 取消收藏
const un_collect_project = (projectId, username) => {
  const un_collect_sql = `
      update project_member_relation set collect='0' where (project_id='${projectId}' and member_name='${username}')
  `
  return exec(un_collect_sql)
}

// 更改项目信息
const change_messsage_project = (projectId, plan, projectName, description) => {
  const change_sql = `
      update system_project set  plan='${plan}',project_name='${projectName}',description='${description}' where id='${projectId}'
  `
  console.log(change_sql);
  
  return exec(change_sql)
}
module.exports = {
  create_project,
  project_list,
  recycle_list,
  pigeonhole_list,
  recycle_project,
  pigeonhole_project,
  un_recycle_project,
  un_pigeonhole_project,
  collect_project,
  un_collect_project,
  change_messsage_project
}