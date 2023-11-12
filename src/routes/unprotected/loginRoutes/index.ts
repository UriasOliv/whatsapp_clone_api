import { Router } from 'express'
const router = Router()

import loginController from '../../../controllers/loginController'

router.get('/login', loginController.checkToken)
router.post('/login', loginController.doLogin)
router.post('/register', loginController.register)

export default router
