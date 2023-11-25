import 'express-session'

declare namespace Express {
	export interface Request {
		teste: string
	}
}

export interface SessionProps {
	user: {
		id: number
		userid: string
		username: string
	}
}

declare module 'http' {
	interface IncomingMessage {
		session: import('express-session').Session & SessionProps
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
