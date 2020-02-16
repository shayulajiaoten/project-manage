const {
  exec,
  con
} = require('../db/mysql')

const resolve_list = (id) => {
  const test_sql = `
    select *from system_member where id='${id}'
  `
  return exec(test_sql).then((data) => {
    let projectList, teamList
    if (data[0].is_team_leader == 1) {
      const select_project_sql = `
        select *from system_project where (team='${data[0].team}' and resolve=0)
      `
      projectList = exec(select_project_sql)
    }
    if (data[0].super_leader == 1) {
      const select_team_sql = `
        select *from team_create where resolve=0
      `
      teamList = exec(select_team_sql)
    }
    const result = Promise.all([projectList, teamList])

    console.log(result);

    return result
  })
}

// 处理项目申请
const edit_project_status = (id, status) => {
  const edit_sql = `
    update system_project
    set able='${status}',resolve=1
    where id='${id}'
  `
  return exec(edit_sql)
}
// 处理团队申请
const edit_team_status = (id, status) => {
  const edit_sql = `
    update team_create
    set permission='${status}',resolve=1
    where id='${id}'
  `
  const sel_sql = `
    select *from team_create where id='${id}'
  `

  if (status === 1) {
    return exec(sel_sql).then((res) => {
      const add_sql = `
      update system_member
      set team_id='${id}',team='${res[0].team}',is_team_leader=1
      where id='${res[0].creator_id}'
    `
      console.log(add_sql);

      return exec(add_sql).then(() => {
        exec(edit_sql)
      })
    })
  }
  return exec(edit_sql)
}
module.exports = {
  resolve_list,
  edit_project_status,
  edit_team_status,
}