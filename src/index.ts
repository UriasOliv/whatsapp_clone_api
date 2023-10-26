import routes from './routes'
import express from 'express'
import { Server } from 'socket.io'
import helmet from 'helmet'

const app = express()

const server = require('http').createServer(app)

const io = new Server(server, {
	cors: {
		origin: 'https://localhost',
		credentials: true,
	},
})

io.on('connect', (socket) => {})

app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes)

app.listen(80, () => {
	console.log('listening on port 80')
})
