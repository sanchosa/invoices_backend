const Sequelize = require(`sequelize`)
const logger = require(`./log4js`)

const log = function(message, time) {
    logger.debug(`Sequelize logging:`);
    if (time !== undefined) {
        logger.debug(message, `${time}ms`);
    } else {
        logger.debug(message);
    }
};

const sequelize = new Sequelize(`cbsorders`, `root`, `123456`, {
    host: `127.0.0.1`,
    dialect: `mysql`,
    timezone: `+06:00`,
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
        handleDisconnect: true
    },

    logging: log,
    benchmark: true
})

async function test() {
	await sequelize.authenticate()
	console.info(`Connection to database ('${db}') has been established successfully.`)
}
test()
module.exports = sequelize
