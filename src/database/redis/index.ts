import Redis from 'ioredis'

const instanceRedis = new Redis()

export class RedisController
	implements RedisControllerTypes.RedisControllerClass
{
	async incrementRateLimiter(ip: string) {
		const keyName = `rate_limiter:${ip}`

		return await instanceRedis.multi().incr(keyName).expire(keyName, 60).exec()
	}
}

export default instanceRedis
