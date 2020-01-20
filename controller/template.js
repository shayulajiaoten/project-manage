
const {
  exec,
  con
} = require('../db/mysql')

// 创建模板
const create_template = (picturePath, templateName, description, username) => {
  const test_same_sql = `
    select *from template_task where (template_name='${templateName}',creator='${username}')
  `
  const create_sql = `
      insert into template_task
      (picture_path,template_name,description,creator)
      vaules 
      ('${picturePath}','${templateName}','${description}','${username}')
  `
  return exec(test_same_sql).then((rows) => {
    if (rows) {
      return -1
    } else {
      return exec(create_sql)
    }
  })
}

// 修改模板
const change_template = (picturePath, templateName, description, templateId) => {
  const change_sql
}

module.exports = {
  create_template,
  change_template,
}