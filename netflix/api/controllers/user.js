'use strict';

const axios = require('axios');
const mongoose = require('mongoose');
const host = "http://172.20.0.3:10021/api/v1";

module.exports = {
    registerUser,
    login,
    logout
};

async function registerUser(req,res) {
    let id = new mongoose.Types.ObjectId();
    let username = req.swagger.params.body.value.username;
    let password = req.swagger.params.body.value.password;

    const newUser = {
      _id: id,
      name: username,
      password: password,
      queue: [],
      sessionId: -1
    }

    try {
      let response = await axios({
        method: 'post',
        url: `${host}/User`,
        data: newUser
      });
      console.log(response.data);
      res.json("Account created!");
    } catch (error) {
      res.json(error.response);
    }

}

async function login(req,res) {
    let username = req.swagger.params.body.value.username;
    let password = req.swagger.params.body.value.password;//password check TODO
    let sessionId = Math.floor(Math.random() * 100);
    let user;

    try {
      let getUserRes =  await axios({
        method: 'get',
        url: `${host}/User/`
      });
          user = getUserRes.data.find(user => user.name === username);
    } catch (error) {
      res.json(error.response);
    }

    try {
      await axios({
        method: 'patch',
        url: `${host}/User/${user._id}`,
        data: {
          sessionId: sessionId
        }
      });
      res.json(`Succesful login, SessionID = ${sessionId}`);
    } catch (error) {
      res.json(error.response);
    }

}

async function logout(req,res) {
    let sessionId = req.query.SessionID;
    let user;

    try {
      let getUserRes =  await axios({
        method: 'get',
        url: `${host}/User/`
      });
      user = getUserRes.data.find(user => user.sessionId == sessionId);
    } catch (error) {
      res.json(error.response);
    }

    try {
      await axios({
        method: 'patch',
        url: `${host}/User/${user._id}`,
        data: {
          sessionId: -1
        }
      });
      res.json(`Succesful logout`);
    } catch (error) {
      res.json(error.response);
    }

}