declare namespace SocketControllerTypes {
	/**
	 * Todas as funções dessa classe devem ser usadas `EXCLUSIVAMENTE` no socket.io
	 */
	class SocketControllerClass {
		/**
		 * Essa função e responsavel por definir todos os eventos do socket que acabou de conectar
		 */
		onConnection(socket: Socket)
	}
}
