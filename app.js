const mongoose = require('./Modulos/db');
const express = require('express');
const routes = require('./Routes/index')
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');


const app = new express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('Public'));


app.use('/',routes);
app.use('/about',routes);
app.use('/registro',routes);
app.use('/submit',routes);




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