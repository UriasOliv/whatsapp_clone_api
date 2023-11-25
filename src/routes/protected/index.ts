import { Router } from 'express'
const router = Router()

import userRoutes from './userRoutes'

router.use('/user', userRoutes)

export default router
