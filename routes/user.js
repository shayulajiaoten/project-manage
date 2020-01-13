var express = require('express');
var router = express.Router();
const {
  login,
  register,
} = require('../controller/user')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')



// 登录路由
router.post('/login', function (req, res, next) {
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
        new SuccessModel()
      )
      return
    }
    res.json(
      new ErrorModel('登录失败')
    )
  })
});

// 注册路由
router.post('/register', function (req, res, next) {
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

module.exports = router;