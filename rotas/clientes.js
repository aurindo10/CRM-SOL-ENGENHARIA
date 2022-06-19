const express = require ("express");
const router = express.Router();
const controll = require('../controll/pessoascontroll');




router.delete('/:id',express.json(), controll.deletecliente)
router.get('/', (req, res)=> {res.render('index')})
router.get('/todos', controll.list)
router.post('/add',express.urlencoded({extended:true}), controll.cria)
router.get ('/edit/:id', controll.loadCliente)
router.post('/edit/:id',express.urlencoded({extended:true}), controll.editacliente)



module.exports = router; 