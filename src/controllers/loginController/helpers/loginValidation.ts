import { LoginControllerTypes } from '../types'
import * as yupSchema from './yupSchema'
import { Error_Unauthorized } from '@/handleSystemError'

export async function validateLogin(data: LoginControllerTypes.BodyDoLogin) {
	try {
		await yupSchema.formLoginSchema.validate(data)
	} catch (error) {
		if (error instanceof Error)
			throw new Error_Unauthorized(
				`Ocorreu um erro na validação: ${error.message}`,
			)
	}
}
