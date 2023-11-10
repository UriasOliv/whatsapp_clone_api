import { Router } from 'express'
const routes = Router()

import unprotectedRoutes from './routes/unprotected'
import protectedRoutes from './routes/protected'

routes.use('/', unprotectedRoutes)
routes.use('/auth', protectedRoutes)

export default routes
