import models from '../models'
export default {
    // CREATE
    store: async (data) => await models.User.create(data),

    // READ
    all: async () => await models.User.findAll(),

    findById: async (id) => await models.User.findByPk(id),
    findByNickname: async (nickname) => await models.User.findOne({
        where: {
            nickname,
        }
    })
    // UPDATE
    // DELETE
}