import 'express-session'

declare namespace Express {
	export interface Request {
		teste: string
	}
}

declare module 'http' {
	interface IncomingMessage {
		session: import('express-session').Session & {
			user: {
				id: number
				userid: string
				username: string
			}
		}
	}
}

// declare module 'express-session' {
// 	export interface SessionData {
// 		user: {
// 			id: number
// 			username: string
// 		}
// 	}
// }
