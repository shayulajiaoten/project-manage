var express = require('express');
var router = express.Router();
const {
  login,
  register,
  zc
} = require('../controller/user')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')



// 登录路由
router.post('/login', function (req, res, next) {
  const {
    username,
    password,
    email
  } = req.body

  const result = login(username, password, email)
  return result.then(data => {
    if (data.username) {
      // 设置 session
      console.log(data.username);
      req.session.username = data.username

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
    username,
    password,
    email,
    question,
    answer
  } = req.body
  // const result = register(username, password, question, answer, email)
  const result = zc(username, password, question, answer, email)
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