'use strict'

module.exports = (sequelize, DataTypes) => {
	const Histories = sequelize.define('Histories', {
		id:{
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		keyword:{
			type: DataTypes.STRING(30),
			allowNull: false,
		},
		userId:{
			type: DataTypes.STRING(30),
			allowNull: false,
		},
	}, {
		tableName: 'histories',
		timestamps: false,
	})

	Histories.associate = function (models) {

	}
	// hooks
	return Histories
}
