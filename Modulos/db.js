const mongoose = require ('mongoose');
mongoose.set('strictQuery', false); // para eliminar warnig por una futura actualizacion--- 0.0.0.0 porque localhost falla
mongoose.connect('mongodb://0.0.0.0:27017/PracticaNodeJS',{useNewUrlParser: true})
    .then((db)=>{
        console.log('Conectado a mongoDB');
        mongoose.connection.once('open',()=>{
            console.log('Conexion exitosa');
        });
        return db;
})
    .catch(err =>console.log('Error al conectar',err));


module.exports=mongoose.connection;