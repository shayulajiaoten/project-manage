var express = require('express');
var router = express.Router();
const {
  create_template,
  change_template,
} = require('../controller/template')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')
// const {
//   username
// } = req.session

// 创建模板
router.get('/createTemplate', (req, res, next) => {
  const username = 'member_name'
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
router.get('/changeTemplate', (req, res, next) => {
  return change_template(picturePath, templateName, description, templateId).then(()=>{
    return res.json(
      new SuccessModel('修改成功')
    )
  })
})

module.exports = router;