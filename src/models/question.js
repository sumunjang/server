'use strict'

module.exports = (sequelize, DataTypes) => {
	const question = sequelize.define('question', {
		id:{
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		question:{
			type: DataTypes.STRING(30),
			allowNull: false,
		},
	}, {
		tableName: 'questions',
		timestamps: false,
	})

	question.associate = function (models) {
		question.hasMany(models.Answer)
	}

	// hooks
	return question
}
