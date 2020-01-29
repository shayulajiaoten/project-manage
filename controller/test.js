const {
  exec,
  con
} = require('../db/mysql')


// 创建模板
const test = () => {
  return exec()
}



module.exports = {
  test,
}