const paths = require(`sexy-require`)
const {logger} = require(`$configs`)
const {
	getPort,
	onError,
	onListening
} = require(`./common`)

process.env.NODE_ENV = `development`
const app = require(`$home`)
const http = require(`http`)
const server = http.createServer(app.callback())
const port = getPort(3000)

logger.info(`Development mode port: ${port}`)

server.listen(port)
server.setTimeout(125000)
server.on(`error`, onError(port))
server.on(`listening`, onListening(server.address()))