const {Router} = require('express');//llamas una parte de express
const User = require('../Models/user');//llamas al esquema
const db = require('../Modulos/db');

const router = Router();//instancias express o mejor dicho esa parte de express

router.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'Public' });//envia el html que esta en la ruta Public asi lee el HTML
  });

router.get('/about', (req, res) => {
    res.sendFile('about.html', { root: 'Public' });
  });
  
  router.get('/registro', (req, res) => {
    res.sendFile('registro.html', { root: 'Public' });
  });
  
  router.post('/submit', (req, res) => {
    const { inputUsername, inputEmail, inputPassword } = req.body;
  
    const user = new User({
      username: inputUsername,
      email: inputEmail,
      password: inputPassword
    });
    user.save((err, saveUser) => {
        if (err) return console.error(err);
    
        console.log('Data inserted into database');
        res.redirect('/');
      });
    });

    router.get('/consulta',(req,res)=>{
      user.find({},(error,result)=>{
        if(error){
          console.log(error);
        }else{
          
        }
      });
    });


module.exports=router;