namespace NodeJS {
	interface ProcessEnv {
		// jsonwebtoken
		SECRET_TOKEN: string

		// PostgreSQL
		DATABASE_NAME: string
		DATABASE_HOST: string
		DATABASE_PASSWORD: string
		DATABASE_USER: string
		DATABASE_PORT: number
	}
}
