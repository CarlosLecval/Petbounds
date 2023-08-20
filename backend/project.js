var express = require('express');
var router = express.Router();
var fotos = require("./fotos");
var pagos = require('./pago');

router.get('/foto', fotos.obtener_foto);
router.post('/pago', pagos.crearCuenta);
router.get('/pago', pagos.linkCuenta);
router.get('/secret', pagos.pagoIntent);
module.exports = router;