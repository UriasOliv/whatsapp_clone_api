import 'dotenv/config'
import 'express-async-errors'
import routes from './routes'
import express from 'express'
import compression from 'compression'
import { Server } from 'socket.io'
import helmet from 'helmet'
import cors from 'cors'
import { errorMiddleware } from './middlewares/errorMiddleware'
import sessionMiddleware from '@/middlewares/sessionMiddleware'
import { createServer } from 'http'
import autenticateUserMiddleware from './middlewares/autenticateUserMiddleware'
import socketController from '@/controllers/socketController'

const app = express()
const server = createServer(app)

const io = new Server(server, {
	cors: sessionMiddleware.corsConfig(),
})

app.use(helmet())
app.use(compression())
app.use(cors(sessionMiddleware.corsConfig()))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(sessionMiddleware.sessionConfig())

app.use(routes)
app.use(errorMiddleware)

io.engine.use(sessionMiddleware.sessionConfig())
io.use(autenticateUserMiddleware.checkSocketSession)
io.on('connection', socketController.onConnection)

server.listen(80, () => {
	console.log('listening on port 80')
})
