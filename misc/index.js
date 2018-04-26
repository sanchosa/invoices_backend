const Sequelize = require(`sequelize`)
const {logger} = require(`$configs`)
const moment = require(`moment`)

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

// Общая функция проверки массива имён необходимых свойств(params) в объекте данных(data)
// В случае отсутствия всех необходимых параметров в объекте выбрасывается ошибка sequelize.ValidationError(msg) 
const checkRequiredParams = ((data, params, msg = defaultSequelizeValidationMsg) => {
    let check = true;
    params.forEach(function(item) {
        if (item in data) {
            if ((data[item] == null)||(data[item] == ``)) {
                check = false
            }
        } else {
            check = false
        }
    });

    if (check) {
        return check 
    } else {
        throw new sequelize.ValidationError(msg);
    }
})
exports.checkRequiredParams = checkRequiredParams

// Функция получения корректной даты по формату
const getValidDate = ((data, format) => {
    if (data == null) {
        return data
    } else {
        return moment(data).format(format)
    }
})
exports.getValidDate = getValidDate

// Функция преобразования даты из формата в формат
const convertDate = (data, from, to) => {
    if (data == null) {
        return data
    } else {
        return moment(data, from).format(to)
    }
}
exports.convertDate = convertDate