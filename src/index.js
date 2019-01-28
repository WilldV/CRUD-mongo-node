const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

//rutas
const routes = require('./routes/index');
app.use('/', routes);
//configuracion
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')
//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//conexion a la DB
mongoose.connect('mongodb://localhost/crud',{
    useNewUrlParser: true
})
    .then(db => console.log('Conexion establecida'))
    .catch(err => console.log(err));
//iniciando servidor
app.listen(app.get('port'), () =>{
    console.log(`Servidor en ${app.get('port')}`);
})