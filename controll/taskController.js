const Perfil = require('../models/model')



const TaskManeg = async(req, res, next)=> {
   
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
    alltasks =  result.map(filter02)
    res.send(alltasks)

}

        


module.exports = TaskManeg;