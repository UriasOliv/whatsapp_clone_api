import { Request, Response, NextFunction } from 'express'
import handleSystemErrors from '../utils/handleSystemErrors'

export const errorMiddleware = (
	error: Error & handleSystemErrors,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.error(error.message)
	const statusCode = error.statusCode || 500
	const message = error.statusCode ? error.message : 'Erro Interno do Servidor'

	res.status(statusCode).json({ message })
}
