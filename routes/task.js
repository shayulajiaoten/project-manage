var express = require('express');
var router = express.Router();
const {
  create_task,
  create_subtask,
  change_status,
  delete_subtask,
  task_list,
  subtask_list
} = require('../controller/task')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')
// const {
//   member_name
// } = req.session
const username = 'member_name'
// 创建对应项目任务
router.post('/createTask', (req, res, next) => {
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

// 获得项目对应任务列表
router.post('/taskList', (req, res, next) => {
  const {
    projectId
  } = req.body
  const result = task_list(projectId)
  return result.then((dataList) => {
    return res.json(
      new SuccessModel(dataList)
    )
  })
})

// 获得项目任务对应子任务列表
router.post('/subTaskList', (req, res, next) => {
  const {
    taskListId
  } = req.body
  const result = subtask_list(taskListId)
  return result.then((dataList) => {
    return res.json(
      new SuccessModel(dataList)
    )
  })
})

// 添加对应子任务
router.post('/createSubtask', (req, res, next) => {
  const {
    member_name
  } = req.session
  const {
    project_code,
    stage_code,
    name
  } = req.body

  const result = create_subtask(stage_code, name, member_name, project_code)
  return result.then((dataList) => {
    return res.json(
      new SuccessModel(dataList[0])
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