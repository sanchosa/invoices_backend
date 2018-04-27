'use strict'

const {sequelize} = require(`$configs`)
const Invoice = sequelize.import(`invoice-definition`)

const fields = [`number`, `date`, `supplyDate`, `comment`] 

Invoice.getAll = ({field, order}) => {
	let sort = null
	if (field && order && field in Invoice.attributes) {
		const direction = order === `descend` ? `DESC` : `ASC`
		sort = [[field, direction]]
	}
	return Invoice.findAll({order: sort})
}
Invoice.tryCreate = data => Invoice.create(data, {fields})
Invoice.tryUpdate = ({id, ...data}) => Invoice.update(data, {where : {id}, fields})
Invoice.delete = id => Invoice.destroy({where: {id}})

module.exports = Invoice