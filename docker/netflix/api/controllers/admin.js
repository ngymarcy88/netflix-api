'use strict';

const axios = require('axios');
const mongoose = require('mongoose');
const host = "http://172.20.0.3:10021/api/v1";

module.exports = {
    addVideo,
    getVideo,
    updateVideo,
    deleteVideo,
    allVideo
}

async function addVideo(req,res){
    let id = new mongoose.Types.ObjectId();
    let title = req.swagger.params.title.value;
    let type = req.swagger.params.type.value;
    let category = req.swagger.params.category.value;

    try {
      let response = await axios({
        method: 'post',
        url: `${host}/Video`,
        data: {
          _id: id,
          title: title,
          type: type,
          category: category
        }
      });
      res.json(response.data)
    } catch (error) {
      res.json(error.response);
    }
}

async function getVideo(req,res){
    let id = req.swagger.params.videoId.value;

    try {
      let response = await axios({
        method: 'get',
        url: `${host}/Video/${id}`,
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(400).json("Video not found");
    }
}

async function updateVideo(req,res){
    let id = req.swagger.params.videoId.value;
    let title = req.swagger.params.title.value;
    let type = req.swagger.params.type.value;
    let category = req.swagger.params.category.value;

    try {
      let response = await axios({
        method: 'patch',
        url: `${host}/Video/${id}`,
        data: {
          title: title,
          type: type,
          category: category
        }
      });
      res.json(response.data);
    } catch (error) {
      res.json(error.response);
    }
  
}

async function deleteVideo(req,res){
    let id = req.swagger.params.videoId.value;

    try {
      let response = await axios({
        method: 'delete',
        url: `${host}/Video/${id}`,
      });
      console.log(response.data);
      res.json("video deleted");
    } catch (error) {
      res.json("video not found");
    }
}

async function allVideo(req,res){
    try {
      let response = await axios({
        method: 'get',
        url: `${host}/Video`,
      });
      res.json(response.data);
    } catch (error) {
      console.log("Database error");
      console.log(error);
    }
}