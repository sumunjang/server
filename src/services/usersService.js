import userRepo from "../repositories/user"

exports.getProfile = () => {
    return {message: 'profile'}
};

exports.signUp = async (req, res, next) => {
    userRepo.store({
        nickname: req.body.nickname,
        password: req.body.password,
        name: req.body.name
    })
        .then((result) => {
            res.status(201).json({
                nickname: result.dataValues.nickname,
                password: result.dataValues.password,
                name: result.dataValues.name});
        });
};
