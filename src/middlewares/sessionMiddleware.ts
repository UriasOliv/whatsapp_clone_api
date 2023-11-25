import RedisStore from 'connect-redis'
import session from 'express-session'
import redis from '@/database/redis'
import { Socket } from 'socket.io'

const redisClient = redis

class SessionMiddleware {
	session: any
	cors: { origin: string; credentials: boolean }

	constructor() {
		this.session = session({
			store: new RedisStore({ client: redisClient }),
			secret: process.env.SECRET_TOKEN,
			cookie: {
				secure: process.env.NODE_ENV === 'production' ? true : 'auto',
				sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
				httpOnly: true,
				maxAge: 3 * 60 * 60 * 1000,
			},
			name: 'sid',
			resave: false,
			saveUninitialized: false,
		})

		this.cors = {
			origin: 'http://localhost:5173',
			credentials: true,
		}
	}

	sessionConfig() {
		return this.session
	}

	corsConfig() {
		return this.cors
	}
}

export default new SessionMiddleware()
