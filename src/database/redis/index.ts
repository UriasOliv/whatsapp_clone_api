import { SessionProps } from '@/customTypes/express'
import Redis from 'ioredis'

const instanceRedis = new Redis()

export class RedisController
	implements RedisControllerTypes.RedisControllerClass
{
	async incrementRateLimiter(ip: string) {
		const keyName = `rate_limiter:${ip}`

		return await instanceRedis.multi().incr(keyName).expire(keyName, 60).exec()
	}

	async setUserOnline(session: SessionProps, isOnline: boolean) {
		await instanceRedis.hset(
			`userid:${session.user.username}`,
			'connected',
			isOnline.toString(),
		)
	}
}

export default instanceRedis
