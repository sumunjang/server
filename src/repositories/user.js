import models from '../models'

export default {
    // CREATE
    store: async (data) => await models.User.create(data),

    // READ
    all: async () => await models.User.findAll(),

    findById: async (id) => await models.User.findByPk(id),
    findByUserId: async (user_id) => await models.User.findOne({
        where: {
            user_id,
        }
    }),
    // UPDATE
    updateByUserId: async (profile, user_id) => await models.User.update(
        {
            name: profile.name,
        },
        {
            where: {
                user_id: user_id
            }
        }
    )

    // DELETE
}