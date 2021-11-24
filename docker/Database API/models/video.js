const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId},
    title: { type: String, required: true},
    type: { type: String},
    category: { type: String} //array
},{ versionKey: false })

module.exports = {
    Video: mongoose.model('Video', videoSchema),
    videoSchema: videoSchema
}