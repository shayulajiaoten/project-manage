

const {
	exec,
	con
} = require('../db/mysql')

const login = (member_name, password, email) => {

	const sql = `
        select member_name from system_member where (member_name='${member_name}' OR email='${email}') and password='${password}'
    `
	return exec(sql).then(rows => {
		// console.log(rows[0]);
		
		return rows[0] || {}
	})
}



const register = (member_name, password, question, answer, email, nickname) => {
	const test_user = `
		select *from system_member where (member_name='${member_name}' OR email='${email}')
	`
	const register_user = `
		insert into system_member (member_name,password,question,answer,email) values ('${member_name}','${password}','${question}','${answer}','${email}' )
	`

	return exec(test_user).then(rows => {
		
		if (rows[0]) {
			return false
		} else {
			return exec(register_user).then(() => {
				return true
			})
		}
	})
}










async function zc(member_name, password, question, answer, email) {
	const test_user = `
        select *from system_member where (member_name='${member_name}' OR email='${email}')
    `
	const register_user = `
				insert into system_member (member_name,password,question,answer,email,nickname) values ('${member_name}','${password}','${question}','${answer}','${email}','${nickname}' )
	`

	try {
		await con.promise().beginTransaction();
		const nouser = await exec(test_user)
		console.log(nouser);

		if (nouser[0]) {
			await con.promise().rollback();
			return false
		}
		await exec(register_user)
		await con.promise().commit();
		return true
	} catch (error) {
		await con.promise().rollback();
		return false
	}
}

module.exports = {
	zc,
	login,
	register
}