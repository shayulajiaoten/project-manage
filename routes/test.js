var express = require('express');
var router = express.Router();
const {
  test
} = require('../controller/test')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')

// test
router.post('/test', () => {
  const {
    
  } = req.body
  const result = test()
  return result.then(() => {
    return res.json(
      new SuccessModel('删除成功')
    )
  })
})

module.exports = router;