const {
  exec,
  con
} = require('../db/mysql')

// 申请创建团队
const create_team = (teamName, username, id) => {
  const test_sql = `
      select  *from team_create where (team='${teamName}')
  `
  const create_sql = `
      insert into team_create (team,creator,creator_id) values ('${teamName}','${username}','${id}' )
    `
  const test_member_sql = `
    select team from system_member where id ='${id}'
  `
  return exec(test_member_sql).then((rows) => {
    if (rows[0].team) {
      return -1
    } else {
      return exec(test_sql).then((rows) => {
        if (rows[0]) {
          return -2
        } else {
          return exec(create_sql).then(() => {
            return 1
          })
        }
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
    select *from team_create where (permission=1 and del=0)
  `
  return exec(query_list_sql)
}

// 修改团队信息
const edit_team = (member_name, teamName, preName) => {
  const ismember_sql = `
    select *from system_member where (member_name = '${member_name}' and team='${preName}')
  ` // 必须为团队成员才能邀请
  console.log(ismember_sql);

  const update_team_sql = `
    UPDATE team_create SET team='${teamName}' WHERE  team='${preName}'
  `
  const update_memberteam_sql = `
  UPDATE system_member SET team='${teamName}' WHERE  team='${preName}'
`
  console.log(update_team_sql);

  return exec(ismember_sql).then((rows) => {
    if (rows[0]) {
      return exec(update_team_sql).then(() => {
        return exec(update_memberteam_sql).then(() => {
          return true
        })
      })
    } else {
      return false
    }
  })
}

// 删除团队
const delete_team = (member_name, teamName) => {
  const is_super_sql = `
    select *from system_member where (member_name = '${member_name}' and super_leader='1')
  ` // 必须为团队成员才能邀请
  console.log(is_super_sql);

  const update_team_sql = `
    UPDATE team_create SET del=1 WHERE  team='${teamName}'
  `
  const update_memberteam_sql = `
  UPDATE system_member SET team='' WHERE  team='${teamName}'
`
  console.log(update_team_sql);

  return exec(is_super_sql).then((rows) => {
    if (rows[0]) {
      return exec(update_team_sql).then(() => {
        return exec(update_memberteam_sql).then(() => {
          return true
        })
      })
    } else {
      return false
    }
  })
}

// 查看对应团队成员列表
const team_members_list = (teamName) => {
  const query_list_sql = `
    select id,member_name,nickname,email,is_team_leader,avatar from system_member where (team='${teamName}')
  `
  console.log(query_list_sql);

  return exec(query_list_sql)
}

// 邀请团队成员
const invite_member = (member_name, teamName, memberId) => {
  const ismember_sql = `
    select *from system_member where (member_name = '${member_name}' and team='${teamName}')
  ` // 必须为团队成员才能邀请
  console.log(ismember_sql);

  const update_member_sql = `
    UPDATE system_member SET team='${teamName}' WHERE  id='${memberId}'
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
const delete_member = (teamName, memberId, member_name) => {
  // member_name为当前session操作的name
  const isleader_sql = `
    select *from system_member where (member_name = '${member_name}' and team='${teamName}' and is_team_leader=1)
  ` // 必须为队长才能移除团队成员
  const update_member_sql = `
    UPDATE system_member SET team='',is_team_leader=0 WHERE  id='${memberId}'
  `
  return exec(isleader_sql).then((rows) => {
    if (rows[0]) {
      return exec(update_member_sql).then(() => {
        return true
      })
    } else {
      return false
    }
  })
}

// 查询没有加入任何团队的成员
const noteam_member = (email) => {
  const query_list_sql = `
  select  *from system_member where ((team='' or team is null) and email like '${email}%')
`
  console.log(query_list_sql);

  return exec(query_list_sql)
}


const get_currentteam = (member_name) => {
  const get_team_sql = `
    select team from system_member where member_name='${member_name}'
  `
  console.log(get_team_sql);

  return exec(get_team_sql)
}
module.exports = {
  create_team,
  create_team_list,
  team_list,
  team_members_list,
  invite_member,
  delete_member,
  noteam_member,
  get_currentteam,
  edit_team,
  delete_team,
}