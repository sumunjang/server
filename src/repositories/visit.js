import models from '../models'

export default {
    // CREATE
    store: async (data) => await models.visit.create(data),

    // READ
    all: async () => await models.visit.findAll(),

    findById: async (id) => await models.visit.findByPk(id),
    findByuserId: async (userId) => await models.visit.findOne({
         include:[
            {model: models.User, required:true, where:{user_id:userId}},
            {model: models.Place, required:true}
            ]
    }),
    findAllByuserId: async (size, userId) => await models.visit.findAll({
        limit: size,
        include:[
            {model: models.User, required:true, where:{user_id:userId}},
            {model: models.Place, required:true}
        ]
    }),
    findLatestOneByuserId: async (userId) => await models.visit.findAll({
    limit: 1,
        order:[['createdAt','DESC']],
    include:[
        {model: models.User, required:true, where:{user_id:userId}},
        {model: models.Place, required:true}
    ]
}),
    // UPDATE
    // DELETE
}