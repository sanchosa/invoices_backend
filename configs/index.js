const logger = require(`./log4js`)
const sequelize = require(`./database`)
const koaLogger = require(`./koa-logger`)
const dns = require(`./dns`)

module.exports = {
	logger,
	sequelize,
	koaLogger,
	dns
}