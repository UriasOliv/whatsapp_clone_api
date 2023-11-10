import { NextFunction, Request, Response } from 'express'
import * as loginServices from './services/loginService'

import * as T from './types'

class LoginController {
	async doLogin(req: Request, res: Response, next: NextFunction) {
		await loginServices.autenticate(req.body as T.BodyDoLogin)

		res.json('Ok')
	}

	async register(req: Request, res: Response) {
		await loginServices.signup(req.body as T.BodyDoLogin)

		res.json('Usuario cadastrado com sucesso!')
	}
}

export default new LoginController()
