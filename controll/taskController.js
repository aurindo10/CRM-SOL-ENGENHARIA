const allTask = require('../models/model')



const TaskManeg = {
    getTasks: async(req, res, next)=> {
   
    let allclientes = await allTask.Perfil.find({})
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
        let idTask = req.params.idTask
        let title = req.body.title 
        let description= req.body.description
        let everyone =  await allTask.Perfil.find({})
        function teste03 (personAble) {
            return (personAble.tasks.id(idTask))  
            }
        
        
        let clienteWithTask = everyone.filter(teste03)
        await allTask.Perfil.findById(clienteWithTask[0]).then(cliente => {
            let task =  cliente.tasks.id(idTask)
            task.title = title
            task.description = description
            return cliente.save()
        }).then(cliente => {
            res.send(cliente.tasks.id(idTask)) 
        }) 
    }
}
        


module.exports = TaskManeg;