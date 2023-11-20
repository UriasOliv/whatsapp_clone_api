import { Request, Response, NextFunction } from 'express'
import { Error_Unauthorized } from '@/handleSystemError'
import redisClient from '@/database/redis'

class AutenticateUserMiddleware {
	checkSession(req: Request, res: Response, next: NextFunction) {
		if (req.session.user?.id) {
			next()
		} else {
			throw new Error_Unauthorized('Usuario não autorizado')
		}
	}

	checkSocketSession(socket: any, next: any) {
		const sessionUser = socket.request.session?.user
		if (sessionUser?.id == null) {
			next(new Error('Não autorizado!'))
		} else {
			redisClient.hset(
				`userid:${sessionUser.username}`,

				'userid',
				sessionUser.userid,

				'username',
				sessionUser.username,
			)
			next()
		}
	}
}

export default new AutenticateUserMiddleware()
