import { Socket } from 'socket.io'
import { responseError, Response } from './responseSocket'

export default function checkSocketSession(
	socket: Socket,
	cb: (obj: Response) => void,
) {
	if (socket.request.session?.id == null) {
		cb(responseError('Usuario não autorizado'))
	}
}
