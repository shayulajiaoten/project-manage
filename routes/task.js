var express = require('express');
var router = express.Router();
const {
  create_task,
  create_subtask,
  change_status,
  delete_subtask,
  task_list,
  subtask_list,
  assign_task,
  delete_task,
  edit_task,
  sort_task_list,
  my_task_list,
} = require('../controller/task')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')
const {
  getMember
} = require('../controller/common')
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
  return result.then((data) => {
    return res.json(
      new SuccessModel(data)
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
// 删除项目对应任务列表
router.post('/deleteTask', (req, res, next) => {
  // const {
  //   member_name
  // } = req.session
  const {
    taskId
  } = req.body
  const result = delete_task(taskId)
  return result.then(() => {
    return res.json(
      new SuccessModel('删除成功')
    )
  })
})

// 更改项目对应任务列表名
router.post('/editTask', (req, res, next) => {
  // const {
  //   member_name
  // } = req.session
  const {
    taskName,
    taskId
  } = req.body
  const result = edit_task(taskName, taskId)
  return result.then(() => {
    return res.json(
      new SuccessModel('编辑成功')
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
  const {
    member_name
  } = req.session
  const {
    status,
    subtaskId
  } = req.body
  const result = change_status(status, subtaskId, member_name)
  return result.then(() => {
    return res.json(
      new SuccessModel('修改状态成功')
    )
  })
})
// 删除子任务
router.post('/deleteSubtask', (req, res, next) => {
  const {
    member_name
  } = req.session
  const {
    subtaskId
  } = req.body
  const result = delete_subtask(subtaskId, member_name)
  return result.then(() => {
    return res.json(
      new SuccessModel('删除成功')
    )
  })
})

// 设置任务执行者
router.post('/assignTask', (req, res, next) => {
  const {
    member_name
  } = req.session
  const {
    subtaskId,
    executorId
  } = req.body
  const result = assign_task(subtaskId, executorId, member_name)
  return result.then(() => {
    return res.json(
      new SuccessModel('设置成功')
    )
  })
})

// 交换任务列表id
router.post('/sortTaskList', (req, res, next) => {
  const {
    preId,
    nextId
  } = req.body
  const result = sort_task_list(preId, nextId)
  return result.then(() => {
    return res.json(
      new SuccessModel('设置成功')
    )
  })
})

// 当前用户任务列表
router.post('/myTaskList', (req, res, next) => {
  const {
    member_id
  } = req.session
  const result = my_task_list(member_id)
  return result.then((dataList) => {
    return res.json(
      new SuccessModel(dataList)
    )
  })
})
module.exports = router;