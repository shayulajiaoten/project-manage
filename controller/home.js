const {
	exec,
} = require('../db/mysql')

const login = (username, password, email) => {

	const sql = `
        select username from users where (username='${username}' OR email='${email}') and password='${password}'
    `
	return exec(sql).then(rows => {
		return rows[0] || {}
	})
}

const register = (username, password, question, answer, email) => {

	const test_user = `
        select *from users where (username='${username}' OR email='${email}')
    `
	const register_user = `
	    insert into users (username,password,question,answer,email) values ('${username}','${password}','${question}','${answer}','${email}' )
	`
	return exec(test_user).then(rows => {
		if (rows[0]) {
			return 'false'
		} else {
			return exec(register_user).then(() => {
				return 'true'
			})
		}
	})
}

module.exports = {
	login,
	register
}