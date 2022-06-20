const express = require ('express')
const router = express.Router();
const userController = require ('../controll/usercontroll')
const taskController = require('../controll/taskController')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/task', userController.createNewTask)
router.get('/:id', taskController.getTasks )
router.post('/edit/:id', taskController.taskEditor)
module.exports = router; 