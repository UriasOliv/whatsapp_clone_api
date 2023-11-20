declare namespace SocketControllerTypes {
	/**
	 * Todas as funções dessa classe devem ser usadas `EXCLUSIVAMENTE` no socket.io
	 */
	class SocketControllerClass {
		/**
		 * Função responsavel por adicionar um amigo.
		 * @param friendName Nome do usuario do usuario
		 * @param cb Callback que envia responde o usuario
		 */
		addFriend(friendName: string, cb: (obj: any) => void)
	}
}
