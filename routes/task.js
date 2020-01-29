var express = require('express');
var router = express.Router();
const {
  create_task,
  create_subtask,
  change_status,
  delete_subtask,
} = require('../controller/task')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')
// const {
//   username
// } = req.session
const username = 'member_name'
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

// 添加对应子任务
router.post('/createSubtask', (req, res, next) => {
  const username = 'member_name'
  const {
    projectTaskId,
    taskName
  } = req.body

  const result = create_subtask(projectTaskId, taskName, username)
  return result.then(() => {
    return res.json(
      new SuccessModel('添加子任务任务成功')
    )
  })
})

// 修改子任务状态
router.post('/changeStatus', (req, res, next) => {
  const username = 'member_name'
  const {
    status,
    subtaskId
  } = req.body
  const result = change_status(status, subtaskId, username)
  return result.then(() => {
    return res.json(
      new SuccessModel('修改状态成功')
    )
  })
})
// 删除子任务
router.post('/deleteSubtask', () => {
  const {
    subtaskId
  } = req.body
  const result = delete_subtask(subtaskId, username)
  return result.then(() => {
    return res.json(
      new SuccessModel('删除成功')
    )
  })
})

module.exports = router;