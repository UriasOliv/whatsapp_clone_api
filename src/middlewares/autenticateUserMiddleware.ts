import { Request, Response, NextFunction } from 'express'
import { Error_Unauthorized } from '@/handleSystemError'

class AutenticateUserMiddleware {
	checkSession(req: Request, res: Response, next: NextFunction) {
		if (req.session.user?.id) {
			next()
		} else {
			throw new Error_Unauthorized('Usuario não autorizado')
		}
	}

	checkSocketSession(socket: any, next: any) {
		if (socket.request.session?.user?.id == null) {
			next(new Error('Não autorizado!'))
		} else {
			next()
		}
	}
}

export default new AutenticateUserMiddleware()
