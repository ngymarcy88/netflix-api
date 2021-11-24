const mongoose = require('mongoose');
const videoSchema = require('./video').videoSchema;

const userSchema = mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId},
    name: { type: String , unique : true, required : true },
    password: { type: String ,required : true },
    queue: [],
    sessionId: { type: Number, default: -1}
},{ versionKey: false })

module.exports = mongoose.model('User', userSchema);