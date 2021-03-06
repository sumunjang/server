import userRepo from "../repositories/user";

const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();
exports.signIn = function (req, res) {
    passport.authenticate('local', {session: false}, (err, user) => {
        if (err) {
            return res.status(500).json({
                message: 'Something is wrong.'
            });
        }
        if (!user)
            return res.status(400).json({
                message: 'Incorrect ID or password.'
            });
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
            const username = user.name;
            if (user.placeId != null){
                const placeId = user.placeId
                return res.json({username, placeId, token});
            }
            else
                return res.json({username, token});


        });
    })(req, res);
};

exports.signUp = async (req, res, next) => {
    await userRepo.store({
        user_id: req.body.userid,
        password: req.body.password,
        name: req.body.name
    })
        .then(res.json())
};

exports.idcheck = async (req,res,next) => {
    userRepo.findByUserId(req.params.id)
        .then(result =>{
            if(result===null)
                res.json("OK")
            else
                res.status(400).json("NO")
        })
}
