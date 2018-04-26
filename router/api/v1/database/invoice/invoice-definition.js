'use strict'

module.exports = (sequelize, DataTypes) =>
    sequelize.define(`invoice`, {
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
            allowNull: false
        },
        supplyDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            field: `supply_date`
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