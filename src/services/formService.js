import questionRepo from "../repositories/question";
import answerRepo from "../repositories/answer";
import visitRepo from "../repositories/visit"
import jwt from "jsonwebtoken";
import placeRepo from "../repositories/place";

exports.getMySubmits = async (req, res, next) => {
    const token = req.headers.authorization.split('Bearer ')[1];
    const userId = jwt.verify(token, process.env.JWT_SECRET).user_id;
    visitRepo.findAllDescByuserId(userId)
        .then(result => {
            return result.map(function (value, index) {
                var submitid = value.id;
                var placeid = value.Place.id;
                var placeName = value.Place.name;
                var address = value.Place.address;
                var submitdate = value.createdAt;
                return {placeid, submitid, placeName, address, submitdate}
            })
        }).then(list => res.json(list))
};

exports.getFormInPlace = async (req, res, next) => {
    const token = req.headers.authorization.split('Bearer ')[1];
    const userId = jwt.verify(token, process.env.JWT_SECRET).user_id;

    visitRepo.findLatestOneByuserIdAndPlaceId(userId, req.params.placeid)
        .then(visit => {
            console.log(visit[0])
            if (visit[0] === undefined) {
                questionRepo.findAllByPlaceId(req.params.placeid)
                    .then(result => {
                            return result.map(function (value, index) {
                                var questionid = value.id;
                                var question = value.question;
                                return {questionid, question}
                            })
                        }
                    ).then(requestForm => {
                    res.json({requestForm})
                })
            } else {
                answerRepo.findByVisitId(visit[0].id)
                    .then(
                        answer => {
                            return answer.map(function (value, index) {
                                var questionid = value.questionId;
                                var answer = value.answer;
                                var question = value.dataValues.question.question;
                                return {questionid, question, answer}
                            })
                        })
                    .then(requestForm => res.json({requestForm}))
            }
        })


};

exports.getMySubmit = async (req, res, next) => {
    // req.params.placeid;
    // req.params.submitid;
    var submittime;
    var oversea;
    var cough;
    var sore;
    var dyspnoea;
    var touch;
    visitRepo.findById(req.params.submitid)
        .then(
            visit => {
                oversea = visit.oversea
                cough = visit.cough
                sore = visit.sore
                dyspnoea = visit.dyspnoea
                touch = visit.touch
            }
        ).then(
        answerRepo.findByVisitId(req.params.submitid)
            .then(
                answer => {
                    return answer.map(function (value, index) {
                        var questionid = value.questionId;
                        var answer = value.answer;
                        var question = value.dataValues.question.question;
                        submittime = value.createdAt;
                        return {questionid, question, answer}
                    })
                })
            .then((requestForm, answer) => {
                var fixedForm = {oversea, cough, sore, dyspnoea, touch}
                res.json({submittime, requestForm, fixedForm})
            }))
};

exports.submitForm = async (req, res, next) => {
    const token = req.headers.authorization.split('Bearer ')[1];
    const userId = jwt.verify(token, process.env.JWT_SECRET).user_id;
    visitRepo.store({
        id: null,
        PlaceId: req.params.placeid,
        userId: userId,
        oversea: req.body.fixedForm.oversea,
        cough: req.body.fixedForm.cough,
        sore: req.body.fixedForm.sore,
        dyspnoea: req.body.fixedForm.dyspnoea,
        touch: req.body.fixedForm.touch
    })
        .then(
            visit => {
                req.body.requestForm.map(function (value, index) {
                    answerRepo.store({
                        id: null,
                        answer: value.answer,
                        questionId: value.questionid,
                        visitId: visit.id,
                    })
                })
                // websocket part
                try {
                    const socketId = req.app.get('clients').get(visit.dataValues.PlaceId);
                    const newPerson = {
                        name: req.body.username,
                        date: visit.dataValues.createdAt,
                        access: true
                    };
                    req.app.get('io').to(socketId).emit('listenServer', newPerson);
                } catch (error) {
                    console.error(error);
                }
            }
        )
        .then(res.json())
};

exports.updateForm = async (req, res, next) => {
    // req.params.placeid;
    questionRepo.findAllByPlaceId(req.params.placeid)
        .then(async result => {
                var j = 0;
                for (var i = 0; i < result.length; i++) {
                    if (result[i].id != req.body.data[j].questionid)
                        await questionRepo.deleteByQuestionId(result[i].id)
                    if (result[i].id == req.body.data[j].questionid) {
                        if (result[i].question != req.body.data[j].question)
                            await questionRepo.updateByQuestionId(req.body.data[j].question, result[i].id)
                        j++;
                    }
                }
                for (var i = j; i < req.body.data.length; i++)
                    await questionRepo.store({id: null, question: req.body.data[i].question, PlaceId: req.params.placeid})
            }
        ).then(async ()=>await questionRepo.findAllByPlaceId(req.params.placeid)
        .then(result => {
                return result.map(function (value, index) {
                    var questionid = value.id;
                    var question = value.question;
                    return {questionid, question}
                })
            }
        ).then(requestForm => res.json({requestForm})))
};