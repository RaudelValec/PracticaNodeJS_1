const EventEmitter = require('events');
const http = require('http');
const qs = require('querystring');
const fs = require('fs');

class Formulario extends EventEmitter {
  mostrarFormulario(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Formulario</title>
          <link rel="stylesheet" href="estilos.css">
        </head>
        <body>
          <form method="POST">
            <label for="nombre">Nombre:</label>
            <input type="text" name="nombre" id="nombre">
            <br>
            <label for="apellido">Apellido:</label>
            <input type="text" name="apellido" id="apellido">
            <br>
            <button type="submit">Guardar</button>
          </form>
        </body>
      </html>
    `);
  }


  guardarDatos(req, res) {
    let datos = '';
    req.on('data', (chunk) => {
      datos += chunk;
    });
    req.on('end', () => {
      const { nombre, apellido } = qs.parse(datos);
      fs.writeFile('datos.txt', `${nombre} ${apellido}`, (err) => {
        if (err) throw err;
        this.emit('guardadoExitoso');
        res.end('Datos guardados exitosamente');
      });
    });
  }
}

const formulario = new Formulario();

http.createServer((req, res) => {
    if (req.url === '/estilos.css') {
      fs.readFile('estilos.css', (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('Archivo no encontrado');
        } else {
          res.writeHead(200, {'Content-Type': 'text/css'});
          res.end(data);
        }
      });
    } else if (req.method === 'GET') {
      formulario.mostrarFormulario(req, res);
    } else if (req.method === 'POST') {
      formulario.guardarDatos(req, res);
    }
  }).listen(8080);

formulario.on('guardadoExitoso', () => {
  console.log('Datos guardados exitosamente');
});
