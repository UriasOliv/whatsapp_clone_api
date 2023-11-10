import jwt from 'jsonwebtoken'

class Autenticate {
	createToken(data: any) {
		return jwt.sign(data, process.env.SECRET_TOKEN, { expiresIn: '1d' })
	}

	checkToken(token: string) {
		return jwt.verify(token, process.env.SECRET_TOKEN)
	}
}

export default new Autenticate()
