import { Request, Response, NextFunction } from 'express'
import {
	Error_Forbidden,
	Error_TooManyRequests,
} from '@/utils/handleSystemErrors'

import { RedisController } from '@/database/redis'

class AttempLoginMiddleware {
	async rateLimiter(req: Request, res: Response, next: NextFunction) {
		const ip = req.socket.remoteAddress

		if (typeof ip === 'string') {
			const response = await new RedisController().incrementRateLimiter(ip)
			const amountRequests = response?.at(0)?.[1] as number

			if (amountRequests > 5)
				throw new Error_TooManyRequests('Várias tentativas, tente mais tarde!')

			next()
		} else {
			throw new Error_Forbidden('Ocorreu um erro')
		}
	}
}

export default new AttempLoginMiddleware()
