const Perfil = require('../models/model')
const User = require('../models/User')

const cria = async (req, res, next)=> {
    try {
    const seller = await User.findOne({_id: req.body.vendedor})
    const teste =  new Perfil({name: req.body.nome,cidade: req.body.cidade, vendedor: seller._id , date: req.body.dia})
        teste.save()
     res.redirect('/')
        }
        catch (error){
            res.render('index', {error, boody: req.body})
        }
}
const consulta = (req, res, next)=> {
    let title = req.params.title;
    let doc = Perfil.find({name: title}).then(doc=> {    
        res.status(200).send(
        {mensagem: doc})
    })
}
const search = async (req, res, next)=> {
   const allclientes =  await Perfil.find({})
   res.status(201).send({
    mensagem: 'Esses são todos os clientes',
    clientecriado: allclientes})
}
const list = async (req, res, next)=> {
    const allclientes =  await Perfil.find({})
 res.render('clientes', {allclientes})
 }
const deletecliente = async (req, res, next)=> {
    let id = req.params.id;
    if (!id) {
        id = req.body.id;
    }
    try {
    await Perfil.findByIdAndDelete(id)
    res.send(id)
        }
    catch (error) {
        res.status(404).send(error)
    }

}
const loadCliente = async (req, res, next) =>
    {
        let id = req.params.id;
        try {
        let doc = await Perfil.findById(id)
        res.render('edit', {body: doc})
            }
        catch (error) {
            res.status(404).send(error)
        }
    } 
const editacliente = async (req, res, next) =>
{
    let cliente = {}
    cliente.name = req.body.nome
    cliente.cidade = req.body.cidade 
    cliente.vendedor = req.body.vendedor
    cliente.date = req.body.date
    let id = req.params.id;
    if (!id) {
        id = req.body.id;
    }
    try {
    let doc = await Perfil.findByIdAndUpdate(
        , cliente)
    res.redirect('/todos')
        }
    catch (error) {
        res.status(404).send(error)
    }
} 
module.exports = {cria, consulta, search, list, deletecliente, loadCliente, editacliente }