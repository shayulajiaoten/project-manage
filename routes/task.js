var express = require('express');
var router = express.Router();
const {
  create_task
} = require('../controller/task')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')
// const {
//   username
// } = req.session

// 创建对应项目任务
router.post('/createTask', (req, res, next) => {
  const username = 'member_name'
  const {
    projectId,
    taskName
  } = req.body
  
  const result = create_task(projectId, taskName)
  return result.then(() => {
    return res.json(
      new SuccessModel('添加项目任务成功')
    )
  })
})



module.exports = router;