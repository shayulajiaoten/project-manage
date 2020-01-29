const {
  exec,
  con
} = require('../db/mysql')


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

// 添加项目子任务
const create_subtask = (projectTaskId, taskName, username) => {
  const add_sql = `
    insert into task_sontask_relation
    (project_task _id,task_name,creator)
    values
    ('${projectTaskId}','${taskName}','${username}')
  `
  return exec(add_sql)
}

// 修改子任务状态
const change_status = (status,subtaskId,username) => {
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
const delete_subtask = (subtaskId,username) => {
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
  delete_subtask
}