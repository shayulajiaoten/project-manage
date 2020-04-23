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
var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/template/cover'); // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    cb(null, file.originalname);
  }
});
var upload = multer({
  storage
});
// 创建模板
router.post('/createTemplate', (req, res, next) => {
  const {
    member_name
  } = req.session
  const {
    cover,
    template_name,
    description
  } = req.body
  return create_template(cover, template_name, description, member_name).then((data) => {
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
    cover,
    template_name,
    description,
    id
  } = req.body
  return change_template(cover, template_name, description, id).then(() => {
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

// 上传项目模板封面
router.post('/uploadCover', upload.single('cover'), function (req, res, next) {
  const {
    id
  } = req.body
  const file = req.file;
  res.json(
    new SuccessModel(`http://39.97.220.197:3100/public/template/cover/${file.originalname}`)
  )
});
module.exports = router;