const Perfil = require('../models/model')
const Task = require('../models/model')


const TaskManeg = {
    getTasks: async(req, res, next)=> {
   
    let allclientes = await Perfil.find({})
    let id = req.params.id
    function teste (cliente02) {
    if (cliente02.vendedor===id) {
        return cliente02
    }}
    function filter02 (person) {
       return person.tasks
    }
    let result = allclientes.filter(teste)
    
    res.send(result.map(filter02))

},
    taskEditor: async(req, res, next)=> {
        let id = req.params.id
        let allclientes = await Perfil.findById({id})
        res.send(allclientes)
    }
}
        


module.exports = TaskManeg;