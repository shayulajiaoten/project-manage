
const {
  exec,
  con
} = require('../db/mysql')

// 申请创建团队
const create_team = (teamName) => {
  const test_sql = `
      select  *from leader_member_relation where (team='${teamName}')
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


// 查看团队申请列表
const create_team_list = () => {
  const query_list_sql = `
    select *from team_create where resolve=0
  `
  return exec(query_list_sql)
}


// 团队列表
const team_list = () => {
  const query_list_sql = `
    select distinct team from system_member
  `
  return exec(query_list_sql)
}


// 查看对应团队成员列表
const team_members_list = (teamName) => {
  const query_list_sql = `
    select id,member_name,nickname,email,is_team_leader from system_member where (team='${teamName}')
  `
  return exec(query_list_sql)
}

// 邀请团队成员
const invite_member = (teamName, memberId) => {
  const ismember_sql = `
    select *from system_member where (member_name = '${member_name}' and team='${teamName}')
  `
  const update_member_sql = `
    UPDATE system_member SET team=${teamName} WHERE  id=${memberId}
  `
  return exec(ismember_sql).then((rows) => {
    if (rows[0]) {
      return exec(update_member_sql).then(() => {
        return true
      })
    } else {
      return false
    }
  })
}

// 移除团队成员
const delete_member = (teamName, memberId) => {
  const ismember_sql = `
    select *from system_member where (member_name = '${member_name}' and team='${teamName}')
  `
  const update_member_sql = `
    UPDATE system_member SET team=${teamName} WHERE  id=${memberId}
  `
  return exec(ismember_sql).then((rows) => {
    if (rows[0]) {
      return exec(update_member_sql).then(() => {
        return true
      })
    } else {
      return false
    }
  })
}

module.exports = {
  create_team,
  create_team_list,
  team_list,
  team_members_list,
  invite_member,
  delete_member
}