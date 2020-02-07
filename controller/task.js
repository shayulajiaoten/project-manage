const {
  exec,
  con
} = require('../db/mysql')


// 获得项目对应任务列表
const task_list = (projectId) => {
  const task_list_sql = `
    select *from project_task_relation where  (project_id='${projectId}')
  `
  return exec(task_list_sql).then((res) => {
    return res.map((data, index) => {
      return Object.assign(data, {
        tasksLoading: true,
        fixedCreator: false,
        showTaskCard: false,
        tasks: [],
        doneTasks: [],
        unDoneTasks: []
      })
    })
  })
}
// 添加项目任务
const create_task = (projectId, taskName) => {
  const add_sql = `
    insert into project_task_relation
    (project_id,task_name) 
    values
    ('${projectId}','${taskName}')
  `
  return exec(add_sql)
}
// 获得任务对应子任务列表
const subtask_list = (taskListId) => {
  const subtask_list_sql = `
    select *from task_sontask_relation where  (task_list_id='${taskListId}')
  `
  return exec(subtask_list_sql).then((res) => {
    return res.map((data, index) => {
      return Object.assign(data, {
        pri: 0
      })
    })
  })
}
// 添加项目子任务
const create_subtask = (projectTaskId, taskName, username, projectId) => {
  const add_sql = `
    insert into task_sontask_relation
    (task_list_id,task_name,creator,project_id)
    values
    ('${projectTaskId}','${taskName}','${username}','${projectId}')
  `
  return exec(add_sql).then((res) => {
    const select_sql = `
      select *from task_sontask_relation where id='${res.insertId}'
    `
    return exec(select_sql)
  })
}

// 修改子任务状态
const change_status = (status, subtaskId, username) => {
  const change_sql = `
    update task_sontask_relation
    set
    complete='${status}',
    updater='${username}'
    where
    id = '${subtaskId}'
  `
  return exec(change_sql)
}

// 删除子任务
const delete_subtask = (subtaskId, username) => {
  const delete_sql = `
    update task_sontask_relation
    set
    able=1,
    updater='${username}'
    where
    id = '${subtaskId}'
  `
  return exec(delete_sql)
}
module.exports = {
  create_task,
  create_subtask,
  change_status,
  delete_subtask,
  task_list,
  subtask_list,
}