import models from '../models'

export default {
    // CREATE
    store: async (data) => await models.visit.create(data),

    // READ
    all: async () => await models.visit.findAll(),

    findById: async (id) => await models.visit.findByPk(id),
    findByuserId: async (userId) => await models.visit.findOne({
        where:{
            userId:userId
        },
         include:[
            {model: models.Place, required:true}
            ]
    }),
    findAllByuserId: async (size, userId) => await models.visit.findAll({
        limit: size,
        where:{
          userId:userId
        },
        include:[
            {model: models.Place, required:true}
        ]
    }),
    findLatestOneByuserId: async (userId) => await models.visit.findAll({
    limit: 1,
        order:[['createdAt','DESC']],
        where:{
            userId:userId
        },
    include:[
        {model: models.Place, required:true}
    ]
}),    findLatestOneByuserIdAndPlaceId: async (userId,placeId) => await models.visit.findAll({
        limit: 1,
        order:[['createdAt','DESC']],
        where:{
            userId:userId
        },
        include:[
            {model: models.Place, required:true, where:{id:placeId}}
        ]
    }),
    findAllDescByuserId: async (userId) => await models.visit.findAll({
        order:[['createdAt','DESC']],
        where:{
            userId:userId
        },
        include:[
            {model: models.Place, required:true}
        ]
    }),
    // UPDATE
    // DELETE
}