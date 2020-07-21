'use strict'

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
		visitId:{
			type: DataTypes.STRING(30),
			allowNull: false,
		},
	}, {
		tableName: 'answers',
		timestamps: true,
	})

	Answer.associate = function (models) {
		Answer.belongsTo(models.question, {
			foreignKey: "questionId"
		})
	}

	// hooks
	return Answer
}
