import userRepo from "../repositories/user"
import jwt from "jsonwebtoken";

exports.getProfile = async (req, res, next) => {
    const token = req.headers.authorization.split('Bearer ')[1];
    const userId = jwt.verify(token, process.env.JWT_SECRET).user_id;
    userRepo.findByUserId(userId)
        .then(
            profile => {
                const username = profile.name;
                const userid = profile.user_id;
                res.json({username, userid})
            }
        )
};

exports.updateProfile = async (req, res, next) => {
    const token = req.headers.authorization.split('Bearer ')[1];
    const userId = jwt.verify(token, process.env.JWT_SECRET).user_id;
    userRepo.findByUserId(userId)
        .then(
            profile => {
                profile.name = req.body.username;
                userRepo.updateByUserId(profile,userId)
                    .then(res.json())
            }
        )
};

exports.withdrawal = async (req, res, next) => {
    const token = req.headers.authorization.split('Bearer ')[1];
    const userId = jwt.verify(token, process.env.JWT_SECRET).user_id;
    userRepo.deleteByUserId(userId).then(res.json())
};