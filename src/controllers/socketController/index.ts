import { responseOK, responseError, Response } from './helper/responseSocket'

class SocketController implements SocketControllerTypes.SocketControllerClass {
	addFriend(friendName: string, cb: (obj: Response) => void) {
		cb(responseError('Teste Error'))
	}
}

export default new SocketController()
