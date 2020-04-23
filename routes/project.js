const express = require('express');
var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/cover/'); // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    cb(null, file.originalname);
  }
});
var upload = multer({
  storage
});
const router = express.Router();
const {
  create_project,
  project_list,
  all_project_list,
  recycle_list,
  pigeonhole_list,
  recycle_project,
  pigeonhole_project,
  collect_project,
  un_recycle_project,
  un_pigeonhole_project,
  un_collect_project,
  change_messsage_project,
  invite_member,
  collect_list,
  get_project,
  upload_cover
} = require('../controller/project')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
const {
  getMember
} = require('../controller/common')
// const {
//   member_name
// } = req.session


// 创建项目申请(队长直接创建，成员需向队长申请项目)
router.post('/createProject', loginCheck, (req, res, next) => {
  let {
    name, // 项目名
    templateId, // 模板id
    description, // 项目简介
  } = req.body

  const {
    member_name
  } = req.session
  if (!templateId) {
    templateId = 0
  }
  let teamName
  return getMember(member_name).then((data) => {
    if (data.team) {
      teamName = data.team
      const result = create_project(name, templateId, description, teamName, member_name)
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
        new ErrorModel('当前用户没加入任何团队')
      )
    }
  })

})

// 获得项目列表（不包含已归档和进入回收站）
router.get('/projectList', loginCheck, (req, res, next) => {
  let teamName
  const {
    member_name
  } = req.session
  return getMember(member_name).then((data) => {
    if (data.team) {
      teamName = data.team
      const result = project_list(teamName, member_name)
      return result.then((dataList) => {
        return res.json(
          new SuccessModel(dataList)
        )
      })
    } else {
      return res.json(
        new ErrorModel('当前用户没加入任何团队')
      )
    }
  })
})

// 获得所有项目列表
router.get('/allProjectList', loginCheck, (req, res, next) => {
  let teamName
  const {
    member_name
  } = req.session
  console.log(req.session);
  
  return getMember(member_name).then((data) => {
    if (data.team) {
      teamName = data.team
      const result = all_project_list(teamName, member_name)
      return result.then((dataList) => {
        return res.json(
          new SuccessModel(dataList)
        )
      })
    } else {
      return res.json(
        new ErrorModel('当前用户没加入任何团队')
      )
    }
  })
})

// 获得回收站项目列表
router.get('/recycleList', loginCheck, (req, res, next) => {
  let teamName
  const {
    member_name
  } = req.session
  return getMember(member_name).then((data) => {
    if (data.team) {
      teamName = data.team
      const result = recycle_list(teamName)
      return result.then((dataList) => {
        return res.json(
          new SuccessModel(dataList)
        )
      })
    } else {
      return res.json(
        new ErrorModel('当前用户没加入任何团队')
      )
    }
  })
})

// 获得对应项目信息
router.post('/getProject', loginCheck, (req, res, next) => {
  const {
    projectId
  } = req.body
  const {
    member_name
  } = req.session
  const result = get_project(projectId, member_name)
  return result.then((data) => {
    return res.json(
      new SuccessModel(data[0])
    )
  })

})

// 获得归档项目列表
router.get('/pigeonholeList', loginCheck, (req, res, next) => {
  let teamName
  const {
    member_name
  } = req.session
  return getMember(member_name).then((data) => {
    if (data.team) {
      teamName = data.team
      const result = pigeonhole_list(teamName)
      return result.then((dataList) => {
        return res.json(
          new SuccessModel(dataList)
        )
      })
    } else {
      return res.json(
        new ErrorModel('当前用户没加入任何团队')
      )
    }
  })
})

// 将项目丢进回收站
router.post('/recycle', loginCheck, (req, res, next) => {
  const {
    projectId
  } = req.body
  const result = recycle_project(projectId)
  return result.then(() => {
    return res.json(
      new SuccessModel('回收成功')
    )
  })
})

// 项目归档
router.post('/pigeonhole', loginCheck, (req, res, next) => {
  const {
    projectId
  } = req.body
  const result = pigeonhole_project(projectId)
  return result.then(() => {
    return res.json(
      new SuccessModel('归档成功')
    )
  })
})

// 取消回收
router.post('/recovery', loginCheck, (req, res, next) => {
  const {
    projectId
  } = req.body
  const result = un_recycle_project(projectId)
  return result.then(() => {
    return res.json(
      new SuccessModel('取消回收成功')
    )
  })
})

// 取消归档
router.post('/unPigeonhole', loginCheck, (req, res, next) => {
  const {
    projectId
  } = req.body
  const result = un_pigeonhole_project(projectId)
  return result.then(() => {
    return res.json(
      new SuccessModel('取消归档成功')
    )
  })
})

// 收藏项目
router.post('/collect', loginCheck, (req, res, next) => {
  const {
    projectId,
  } = req.body
  const {
    member_name
  } = req.session
  const result = collect_project(projectId, member_name)
  return result.then(() => {
    return res.json(
      new SuccessModel('收藏成功')
    )
  })
})

// 取消收藏
router.post('/unCollect', loginCheck, (req, res, next) => {
  const {
    projectId
  } = req.body
  const {
    member_name
  } = req.session
  const result = un_collect_project(projectId, member_name)
  return result.then(() => {
    return res.json(
      new SuccessModel('取消收藏成功')
    )
  })
})

// 收藏项目列表
router.get('/collectList', loginCheck, (req, res, next) => {
  const {
    member_name
  } = req.session
  const result = collect_list(member_name)
  return result.then((dataList) => {
    console.log(dataList);

    return res.json(
      new SuccessModel(dataList)
    )
  })
})

// 更改项目信息
router.post('/changeMessage', loginCheck, (req, res, next) => {
  const {
    cover,
    projectId,
    plan,
    projectName,
    description
  } = req.body
  const result = change_messsage_project(cover,projectId, plan, projectName, description)
  return result.then(() => {
    return res.json(
      new SuccessModel('更改成功')
    )
  })
})

// 邀请团队成员
router.post('./inviteMember', loginCheck, (req, res, next) => {
  const {
    projectId,
    memberName
  } = req.body
  const result = invite_member(projectId, memberName)
  return result.then(() => {
    return res.json(
      new SuccessModel('添加成功')
    )
  })
})

// 上传项目封面
router.post('/uploadCover', upload.single('cover'), function (req, res, next) {
  const {
    id 
  } = req.body
  const file = req.file;
    res.json(
      new SuccessModel(`http://39.97.220.197:3100/public/cover/${file.originalname}`)
    )
  // })
});
module.exports = router;