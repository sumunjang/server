import placeRepo from "../repositories/place"
import userRepo from "../repositories/user";
import historyRepo from "../repositories/histories";
import jwt from "jsonwebtoken";



exports.searchPlace = async (req, res, next) => {
    const token = req.headers.authorization.split('Bearer ')[1];
    const userId = jwt.verify(token, process.env.JWT_SECRET).user_id;
    placeRepo.searchByPlaceName(req.params.keyword)
        .then(
            result => {
                return result.map(function (value, index) {
                    var placeid = value.id;
                    var placename = value.name;
                    var address = value.address;
                    return {placeid, placename, address}
                })
            }
        )
        .then(historyRepo.store({id:null, keyword:req.params.keyword, userId: userId}))
        .then(response => res.json(response))
        .catch(err => res.status(400).json())
};

exports.getHistory = async (req, res, next) => {
    const token = req.headers.authorization.split('Bearer ')[1];
    const userId = jwt.verify(token, process.env.JWT_SECRET).user_id;
    historyRepo.findAllByUserId(userId)
        .then(result => {
            console.log(result)
                return result.map(function (value, index) {
                    var keyword = value.keyword;
                    return {keyword}
                })
            }
        ).then(response => res.json(response))
        .catch(err => res.status(400).json())
};

exports.getPlaceInfo = async (req, res, next) => {
    placeRepo.findById(req.params.placeid)
        .then(
            result => {
                var placeid = result.id;
                var placename = result.name;
                var address = result.address;
                res.json({placeid, placename, address})
            }
        ).catch(err => res.status(400).json())
};

exports.registerPlace = async (req, res, next) => {
    placeRepo.store({
        id: null,
        name: req.body.placeName,
        address: req.body.address
    })
        .then( place =>
            userRepo.store({
                user_id: req.body.userid,
                password: req.body.password,
                name: req.body.name,
                placeId: place.id
            })
        )
        .then(res.json(req.body.userid))
};