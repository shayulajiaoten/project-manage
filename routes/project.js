const express = require('express');
const router = express.Router();
const {
  create_project
} = require('../controller/project')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')

const {
  getMember
} = require('../controller/common')

// 创建项目申请(队长直接创建，成员需向队长申请项目)
router.post('/createProject', (req, res, next) => {
  let {
    projectName, // 项目名
    templateId, // 模板id
    description, // 项目简介
  } = req.body
  // const {
  //   username
  // } = req.session
  const username = 'member_name'
  if (!templateId) {
    templateId = 0
  }
  let teamName
  return getMember(username).then((data) => {
    if (data.team) {
      teamName = data.team
      const result = create_project(projectName, templateId, description, teamName, username)
      return result.then((data) => {
        switch (data) {
          case 1:
            res.json(
              new SuccessModel('创建成功')
            )
            break;
          case 0:
            res.json(
              new SuccessModel('申请成功')
            )
            break;
          case -2:
            res.json(
              new ErrorModel('项目已存在')
            )
            break;
        }
      })
    } else {
      return res.json(
        new ErrorModel('非团队成员')
      )
    }
  })

})

module.exports = router;