import visitRepo from "../repositories/visit"
import jwt from "jsonwebtoken";

exports.getVisitList = async (req, res, next) => {
    const token = req.headers.authorization.split('Bearer ')[1];
    const userId = jwt.verify(token, process.env.JWT_SECRET).user_id;
    var size = req.query.item;
    if (size == null)
        size = 10;
    visitRepo.findAllByuserId(size, userId)
        .then(result => {
                return result.map(function (value, index) {
                        var placeid = value.dataValues.Place.id;
                        var placename = value.dataValues.Place.name;
                        var address = value.dataValues.Place.address;
                        var visittime = value.dataValues.createdAt;
                        return {placeid, placename, address, visittime}
                    })
            }
        ).then(response => res.json(response))
};

exports.getNowVisitList = async (req, res, next) => {
    const token = req.headers.authorization.split('Bearer ')[1];
    const userId = jwt.verify(token, process.env.JWT_SECRET).user_id;
    visitRepo.findLatestOneByuserId(userId)
        .then(value => {
            var placeid = value[0].dataValues.Place.id;
            var placename = value[0].dataValues.Place.name;
            var address = value[0].dataValues.Place.address;
            var visittime = value[0].dataValues.createdAt;
            res.json({placeid, placename, address, visittime})
        })
}