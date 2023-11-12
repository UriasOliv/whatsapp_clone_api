import { Request, Response } from 'express'

declare namespace LoginControllerTypes {
	interface BodyDoLogin {
		username: string
		password: string
	}

	class LoginController {
		async doLogin(req: Request, res: Response): Promise<void>
		/**
		 * @abstract Rota que verifica se o token do usuario esta valido
		 */
		async checkToken(req: Request, res: Response): Promise<void>
		async register(req: Request, res: Response): Promise<void>
	}

	interface LoggedInReturn {
		loggedIn: boolean
		username: string | undefined
	}

	class LoginService {
		/**
		 * @abstract Autentica usuario
		 */
		async autenticate(req: BodyDoLogin, res: Request): Promise<LoggedInReturn>

		/**
		 * @param req Para buscar a sessão para verificar se esta valido
		 * @abstract Verifica a sessao do usuario e verifica se o token ainda esta valido
		 */
		async checkToken(req: Request): Promise<LoggedInReturn>

		/**
		 * @abstract Registra usuario no sistema
		 */
		async signup(req: BodyDoLogin, res: Request): Promise<LoggedInReturn>
	}
}
