const express = require ('express')
const router = express.Router();
const auth = require('../controll/auth.controller')
router.get('/', auth, (req, res)=>{
    if (req.user.admin){
    res.send ('Essa informação só o admin pode ver')
    }
    else {
        res.status(401).send('Not admin: Access Denied')
    }

}) 

module.exports = router; 