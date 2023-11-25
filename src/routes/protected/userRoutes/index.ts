import { Router } from 'express'
const router = Router()

import userController from '@/controllers/userController'

router.get('/friend', userController.getUserFriends)
router.post('/friend', userController.addFriend)

export default router
