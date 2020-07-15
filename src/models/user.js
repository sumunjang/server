'use strict'

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		id:{
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		nickname:{
			type: DataTypes.STRING(20),
			allowNull: false,
		},
		password:{
			type: DataTypes.STRING(20),
			allowNull: false,
		},
		name:{
			type: DataTypes.STRING(20),
			allowNull: false,
		},
	}, {
		tableName: 'users',
		timestamps: false,
	})

	User.associate = function (models) {
		// associations
	}

	// hooks

	return User
}
