'use strict';

const axios = require('axios');
const host = "http://localhost:3010/api/v1";

class User{

    constructor(id,name,password,queue,sessionId){
      this.id = id;
      this.name = name;
      this.password = password;
      this.queue = queue;
      this.sessionId = sessionId;
    }
  
    getId(){
      return this.id;
    }
  
    getName(){
      return this.name;
    }
  
    getPassword(){
      return this.password;
    }

    getQueue(){
        return this.queue
    }

    getSessionId(){
        return this.sessionId;
    }
  
  }
  
  class UserRepository{
  
  constructor(){
    this.users = []
  }
    
    create(user){
      this.users.push(user);
    }
  
    read(){
      return this.users;
    }
  
    update(id,name,password){
      let user = this.users.find(user => user.id === id);
    }
  
    delete(id){
      this.users = this.users.filter(user => user.id !== id);
    }
  
  }
  let userRepo = new UserRepository();

  axios({
    method: 'get',
    url: `${host}/User`,
  })
    .then(function (response) {
      //console.log(response.data);
      response.data.forEach(data => {
        let user = new User(data._id,data.name,data.password,data.queue,data.sessionId);
        userRepo.create(user);
      });
    }).catch(function (err) {
      console.log("Database error")
      console.log(err);
    });

  module.exports = {
      User,
      userRepo
  }