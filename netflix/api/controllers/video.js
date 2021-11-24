'use strict';

const axios = require('axios');
const mongoose = require('mongoose');
const host = "http://172.20.0.3:10021/api/v1";

module.exports = {
    getVideoByTitle,
    addVideoToQueue,
    viewQueue,
}

async function getVideoByTitle(req,res) {
    let title = req.swagger.params.title.value;

    try {
        let response = await axios({
          method: 'get',
          url: `${host}/Video?query={"title":"${title}"}`,
        });
        res.status(200).json(response.data);
      } catch (error) {
        res.status(400).json("Video not found");
      }

}

async function addVideoToQueue(req,res) {
    let title = req.swagger.params.title.value;
    let sessionId = req.query.SessionID; //securitybe
    let video;
    let user;
    let queue;
    
    try {
        let getVideoRes = await axios({
            method: 'get',
            url: `${host}/Video?query={"title":"${title}"}`
        });
        video = getVideoRes.data[0];
        console.log(video);
    } catch (error) {
        console.log("getVideoRes Error")
    }

    try {
        let getUserRes =  await axios({
          method: 'get',
          url: `${host}/User/`
        });
        user = getUserRes.data.find(user => user.sessionId == sessionId);
        queue = user.queue;
        queue.push(video._id);
      } catch (error) {
        res.json(error.response); // return
      }

    try {
        let response = await axios({
            method: 'patch',
            url: `${host}/User/${user._id}`,
            data: {
                queue
            }
        })
        res.json(`${title} successfully added to the queue`)
    } catch (error) {
        console.log("error")
    }

}

async function viewQueue(req,res) {
    let sessionId = req.query.SessionID;
    let user;
    let queue = [];

    try {
        let getUserRes =  await axios({
          method: 'get',
          url: `${host}/User/`
        });
        user = getUserRes.data.find(user => user.sessionId == sessionId);
        //console.log(user)
      } catch (error) {
        console.log(error)
        res.json(error.response.data.message);
      }

    for ( let id of user.queue){
      try {
        let response = await axios({
          method: 'get',
          url: `${host}/Video/${id}`
        });
        queue.push(response.data);
      } catch (error) {
        console.log("deleted video");
        queue.push({ Error: "Deleted video"})
        //continue;
      } 
    }
    res.json(queue)

}