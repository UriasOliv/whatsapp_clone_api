import 'dotenv/config'
import 'express-async-errors'
import routes from './routes'
import session from 'express-session'
import express from 'express'
import compression from 'compression'
import { Server } from 'socket.io'
import helmet from 'helmet'
import cors from 'cors'
import { errorMiddleware } from './middlewares/errorMiddleware'

const app = express()

const server = require('http').createServer(app)

const io = new Server(server, {
	cors: {
		origin: '*',
		credentials: true,
	},
})

io.on('connect', (socket) => {})

app.use(helmet())
app.use(compression())
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	}),
)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
	session({
		secret: process.env.SECRET_TOKEN,
		cookie: {
			secure: process.env.ENVIRONMENT === 'production' ? true : 'auto',
			sameSite: process.env.ENVIRONMENT === 'production' ? 'strict' : 'lax',
			httpOnly: true,
			maxAge: 120_000, // 1 * 60 * 60 * 1000
		},
		name: 'sid',
		resave: false,
		saveUninitialized: false,
	}),
)

app.use(routes)
app.use(errorMiddleware)

app.listen(80, () => {
	console.log('listening on port 80')
})
