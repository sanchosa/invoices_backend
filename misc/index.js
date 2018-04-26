const Sequelize = require(`sequelize`)
const {logger} = require(`$configs`)

const errorHandler = (ctx, mark = `Error:`, err) => {
	if (ctx) {
		if (err instanceof Sequelize.ValidationError) {
			logger.debug(err.message)
			err.errors.push(err.message)
			ctx.body = err
			ctx.status = 400
		}
		else {
			logger.error(mark, err)
			ctx.status = 500
		}
	}
	else {
		logger.error(mark, err)
	}
}
exports.errorHandler = errorHandler

// Общая функция выполнения переданной функции через обёртку Try-Catch
const tryCatch = async (myFunction, ctx, msg) => {
	try {
		await myFunction()
	}
	catch (err) {
		errorHandler(ctx, msg, err)
	}
}
exports.tryCatch = tryCatch