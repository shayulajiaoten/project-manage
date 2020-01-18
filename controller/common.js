const {
  exec
} = require('../db/mysql')

const getMember = ((username) => {
  const sql = `
  select  *from system_member where (member_name='${username}')
`
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
})
module.exports = {
  getMember
}