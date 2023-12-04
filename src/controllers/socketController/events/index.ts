import { Socket } from 'socket.io'
import { RedisController } from '@/database/redis'

class SocketEvents {
	async onDisconnect(socket: Socket, _reason: string, friendChatIds: string[]) {
		new RedisController().setUserOnline(socket.request.session, false)

		socket
			.to(friendChatIds)
			.emit('connected', false, socket.request.session.user.username)
	}
}

export default new SocketEvents()
