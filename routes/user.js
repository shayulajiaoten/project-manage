var express = require('express');
var router = express.Router();
const {
  login,
  register,
  question,
  changePassword,
} = require('../controller/user')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')



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

router.post('/changePassword', (req, res, next) => {
  const {
    id,
    password,
    answer
  } = req.body

  const result = changePassword(id, password, answer)
  return result.then(data => {
    if(data) {
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

module.exports = router;