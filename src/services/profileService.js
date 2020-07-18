import userRepo from "../repositories/user"

exports.getProfile = async (req, res, next) => {
    userRepo.findByNickname()
};

exports.updateProfile = async (req, res, next) => {

};

exports.withdrawal = async (req, res, next) => {

};

exports.getProfileImage = async (req, res, next) => {

};

exports.uploadProfileImage = async (req, res, next) => {

};

exports.updateProfileImage = async (req, res, next) => {

};