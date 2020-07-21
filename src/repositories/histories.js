import models from '../models'
export default {
    // CREATE
    store: async (data) => await models.Histories.create(data),

    // READ
    all: async () => await models.Histories.findAll(),

    findById: async (id) => await models.Histories.findByPk(id),
    findAllByUserId: async (user_id) => await models.Histories.findAll({
        where:{userId: user_id}
    }),
    // UPDATE
    // DELETE
}