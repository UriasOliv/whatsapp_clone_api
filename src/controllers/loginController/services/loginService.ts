import { validateLogin } from '../helpers/loginValidation'
import { BodyDoLogin } from '../types'
import { Error_Unauthorized } from '@/handleSystemError'
import tokenAutenticate from '@/utils/tokenAutenticate'

import pool from '@/database/index'
import bcrypt from 'bcrypt'

export async function autenticate(data: BodyDoLogin) {
	await validateLogin(data)

	const user = await pool
		.query('SELECT id, passhash FROM users WHERE username = $1', [
			data.username,
		])
		.then((r) => r.rows[0])

	if (!user) throw new Error_Unauthorized('Usuario não autorizado!')

	if (bcrypt.compareSync(data.password, user.passhash)) {
		return {
			token: tokenAutenticate.createToken({
				id: user.id,
			}),
		}
	} else {
		throw new Error_Unauthorized('Usuario não autorizado!')
	}
}

export async function signup(data: BodyDoLogin) {
	await validateLogin(data)

	const existingUser = await pool.query(
		'SELECT username FROM users WHERE username = $1',
		[data.username],
	)

	if (existingUser.rowCount === 0) {
		await pool.query('INSERT INTO users (username, passhash) VALUES ($1, $2)', [
			data.username,
			bcrypt.hashSync(data.password, 10),
		])
	} else {
		throw new Error_Unauthorized('Esse Usuário já está em uso!')
	}
}
