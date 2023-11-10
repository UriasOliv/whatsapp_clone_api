import { Router } from 'express'
const router = Router()

import loginRoutes from './loginRoutes'

router.use('/autenticate', loginRoutes)

export default router
