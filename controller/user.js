const {
	exec,
	con
} = require('../db/mysql')

// 登录
const login = (member_name, password) => {

	const sql = `
        select member_name,id from system_member where (member_name='${member_name}' OR email='${member_name}') and password='${password}'
    `
	return exec(sql).then(rows => {
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
			return exec(change_sql).then(() => {
				return true
			})
		} else {
			return false
		}
	})
}

// 修改账户信息
const edit_personal = (nickname, description, id) => {
	const edit_sql = `
		update system_member
		set nickname='${nickname}',description='${description}'
		where
		id='${id}'
	`

	return exec(edit_sql)
}

// 修改密码（已登录）
const edit_password = (id, password, newPassword) => {
	const test_sql = `
	select *from system_member where (password='${password}' and id='${id}')
 `
	const edit_sql = `
		update system_member
		set password='${newPassword}'
		where
		id='${id}'
	`
	return exec(test_sql).then((rows) => {
		if (rows.length) {
			return exec(edit_sql).then(() => {
				return true
			})
		} else {
			return false
		}
	})
}

// 修改邮箱
const edit_email = (email, id) => {
	const test_sql = `
		select *from system_member where (email='${email}')
 	`
	const edit_sql = `
		update system_member
		set email='${email}'
		where
		id='${id}'
	`
	console.log(edit_sql);
	
	return exec(test_sql).then((rows) => {
		if (rows.length) {
			return false
		} else {
			return exec(edit_sql).then(() => {
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
	register,
	question,
	changePassword,
	edit_personal,
	edit_password,
	edit_email,
}