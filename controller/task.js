const {
  exec,
  con
} = require('../db/mysql')


// 添加项目任务
const create_task = (projectId, taskName) => {
  const add_sql = `
    insert into project_task_relation
    (project_id,task_name) values
    ('${projectId}','${taskName}')
  `
  return exec(add_sql)
}

module.exports = {
  create_task
}