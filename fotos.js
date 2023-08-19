"use strict";
var AWS = require("aws-sdk");
require("dotenv").config();

var fotos = {
  obtener_foto: (req, res) => {
    try {
      var key = req.query.nom;
      AWS.config.loadFromPath("./config.json");
      var s3 = new AWS.S3();
      const params = {
        Expires: 60,
        Bucket: process.env.bucket,
        Conditions: [["content-length-range", 100, 10000000]],
        Fields: {
          "Content-Type": req.query.cont,
          key,
        },
      };
      s3.createPresignedPost(params, (err, data) => {
        if (err)
          res
            .status(500)
            .send({ error: true, data: null, message: err.message });
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Credentials", true);
        res.status(200).json({ error: false, data: data, message: null });
      });
    } catch (e) {
      res.status(500).send({ error: true, data: null, message: err.message });
    }
  },
};

module.exports = fotos;
