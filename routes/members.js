var express = require('express');
var router = express.Router();
const {
  create_team
} = require('../controller/members')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')


// 创建部门接口
router.post('/create_team', function (req, res, next) {
  const {
    teamName
  } = req.body
  const result = create_team(teamName)
});

module.exports = router;