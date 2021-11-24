'use strict';

const axios = require('axios');
const host = "http://localhost:3010/api/v1";

class Video{

    constructor(id,title,type,category){
        this.id = id;
        this.title = title;
        this.type = type;
        this.category = category;
    }

    getId(){
        return this.id;
    }

    getTitle(){
        return this.title;
    }

    getType(){
        return this.type;
    }

    getCategory(){
        return this.category;
    }
}

class VideoRepository{
    constructor(){
        this.videos = []
    }

    create(video){
        this.videos.push(video);
    }

    read(){
        return this.videos;
    }

    update(id,title,type,category){
        let video = this.videos.find(video => video.id === id);
        video.title = title;
        video.type = type
        video.category = category;
    }

    delete(id){
        this.videos = this.videos.filter(video => video.id !== id);
    }
}

let videoRepo = new VideoRepository();

axios({
    method: 'get',
    url: `${host}/Video`,
  })
    .then(function (response) {
      //console.log(response.data);
      response.data.forEach(data => {
        let video = new Video(data._id,data.title,data.type,data.category);
        videoRepo.create(video);
      });
    }).catch(function (err) {
      console.log("Database error")
      console.log(err);
    });

module.exports = {
    Video,
    videoRepo
}