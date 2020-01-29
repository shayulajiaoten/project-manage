const {
	exec,
	con
} = require('../db/mysql')

// 登录
const login = (member_name, password, email) => {

	const sql = `
        select member_name from system_member where (member_name='${member_name}' OR email='${email}') and password='${password}'
    `
	return exec(sql).then(rows => {
		// console.log(rows[0]);

		return rows[0] || {}
	})
}


// 注册
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

// 对应账号密保问题
const question = (select, account) => {
	let email
	if (select === 'email') {
		email = true
	} else {
		email = false
	}
	const test_user = email ? `
		select id,question from system_member where (email='${account}')
	` : `
	select id,question from system_member where (member_name='${account}')
`
	console.log(test_user);

	return exec(test_user)
}

// 验证密保问题修改密码
const changePassword = (id, password, answer) => {
	const test_sql = `
	 select *from system_member where (answer='${answer}' and id='${id}')
	`
	const change_sql = `
	 update system_member
	 set password='${password}'
	 where
	 id='${id}'
	`
	return exec(test_sql).then((rows) => {
		if (rows.length) {
			return exec(change_sql).then(()=>{
				return true
			})
			
		} else {
			return false
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
	register,
	question,
	changePassword,
}