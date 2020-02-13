var express = require('express');
var router = express.Router();

const {
  resolve_list,
  edit_project_status,
  edit_team_status
} = require('../controller/resolve')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')

const loginCheck = require('../middleware/loginCheck')

// 当前用户所需处理消息
router.get('/list', (req, res, next) => {
  const {
    member_id
  } = req.session
  const result = resolve_list(member_id)
  return result.then((dataList) => {
    return res.json(
      new SuccessModel(dataList)
    )
  })
})

// 处理项目申请
router.post('/editProjectStatus', (req, res, next) => {
  const {
    id,
    status
  } = req.body
  const result = edit_project_status(id, status)
  return result.then(() => {
    return res.json(
      new SuccessModel('修改成功')
    )
  
  })
})

// 处理团队申请
router.post('/editTeamStatus', (req, res, next) => {
  const {
    id,
    status
  } = req.body
  const result = edit_team_status(id, status)
  return result.then(() => {
    return res.json(
      new SuccessModel('修改成功')
    )
  })
})



module.exports = router;