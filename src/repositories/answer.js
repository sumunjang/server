import models from '../models'
export default {
    // CREATE
    store: async (data) => await models.Answer.create(data),

    // READ
    all: async () => await models.Answer.findAll(),

    findById: async (id) => await models.Answer.findByPk(id),
    findByVisitId: async (visitId)=> await models.Answer.findAll({
        where:{
            visitId:visitId
        },
        include:[
            {model: models.question, required:true},
        ]
    }),
    // UPDATE
    // DELETE
}