const { userModel } = require('../models');

function getUserFavorites(req, res, next) {
    const { _id: userId } = req.user;

    userModel.findOne({ _id: userId }, { password: 0, __v: 0, username: 0, email: 0 }) //finding by Id and returning only movies
        .then(favorites => { res.status(200).json(favorites); })
        .catch(next);
}

function addUserFavorite(req, res, next) {
    const { _id: userId } = req.user;
    const { movie } = req.body;

    userModel.findOneAndUpdate({ _id: userId }, { $push: { favoriteMovies: movie } }, { runValidators: true, new: true })
        .then(x => { res.status(200).json(x); })
        .catch(next);
}


module.exports = {
    getUserFavorites,
    addUserFavorite
};
