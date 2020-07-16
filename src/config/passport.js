import userRepo from "../repositories/user";
import bcrypt from "bcrypt";

const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
let UserModel = require('../models').User;
require('dotenv').config();
module.exports = () => {
    // Local Strategy
    passport.use(new LocalStrategy({
            usernameField: 'nickname',
            passwordField: 'password'
        },
        function (nickname, password, done) {
            // 이 부분에선 저장되어 있는 User를 비교하면 된다.
            return userRepo.findByNickname(nickname)
                .then(user => {
                    if (!user) {
                        return done(null, false, {message: 'Incorrect ID or password.'});
                    }
                    else{
                        bcrypt.compare(password, user.password)
                            .then(pwCheck =>{
                                console.log(pwCheck)
                                if(!pwCheck)
                                    return done(null, false, {message: 'Incorrect ID or password.'});
                                else
                                    return done(null, user, {message: 'Logged In Successfully'});
                            })
                            .catch(err => done(err));
                    }
                })
                .catch(err => done(err));
        }
    ));

    //JWT Strategy
    passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey   : "sumunjangApi"
        },
        function (jwtPayload, done) {
            return userRepo.findByNickname(jwtPayload.nickname)
                .then(user => {
                    return done(null, user);
                })
                .catch(err => {
                    return done(err);
                });
        }
    ));
};
