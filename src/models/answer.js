'use strict'
import bcrypt from 'bcrypt'

module.exports = (sequelize, DataTypes) => {
	const Answer = sequelize.define('Answer', {
		id:{
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		answer:{
			type: DataTypes.STRING(30),
			allowNull: false,
		},
	}, {
		tableName: 'answers',
		timestamps: false,
	})

	Answer.associate = function (models) {

	}

	// hooks
	return Answer
}
