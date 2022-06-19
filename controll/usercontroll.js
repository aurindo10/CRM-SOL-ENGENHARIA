const User = require('../models/User')
const bcryptjs = require ('bcryptjs')
const ModelPerfil = require('../models/model')
const jwt = require ('jsonwebtoken')
const userController = {
    register: async function (req, res){
        const selectedUser = await User.findOne({email: req.body.email})
        if (selectedUser) return res.status(400).send('Email already exists')
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password)

        })
        try {
            const savedUser = await user.save()
            res.send(savedUser)

        }catch (error) {
            res.status(400).send(error)
        }


    },
    login: async function (req, res) {
        const selectedUser = await User.findOne({email: req.body.email})
        if (!selectedUser) return res.status(400).send('Email or Password incorrect')
        const passwordAndUserMatch = await bcryptjs.compare(req.body.password, selectedUser.password)
        if (!passwordAndUserMatch) return res.status(400).send('Email or Password incorrect')
        const token = jwt.sign({ _id:selectedUser._id, admin: selectedUser.admin }, process.env.TOKEN_SECRET)
        res.header('authoriztion-token', token)
        res.send ("User Logged")
    },
    

    createNewTask :  function (req, res) {
    const personId = req.body.personId;
    const taskTitle = req.body.title;
    const taskDescription = req.body.description;

    const newTask = {title: taskTitle, description:taskDescription}
    let query = {_id: personId};
    let update = {$push:{tasks: newTask}};
    let options = { new: true };
    ModelPerfil.findOneAndUpdate(query, update,options, (err, doc) =>{ 
        if (err) {
          throw err;
        }
    })
    res.send ("Tarefa Cadastrada")
}}
module.exports = userController;
