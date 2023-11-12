import 'express-session'

declare namespace Express {
	export interface Request {
		teste: string
	}
}

declare module 'express-session' {
	export interface SessionData {
		user: {
			id: number
			username: string
		}
	}
}
