var express = require('express');
var router = express.Router();
const {
  login
} = require('../controller/user')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')


// 任务列表
router.post('/list', loginCheck, (req, res, next) => {
  
});

module.exports = router;