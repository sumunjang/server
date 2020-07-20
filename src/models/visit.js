'use strict'
import bcrypt from 'bcrypt'

module.exports = (sequelize, DataTypes) => {
	const visit = sequelize.define('visit', {
		id:{
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name:{
			type: DataTypes.STRING(30),
			allowNull: false,
		},
		address:{
			type: DataTypes.STRING(50),
			allowNull: false,
		},
	}, {
		tableName: 'visits',
		timestamps: true,
	})

	visit.associate = function (models) {
		visit.hasMany(models.Answer)
	}

	// hooks
	return visit
}
