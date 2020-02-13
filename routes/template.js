var express = require('express');
var router = express.Router();
const {
  create_template,
  change_template,
  add_template_task,
  template_list,
  template_task_list,
  edit_task,
  del_task,
} = require('../controller/template')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')
// const {
//   member_name
// } = req.session

// 创建模板
router.post('/createTemplate', (req, res, next) => {
  const {
    member_name
  } = req.session
  const {
    picturePath,
    template_name,
    description
  } = req.body
  return create_template(picturePath, template_name, description, member_name).then((data) => {
    if (data == -1) {
      return res.json(
        new ErrorModel('项目模板已存在')
      )
    } else {
      return res.json(
        new SuccessModel('创建模板成功')
      )
    }
  })
})

// 修改模板信息
router.post('/changeTemplate', (req, res, next) => {
  const {
    picturePath,
    templateName,
    description,
    templateId
  } = req.body
  return change_template(picturePath, templateName, description, templateId).then(() => {
    return res.json(
      new SuccessModel('修改成功')
    )
  })
})

// 添加模板任务
router.post('/addTemplateTask', (req, res, next) => {
  const {
    member_name
  } = req.session
  const {
    templateId,
    name,
    sort
  } = req.body
  const result = add_template_task(templateId, name, member_name, sort)
  return result.then(() => {
    return res.json(
      new SuccessModel('添加模板任务成功')
    )
  })
})

// 模板列表
router.post('/tempalteList', (req, res, next) => {
  const {
    viewType,
  } = req.body
  const {
    member_name
  } = req.session
  const result = template_list(viewType, member_name)
  return result.then((dataList) => {
    return res.json(
      new SuccessModel(dataList)
    )
  })
})

// 模板任务列表
router.post('/templateTaskList', (req, res, next) => {
  const {
    id
  } = req.body
  const result = template_task_list(id)
  return result.then((dataList) => {
    return res.json(
      new SuccessModel(dataList)
    )
  })

})

// 修改模板任务
router.post('/editTemplateTask', (req, res, next) => {
  const {
    name,
    id,
    sort
  } = req.body
  const result = edit_task(name, id, sort)
  return result.then(() => {
    return res.json(
      new SuccessModel('修改成功')
    )
  })
})

// 删除模板任务
router.post('/delTemplateTask', (req, res, next) => {
  const {
    id
  } = req.body
  const result = del_task(id)
  return result.then(() => {
    return res.json(
      new SuccessModel('删除成功')
    )
  })
})
module.exports = router;