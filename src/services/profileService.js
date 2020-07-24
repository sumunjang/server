import userRepo from "../repositories/user"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
        .catch(err => res.status(400).json())
};

exports.updateProfile = async (req, res, next) => {
    const token = req.headers.authorization.split('Bearer ')[1];
    const userId = jwt.verify(token, process.env.JWT_SECRET).user_id;

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    userRepo.findByUserId(userId)
        .then(
            profile => {
                profile.password = password;
                userRepo.updateByUserId(profile,userId)
                    .then(res.json())
            }
        )
        .catch(err => res.status(400).json())
};

exports.withdrawal = async (req, res, next) => {
    const token = req.headers.authorization.split('Bearer ')[1];
    const userId = jwt.verify(token, process.env.JWT_SECRET).user_id;
    userRepo.deleteByUserId(userId).then(res.json())
        .catch(err => res.status(400).json())
};