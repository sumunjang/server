'use strict'

module.exports = (sequelize, DataTypes) => {
	const visit = sequelize.define('visit', {
		id:{
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		userId:{
			type: DataTypes.STRING(20),
			allowNull: false,
		},
		oversea:{
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		cough:{
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		sore:{
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		dyspnoea:{
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		touch:{
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	}, {
		tableName: 'visits',
		timestamps: true,
	})

	visit.associate = function (models) {
		visit.hasMany(models.Answer)
		visit.belongsTo(models.Place, {
			foreignKey: "PlaceId"
		})
	}

	// hooks
	return visit
}
