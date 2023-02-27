const mongoose = require('./Modulos/db');
const express = require('express');

const app = new express();





app.listen(3000,()=>{
    console.log('Server escuchando en puerto 3000')
});

/**  Para realizar operaciones con la base de datos, puedes hacer lo siguiente:
const miModelo = require('./modulos/miModelo');
const { default: mongoose } = require('mongoose');
miModelo.find({}, (error, resultado) => {
  if (error) {
    console.error(error);
  } else {
    console.log(resultado);
  }
});

*/