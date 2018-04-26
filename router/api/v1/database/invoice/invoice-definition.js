'use strict'
const {getValidDate, convertDate} = require(`$misc`)

module.exports = function(sequelize, DataTypes) {
    return sequelize.define(`invoice`, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        number: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            set: function(val) {
                return this.setDataValue(`date`, convertDate(val, `DD-MM-YYYY`, `YYYY-MM-DD`))
            },
            get: function() {
                const data = this.getDataValue(`date`)
                return getValidDate(data, `DD-MM-YYYY`)
            }
        },
        supplyDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            field: `supply_date`,
            set: function(val) {
                return this.setDataValue(`supplyDate`, convertDate(val, `DD-MM-YYYY`, `YYYY-MM-DD`))
            },
            get: function() {
                const data = this.getDataValue(`supplyDate`)
                return getValidDate(data, `DD-MM-YYYY`)
                // getValidDate(this.getDataValue(`supplyDate`), `DD-MM-YYYY`)
            }
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,
        tableName: 'invoices'
    })
}