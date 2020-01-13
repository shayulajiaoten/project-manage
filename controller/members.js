
const {
  exec,
  con
} = require('../db/mysql')


const create_team = (teamName) => {
  
  const sql = `
      insert into team_create (team,creator) values ('${teamName}','${creator}' )
    `
  return exec(sql).then(rows => {
    // console.log(rows[0]);

    return rows[0] || {}
  })
}

module.exports = {
  create_team
}