import { Socket } from 'socket.io'
import { RedisController } from '@/database/redis'
import friendService from '@/controllers/userController/services/friendService'
import socketEvents from './events'

class SocketController implements SocketControllerTypes.SocketControllerClass {
	async onConnection(socket: Socket) {
		const redisController = new RedisController()

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

		redisController.setUserOnline(socket.request.session, true) // Define o usuario como online

		const friendChatIds = await friendService
			.getChatIdsFriend(socket.request.session)
			.then((friends) => friends.map((friend) => friend.chat_id))

		socket.join(friendChatIds)

		if (friendChatIds.length > 0) {
			socket
				.to(friendChatIds)
				.emit('connected', true, socket.request.session.user.username)
		}

		socket.on('disconnecting', (reason) => {
			socketEvents.onDisconnect(socket, reason, friendChatIds)
		})
	}
}

export default new SocketController()
