import { SessionProps } from '@types/express'

declare namespace FriendControllerTypes {
	class FriendServiceClass {
		async addFriend(friendName: string, session: SessionProps): Promise<string>
	}
}
