import { Request } from 'express'
import { validateLogin } from '../helpers/loginValidation'
import { Error_Unauthorized } from '@/handleSystemError'

import pool from '@/database/index'
import bcrypt from 'bcrypt'
import { LoginControllerTypes } from '../types'

import { v4 as uuidv4 } from 'uuid'

class LoginService implements LoginControllerTypes.LoginService {
	async autenticate(data: LoginControllerTypes.BodyDoLogin, req: Request) {
		await validateLogin(data)

		const user = await pool
			.query('SELECT id, passhash, userid FROM users WHERE username = $1', [
				data.username,
			])
			.then((r) => r?.rows[0])

		if (!user) throw new Error_Unauthorized('Usuario ou Senha Incorretas!')

		if (bcrypt.compareSync(data.password, user.passhash)) {
			req.session.user = {
				id: user.id,
				userid: user.userid,
				username: data.username,
			}

			return { loggedIn: true, username: data.username }
		} else {
			throw new Error_Unauthorized('Usuario ou Senha Incorretas!')
		}
	}

	async checkToken(req: Request) {
		const existsToken = !!req.session.user

		return {
			loggedIn: existsToken,
			username: existsToken ? req.session.user?.username : undefined,
		}
	}

	async signup(data: LoginControllerTypes.BodyDoLogin, req: Request) {
		await validateLogin(data)

		const existingUser = await pool.query(
			'SELECT username FROM users WHERE username = $1',
			[data.username],
		)

		if (existingUser.rowCount === 0) {
			const newUserQuery = await pool.query(
				'INSERT INTO users (username, passhash, userid) VALUES ($1, $2, $3) RETURNING id, userid, username',
				[data.username, bcrypt.hashSync(data.password, 10), uuidv4()],
			)

			const objToken = {
				id: newUserQuery.rows[0].id,
				userid: newUserQuery.rows[0].userid,
				username: data.username,
			}

			req.session.user = objToken

			return { loggedIn: true, username: data.username }
		} else {
			throw new Error_Unauthorized('Esse Usuário já está em uso!')
		}
	}
}

export default new LoginService()
