require(`sexy-require`)
const logger = require(`$configs/log4js`)
const {
	getPort,
	onError,
	onListening
} = require(`./common`)

process.env.NODE_ENV = `production`
const app = require(`../index`)
const http = require(`http`)
const server = http.createServer(app.callback())
const port = process.env.npm_package_config_port

logger.info(`Production mode`)
logger.info(`Listening on ${port}`)

server.listen(port)
server.setTimeout(125000)
server.on(`error`, onError(port))