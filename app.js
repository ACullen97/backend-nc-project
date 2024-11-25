const express = require("express");

const app = express();

const { getEndpoints } = require("./db/controllers/main.controller");

//middleware functions
app.get("/api", getEndpoints);

module.exports = app;