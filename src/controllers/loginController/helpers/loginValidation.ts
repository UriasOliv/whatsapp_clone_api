import * as T from '../types'
import * as yupSchema from './yupSchema'
import { Error_Unauthorized } from '@/handleSystemError'

export async function validateLogin(data: T.BodyDoLogin) {
	try {
		await yupSchema.formLoginSchema.validate(data)
	} catch (error) {
		if (error instanceof Error)
			throw new Error_Unauthorized(
				`Ocorreu um erro na validação: ${error.message}`,
			)
	}
}
