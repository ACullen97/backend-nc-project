const express = require("express");

const app = express();

const { getEndpoints } = require("./db/controllers/main.controller");

const { getTopics } = require("./db/controllers/topics.controller");



//middleware functions
app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.use((err, req, res, next) => {
    console.log(err, "error in middleware");
  
    if(err.code === "22P02"){
      res.status(400).send({msg: "Bad request"});
    }
    else if(err.code === "23502"){
      res.status(400).send({msg: "Bad request"});
    }
  
    else if (err.msg === 'team does not exist'){
      res.status(404).send({msg: "team does not exist"});
    }
  
    else if(err.status && err.msg){
      res.status(err.status).send({msg: err.msg})
    }
  })

module.exports = app;