export default class handleSystemErrors extends Error {
	statusCode: number

	constructor(statusCode: number, message: string) {
		super(message)
		this.statusCode = statusCode
	}
}

export class Error_BadRequest extends handleSystemErrors {
	constructor(message: string) {
		super(400, message)
	}
}

export class Error_Unauthorized extends handleSystemErrors {
	constructor(message: string) {
		super(401, message)
	}
}

export class Error_NotFound extends handleSystemErrors {
	constructor(message: string) {
		super(404, message)
	}
}

export class Error_InternalServerError extends handleSystemErrors {
	constructor(message: string) {
		super(500, message)
	}
}
