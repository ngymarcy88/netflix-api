const express = require('express');
const mongoose = require('mongoose');
const restify = require('express-restify-mongoose');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const PORT = 10021

app.use(bodyParser.json())
app.use(methodOverride())

const Video = require('./models/video').Video;
const User = require('./models/user');

mongoose.connect('mongodb://172.20.0.2:27017/netflix');
//env
restify.serve(router,Video);
restify.serve(router, User);

app.use(router);

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
});