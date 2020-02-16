var express = require('express');
var multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/avatar/'); // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    cb(null, file.originalname);
  }
});
var upload = multer({
  storage
});
var router = express.Router();
const {
  login,
  register,
  question,
  changePassword,
  edit_personal,
  edit_password,
  edit_email,
  upload_avatar
} = require('../controller/user')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
const {
  getMember
} = require('../controller/common')

// 登录路由
router.post('/login', (req, res, next) => {
  const {
    member_name,
    password,
    email
  } = req.body

  const result = login(member_name, password, email)
  return result.then(data => {
    if (data.member_name) {
      // 设置 session
      req.session.member_name = data.member_name
      req.session.member_id = data.id
      res.json(
        new SuccessModel('登录成功')
      )
      return
    }
    res.json(
      new ErrorModel('登录失败')
    )
  })
});

// 注册路由
router.post('/register', (req, res, next) => {
  const {
    member_name,
    password,
    email,
    question,
    answer,
    nickname
  } = req.body
  const result = register(member_name, password, question, answer, email, nickname)
  return result.then(data => {
    // console.log(data)
    if (data) {
      res.json(
        new SuccessModel('注册成功')
      )
      return
    }
    res.json(
      new ErrorModel('用户已存在')
    )
  })
});

// 获得对应账号密保问题
router.post('/getQuestion', (req, res, next) => {
  const {
    select,
    account
  } = req.body

  const result = question(select, account)
  return result.then(data => {
    console.log(data);

    if (data[0]) {
      res.json(
        new SuccessModel(data)
      )
    } else {
      res.json(
        new ErrorModel('账户不存在')
      )
    }
  })
})

// 修改密码（未登录）
router.post('/changePassword', (req, res, next) => {
  const {
    id,
    password,
    answer
  } = req.body

  const result = changePassword(id, password, answer)
  return result.then(data => {
    if (data) {
      res.json(
        new SuccessModel('密码修改成功')
      )
    } else {
      res.json(
        new ErrorModel('验证失败')
      )
    }
  })
})

// 修改密码（已登录）
router.post('/editPassword', (req, res, next) => {
  const {
    id,
    password,
    newPassword
  } = req.body

  const result = edit_password(id, password, newPassword)
  return result.then(data => {
    if (data) {
      res.json(
        new SuccessModel('密码修改成功')
      )
    } else {
      res.json(
        new ErrorModel('原密码错误')
      )
    }
  })
})
// 当前用户信息
router.get('/message', loginCheck, (req, res, next) => {
  const {
    member_name
  } = req.session
  return getMember(member_name).then((data) => {
    return res.json(
      new SuccessModel(data)
    )
  })
})

// 修改账户信息
router.post('/editPersonal', (req, res, next) => {
  const {
    nickname,
    description,
    id,
  } = req.body

  const result = edit_personal(nickname, description, id)
  return result.then(() => {
    res.json(
      new SuccessModel('修改成功')
    )
  })
});

// 修改邮箱
router.post('/editEmail', (req, res, next) => {
  const {
    email,
    id,
  } = req.body

  const result = edit_email(email, id)
  return result.then((data) => {
    if (data) {
      res.json(
        new SuccessModel('修改成功')
      )
    } else {
      res.json(
        new ErrorModel('该邮箱已经绑定账户')
      )
    }
  })
});

// 上传用户头像
router.post('/uploadAvatar', upload.single('avatar'), function (req, res, next) {
  const {
    member_id
  } = req.session
  const file = req.file;
  const result = upload_avatar(`/public/avatar/${file.originalname}`, member_id)
  return result.then(() => {
    res.json(
      new SuccessModel(`http://127.0.0.1:3000/public/avatar/${file.originalname}`)
    )
  })
});
module.exports = router;