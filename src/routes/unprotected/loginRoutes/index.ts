import { Router } from 'express'
const router = Router()

import loginController from '../../../controllers/loginController'
import attempLoginMiddleware from '@/middlewares/attempLoginMiddleware'

router.get('/login', loginController.checkToken)
router.post(
	'/login',
	attempLoginMiddleware.rateLimiter,
	loginController.doLogin,
)
router.post('/register', loginController.register)

export default router
