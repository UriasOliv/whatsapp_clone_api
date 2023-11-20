export interface Response {
	done: boolean
	errorMsg?: string
}

export const responseOK = (): Omit<Response, 'errorMsg'> => {
	return { done: true }
}

export const responseError = (errorMsg: string): Response => {
	return { done: false, errorMsg }
}
