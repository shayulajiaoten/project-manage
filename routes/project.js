var express = require('express');
var router = express.Router();

const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')

// 创建项目申请(队长直接创建，成员需向队长申请项目)
router.post('/createProject', (req, res, next) => {
  const {
    projectName, // 项目名
    templateId,  // 模板id
    description, // 项目简介
  } = req.body
  const result = create_project(projectName, templateId, description)
  return result.then((data) => {
    if (data) {
      res.json(
        new SuccessModel('申请成功')
      )
    } else {
      res.json(
        new ErrorModel('项目已存在')
      )
    }
  })
})

module.exports = router;