'use strict'

const {sequelize} = require(`$configs`)
const Invoice = sequelize.import(`invoice-definition`)

const fields = [`number`, `date`, `supplyDate`, `comment`] 

Invoice.tryCreate = data => Invoice.create(data, {fields})

Invoice.tryUpdate = ({id, ...data}) => Invoice.update(data, {where : {id}, fields})

module.exports = Invoice