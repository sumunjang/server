import userRepo from "../repositories/user";

const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();
exports.signIn = function (req, res) {
    passport.authenticate('local', {session: false}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Incorrect ID or password.'
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            // jwt.sign('token내용', 'JWT secretkey')
            const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
            const userName = user.name;
            return res.json({userName, token});
        });
    })(req, res);
};

exports.signUp = async (req, res, next) => {
    userRepo.store({
        nickname: req.body.nickname,
        password: req.body.password,
        name: req.body.name
    })
        .then((result) => {
            res.status(200).json({
                nickname: result.dataValues.nickname,
                password: result.dataValues.password,
                name: result.dataValues.name});
        });
};
