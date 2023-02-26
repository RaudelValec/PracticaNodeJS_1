const EventEmitter = require('events');
const https = require('https');
const fs = require('fs');

// Creamos una clase llamada Downloader que extiende de EventEmitter
class Downloader extends EventEmitter {
  downloadFile(url, filePath) {
    // Hacemos una petición HTTPS a la URL especificada
    https.get(url, response => {
      // Obtenemos el tamaño del archivo a descargar
      const fileSize = parseInt(response.headers['content-length'], 10);
      let downloadedSize = 0;

      // Escuchamos el evento 'data' que se dispara cada vez que se recibe información de la petición
      response.on('data', data => {
        // A medida que se va descargando el archivo, actualizamos el tamaño descargado
        downloadedSize += data.length;
        // Calculamos el progreso de la descarga como un porcentaje
        const progress = downloadedSize / fileSize;
        // Disparamos un evento 'progress' con el progreso de la descarga
        this.emit('progress', progress);
      });

      // Pipeamos la respuesta de la petición a un archivo en el disco
      response.pipe(fs.createWriteStream(filePath))
        // Escuchamos el evento 'finish' que se dispara cuando se ha completado la escritura del archivo
        .on('finish', () => {
          // Disparamos un evento 'complete' indicando que la descarga se ha completado
          this.emit('complete');
        });
    });
  }
}

// Creamos una instancia de la clase Downloader
const downloader = new Downloader();

// Escuchamos el evento 'progress' para mostrar el progreso de la descarga
downloader.on('progress', progress => {
  console.log(`El progreso de la descarga es: ${progress * 100}%`);
});

// Escuchamos el evento 'complete' para indicar que la descarga ha finalizado
downloader.on('complete', () => {
  console.log('Descarga completa');
});

// Llamamos al método downloadFile de la instancia downloader para comenzar la descarga del archivo
downloader.downloadFile('https://www.w3.org/TR/PNG/iso_8859-1.txt', './file.txt');

