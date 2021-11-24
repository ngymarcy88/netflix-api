const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title: String,
    type: String,
    category: String
})

module.exports = mongoose.model('Video', videoSchema);