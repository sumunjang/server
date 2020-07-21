'use strict'

module.exports = (sequelize, DataTypes) => {
	const Place = sequelize.define('Place', {
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
		tableName: 'places',
		timestamps: false,
	})

	Place.associate = function (models) {
		Place.hasMany(models.visit)
	}

	// hooks
	return Place
}
