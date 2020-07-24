import models from '../models'
export default {
    // CREATE
    store: async (data) => await models.question.create(data),

    // READ
    all: async () => await models.question.findAll(),

    findById: async (id) => await models.question.findByPk(id),
    findAllByPlaceId: async (place_id) => await models.question.findAll({
        where:{
            PlaceId:place_id
        }
    }),
    // UPDATE
    updateByQuestionId: async (question, questionid) => await models.question.update(
        { question: question,},
        { where: { id: questionid } }
    ),
    // DELETE
    deleteByQuestionId: async (questionId) => await models.question.destroy(
        { where: { id: questionId }}
    )
}