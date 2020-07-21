'use strict'

module.exports = (sequelize, DataTypes) => {
	const visit = sequelize.define('visit', {
		id:{
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
	}, {
		tableName: 'visits',
		timestamps: true,
	})

	visit.associate = function (models) {
		visit.hasMany(models.Answer)
		visit.belongsTo(models.User, {
			foreignKey: "UserId"
		})
		visit.belongsTo(models.Place, {
			foreignKey: "PlaceId"
		})
	}

	// hooks
	return visit
}
