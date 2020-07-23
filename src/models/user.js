'use strict';
import bcrypt from 'bcrypt'

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		id:{
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id:{
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
		placeId:{
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	}, {
		tableName: 'users',
		timestamps: false,
	});

	User.associate = function (models) {

	};

	// hooks
	User.beforeSave(async (user, options) => {
		if (user.changed('password')) {
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(user.password, salt);
		}
	});
	return User
};
