const {
  exec,
  con
} = require('../db/mysql')

// 创建模板
const create_template = (picturePath, templateName, description, username) => {
  const test_same_sql = `
    select *from project_template where (template_name='${templateName}' and creator='${username}')
  `
  const create_sql = `
      insert into project_template
      (picture_path,template_name,description,creator)
      values 
      ('${picturePath}','${templateName}','${description}','${username}')
  `

  return exec(test_same_sql).then((rows) => {
    if (rows && rows.length) {
      return -1
    } else {
      return exec(create_sql)
    }
  })
}

// 修改模板
const change_template = (picturePath, templateName, description, templateId) => {
  const change_sql = `
    update project_template set picture_path='${picturePath}',template_name='${templateName}',description='${description}'
    where (id='${templateId}')
    `
    console.log(change_sql);
    
  return exec(change_sql)
}

// 添加模板任务
const add_template_task = (templateId, taskName, username) => {
  const add_sql = `
    insert into template_task_relation
    (template,task_name,creator) values
    ('${templateId}','${taskName}','${username}')
  `
  return exec(add_sql)
}

module.exports = {
  create_template,
  change_template,
  add_template_task
}