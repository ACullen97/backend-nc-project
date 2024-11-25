//const endpoints = require("./endpoints.json");

const fs = require("fs");


exports.getEndpoints = (req, res) => {
    fs.readFile("./endpoints.json", "utf8", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          return;
        }
        const jsonObject = JSON.parse(jsonString);
        res.status(200).send({endpoints: jsonObject});
      });
      
      
  };