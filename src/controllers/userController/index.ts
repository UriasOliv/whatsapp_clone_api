import { Request, Response } from 'express'
import friendService from './services/friendService'

class UserController {
	async addFriend(req: Request, res: Response) {
		res.json(await friendService.addFriend(req.body.friendName, req.session))
	}

	async getUserFriends(req: Request, res: Response) {
		res.json(await friendService.getFriends(req.session))
	}
}

export default new UserController()
