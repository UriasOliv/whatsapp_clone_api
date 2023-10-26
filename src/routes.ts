import { Router, Request, Response } from 'express'
const routes = Router()

// routes.use('/')
// routes.use('/auth')

routes.get('/', (req: Request, res: Response) => {
	res.json('hi')
})

export default routes
