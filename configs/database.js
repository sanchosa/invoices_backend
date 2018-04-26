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

const sequelize = new Sequelize(`invoices`, `test`, `test123test`, {
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
	sequelize.authenticate()
        .then(result => 
            logger.info(`Connection to database 'invoices' has been established successfully.`)
        )
        .catch(err =>
            logger.error(`Error connecting to database 'invoices'. ${err}`)
        )
}
test()
module.exports = sequelize
