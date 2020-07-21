import models from '../models'
import sequelize from 'sequelize'
const Op = sequelize.Op;
export default {
    // CREATE
    store: async (data) => await models.Place.create(data),

    // READ
    all: async () => await models.Place.findAll(),

    findById: async (id) => await models.Place.findByPk(id),
    findByPlaceId: async (PlaceId) => await models.Place.findOne({
        where: {
            id: PlaceId,
        }
    }),
    searchByPlaceName: async (keyword) => await models.Place.findAll({
        where: {
            name: {
                [Op.like]: "%" + keyword + "%"
            }
        }
    })
    // UPDATE
    // DELETE
}