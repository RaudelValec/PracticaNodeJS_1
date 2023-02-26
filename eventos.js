const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/echo') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      // Se ha leído todo el cuerpo de la solicitud
      // Envía la respuesta al cliente
      res.end(body);
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(8000);









/**Crear Eventos para llamarlos atraves de emit */

/*Crear event emitter para heredar el objeto*/
//const eventEmitter = require('events').EventEmitter;


/**Obeject persona */
//class Persona extends eventEmitter{
  //  constructor(nombre,mensaje){
    //    super(mensaje);
      //  this.nombre=nombre;

    //}

//}
//let persona=new Persona('Enrique');

//persona.on('hablar',(mensaje)=>{
 //   console.log(`${persona.nombre}: ${mensaje}`);
//});

//console.log(`Me llamo ${persona.nombre}`);
//persona.emit('hablar', 'Hola mundo');

/**Crear y configurar evento para poder llamarlo(comillas invertidas "altGr+]"")*/
/*emitter.on('eventoCustom' ,(mensaje,estatus)=>{
    console.log(`${estatus}: ${mensaje}`);
});

emitter.emit('eventoCustom','Mensaje cargado con exito',200)
*/

/** EJEMPLO DE EVENTO GENERADO POR CHATGPT
// Importa el módulo 'events' de Node.js
const EventEmitter = require('events');

// Crea una nueva instancia de EventEmitter
const myEmitter = new EventEmitter();

// Crea una función que se ejecutará cuando se emita el evento 'saludar'
const saludar = (nombre) => {
  console.log(`¡Hola ${nombre}!`);
};

// Registra la función 'saludar' como un listener del evento 'saludar'
myEmitter.on('saludar', saludar);

// Emite el evento 'saludar' con un parámetro 'nombre'
myEmitter.emit('saludar', 'Juan');
*/