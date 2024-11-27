const express = require("express");

const app = express();

const { getEndpoints } = require("./db/controllers/main.controller");

const { getTopics } = require("./db/controllers/topics.controller");

const { getArticleById, getArticles, getArticleComments, postArticleComment } = require("./db/controllers/articles.controller");

app.use(express.json());

//middleware functions
app.get("/api", getEndpoints);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getArticleComments);

app.post("/api/articles/:article_id/comments", postArticleComment);


//error handling

app.use((err, req, res, next) => {
    console.log(err, "error in middleware");
  
    if(err.code === "22P02"){
      res.status(400).send({msg: "Bad request"});
    }
    else if(err.code === "23502"){
      res.status(400).send({msg: "Bad request"});
    }

    else if(err.code == "42703"){
      res.status(404).send({msg: "does not exist"});
    }

    else if(err.code == "23503"){
      res.status(404).send({msg: "Not found"});
    }
  
    else if (err.msg === 'team does not exist'){
      res.status(404).send({msg: "team does not exist"});
    }
  
    else if(err.status && err.msg){
      res.status(err.status).send({msg: err.msg})
    }
  })

module.exports = app;