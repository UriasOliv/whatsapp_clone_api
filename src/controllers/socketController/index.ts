import { Socket } from 'socket.io'
import socketEvents from './events'

class SocketController implements SocketControllerTypes.SocketControllerClass {
	onConnection(socket: Socket) {
		socket.use((__, next) =>
			socket.request.session.reload((err) => {
				if (err) {
					socket.conn.close()
					next(new Error('Usuario Não Autorizado'))
				} else {
					next()
				}
			}),
		)
	}
}

export default new SocketController()
