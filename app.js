const express = require ("express");
const app = express();  
const rotaclientes = require ('./rotas/clientes')
const morgan =  require ('morgan')
const bodyParser = require ('body-parser');
const { header } = require("express/lib/request");
const path = require ('path')
const userRouter = require('./rotas/users');
const mongoose = require('mongoose');
const adminRouter = require('./rotas/adminrouter')
mongoose.connect(process.env.MONGO_CONECTION_URL,(error)=>{ 
    if (error) 
        console.log(error)
    else
        console.log('Mongo Connected')
})

app.use(express.static(path.join(__dirname,'front/build')))
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,'front/build/index.html', function (error) {
        if (error) {
            
        res.status(500).send(error)}
    }))
})
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use ('/users', express.json(), userRouter)
app.use ('/', rotaclientes)
app.use ('/admin',express.json(), adminRouter)
app.use ((req, res, next) => {
    const erro = new Error ('não encontrato');
    erro.status = 404;
    next(erro);
})
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method === 'OPTION') {
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE,GET')
    }
    next ();
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send ({
        erro: {
            mensagem: error.message
        }
    })
})
app.set('view engine','ejs' );
app.set ('views', path.join(__dirname,'templates'))

module.exports = app;
