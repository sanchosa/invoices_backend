const log4js = require(`log4js`)
const config = {
	appenders: {
		console: {
			type: `console`,
			level: `ALL`
		}, 
		file: {
			type: `file`,
			filename: `./logs/log.log`,
			level: `ALL`,
			maxLogSize: 204800,
			backups: 10
		}
	},
	categories: {
		default: {
			appenders: [ `console`, `file` ],
			level: `debug`
		}
	}
}
log4js.configure(config)

module.exports = log4js.getLogger()
