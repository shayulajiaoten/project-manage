var express = require('express');
var router = express.Router();
const {
  create_template,
  change_template,
  add_template_task,
} = require('../controller/template')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')
// const {
//   username
// } = req.session

// 创建模板
router.post('/createTemplate', (req, res, next) => {
  const username = 'member_name'
  const {
    picturePath,
    templateName,
    description
  } = req.body
  return create_template(picturePath, templateName, description, username).then((data) => {
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
  const username = 'member_name'
  const {
    templateId,
    taskName
  } = req.body
  const result = add_template_task(templateId, taskName, username)
  return result.then(() => {
    return res.json(
      new SuccessModel('添加模板任务成功')
    )
  })
})
module.exports = router;