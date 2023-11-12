import { Request, Response } from 'express'
import loginServices from './services/loginService'
import { LoginControllerTypes } from './types'

class LoginController implements LoginControllerTypes.LoginController {
	async doLogin(req: Request, res: Response) {
		const response = await loginServices.autenticate(req.body, req)

		res.json(response)
	}

	async checkToken(req: Request, res: Response) {
		const response = await loginServices.checkToken(req)

		res.json(response)
	}

	async register(req: Request, res: Response) {
		const response = await loginServices.signup(req.body, req)

		res.json(response)
	}
}

export default new LoginController()
