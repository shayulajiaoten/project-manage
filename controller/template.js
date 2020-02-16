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
      (cover,template_name,description,creator)
      values 
      ('${picturePath}','${templateName}','${description}','${username}')
  `
  console.log(test_same_sql);

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
    update project_template set cover='${picturePath}',template_name='${templateName}',description='${description}'
    where (id='${templateId}')
    `
  console.log(change_sql);

  return exec(change_sql)
}

// 添加模板任务
const add_template_task = (templateId, taskName, username, sort) => {
  if (!sort) {
    sort = 0
  }
  const add_sql = `
    insert into template_task_relation
    (template,task_name,creator,sort) values
    ('${templateId}','${taskName}','${username}','${sort}')
  `
  return exec(add_sql)
}

// 编辑模板任务
const edit_task = (task_name, taskId, sort) => {
  const edit_sql = `
    update template_task_relation set task_name='${task_name}',sort='${sort}'
    where (id='${taskId}')
    `
  return exec(edit_sql)
}
// 模板列表
const template_list = (viewType, member_name) => {
  let list_sql
  if (viewType == "0") {
    list_sql = `
      select *from project_template where creator='${member_name}'
    `
  }
  if (viewType == "-1") {
    list_sql = `
      select *from project_template where (system_template='1' or creator='${member_name}')
    `
  }
  if (viewType == "1") {
    list_sql = `
      select *from project_template where system_template='1'
    `
  }
  console.log(list_sql);

  return exec(list_sql).then(async (dataList) => {
    let promise = dataList.map((data, index) => {
      const select_sql = `
        select *from template_task_relation where (template='${data.id}' and deleted=0)
      `
      return exec(select_sql).then((template) => {
        return Object.assign(data, {
          task_stages: template
        })
      })
    })
    let result = await Promise.all(promise);
    return result
  })
}
// 模板任务列表
const template_task_list = (id) => {
  const select_sql = `
    select *from template_task_relation where (template='${id}' and deleted=0) 
    order by sort
  `
  console.log(select_sql);

  return exec(select_sql)
}

// 删除模板任务
const del_task = (id) => {
  const del_sql = `
    update template_task_relation set deleted=1
    where (id='${id}')
    `
  return exec(del_sql)
}

// 上传项目模板封面 
const upload_template_cover = (src, id) => {
  const upload_sql = `
		update project_template
		set cover = 'http://127.0.0.1:3000${src}'
		where
		id ='${id}'
  `
  console.log(upload_sql);

  return exec(upload_sql)
}
module.exports = {
  create_template,
  change_template,
  add_template_task,
  template_list,
  edit_task,
  template_task_list,
  del_task,
  upload_template_cover,
}