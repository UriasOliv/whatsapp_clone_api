import pool from '@/database/index'
import { Error_BadRequest } from '@/handleSystemError'
import { FriendControllerTypes } from '../types'
import { SessionProps } from '@/customTypes/express'

class FriendService implements FriendControllerTypes.FriendServiceClass {
	async getFriends(session: SessionProps) {
		const resultIds = await pool
			.query(
				'SELECT * FROM friend_list f WHERE f.person1 = $1 OR f.person2 = $1',
				[session.user.id],
			)
			.then((r) => r?.rows)

		const treatedIdsFriends = resultIds.map((idFriend) =>
			idFriend.person1 == session.user.id ? idFriend.person2 : idFriend.person1,
		)

		return await pool
			.query(
				`SELECT username, userid FROM users WHERE id IN(${treatedIdsFriends.join(
					',',
				)})`,
			)
			.then((r) => r?.rows)
	}

	async addFriend(friendName: string, session: SessionProps) {
		const userFriend = await pool
			.query('SELECT id FROM users WHERE username = $1', [friendName])
			.then((r) => r?.rows[0])

		if (!userFriend) throw new Error_BadRequest('Usuario não encontrado')

		if (userFriend.id === session.user.id)
			throw new Error_BadRequest('Não pode adicionar voce mesmo!')

		const relationship = await pool
			.query(
				'SELECT 1 from friend_list where person1 = $1 AND person2 = $2 OR person1 = $2 AND person2 = $1 LIMIT 1',
				[userFriend.id, session.user.id],
			)
			.then((r) => r?.rows[0])

		if (relationship)
			throw new Error_BadRequest('Voçê já tem esse usuario como amigo!')

		await pool.query(
			'INSERT INTO friend_list (person1, person2) VALUES ($1,$2)',
			[userFriend.id, session.user.id],
		)

		return 'Usuario adicionado com sucesso!'
	}
}

export default new FriendService()
