declare namespace RedisControllerTypes {
	class RedisControllerClass {
		/**
		 * Essa função salva o ip do usuario no Redis e incrementa tentativas.
		 *
		 * Se esse limite de tentativas for atingido as requisições do IP será bloqueada por um periodo de tempo.
		 * @param ip IP do usuario a ser salvo no Redis
		 */
		async incrementRateLimiter(ip: string): Promise<RedisCommander>
	}
}
