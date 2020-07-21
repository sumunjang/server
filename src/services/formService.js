import questionRepo from "../repositories/question";
import answerRepo from "../repositories/answer";
import visitRepo from "../repositories/visit"
import jwt from "jsonwebtoken";

exports.getMySubmits = async (req, res, next) => {
    // req.params.keyword;
};

exports.getFormInPlace = async (req, res, next) => {
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
};

exports.getMySubmit = async (req, res, next) => {
    // req.params.placeid;
    // req.params.submitid;
    var submittime;
    answerRepo.findByVisitId(req.params.submitid)
        .then(
            answer => {
                return answer.map(function(value,index){
                    console.log(value);
                    var questionid = value.questionId;
                    var answer = value.answer;
                    var question = value.dataValues.question.question;
                    submittime =value.createdAt;
                    return {questionid, question, answer}
                })
            })
        .then( (requestForm, answer) =>{
            res.json({submittime, requestForm})
        })
};

exports.submitForm = async (req, res, next) => {
    const token = req.headers.authorization.split('Bearer ')[1];
    const userId = jwt.verify(token, process.env.JWT_SECRET).user_id;
    visitRepo.store({id:null, PlaceId:req.params.placeid, userId:userId})
        .then(
            visit => {
                req.body.requestForm.map(function (value, index) {
                        answerRepo.store({id: null, answer: value.answer, questionId: value.questionid, visitId: visit.id})
                    })
            })
        .then(res.json())
};

exports.updateForm = async (req, res, next) => {
    // req.params.placeid;
};