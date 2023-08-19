const mongoose = require("mongoose");
require("dotenv").config();

module.exports.createMongo = () => {
  mongoose.connect(process.env.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("conectado");
  });

  const mensajesSchema = new mongoose.Schema({
    solicitudId: String,
    msj: String,
    usuarioflag: Boolean,
  });

  const mensaje = mongoose.model("mensajes", mensajesSchema);

  return { mongoose, mensajesSchema, mensaje };
};
