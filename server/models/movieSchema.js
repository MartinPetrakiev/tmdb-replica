const mongoose = require('mongoose');


const Movie = new mongoose.Schema({
    id: String,
    title: String,
    img: String,
    userReview: Number,
    userComment: String
}, { timestamps: { createdAt: 'created_at' } });

module.exports = Movie;