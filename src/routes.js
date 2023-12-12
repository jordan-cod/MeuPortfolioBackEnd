const express = require("express")
const router = express.Router()
const db = require('./db')

const projectController = require("./controllers/projectController")
const authController = require("./controllers/authController")
const { checktoken } = require("./auth/token_validation")


//PUBLIC 

router.get('/', (req, res)=>{
    res.status(200).json({msg: 'Bem vindo a nossa API!'})
})

//PROJECTS
router.get('/projects', projectController.searchALL)
router.get('/project/:id', projectController.searchONE)
router.post('/project', projectController.insert)
router.put('/project/:id', projectController.edit)
router.delete('/project/:id', projectController.delete)

//AUTH

router.post('/auth/register', authController.register)
router.get('/auth/:id', checktoken, authController.getUserByUserId)
router.get('/auth', checktoken, authController.getUsers)
router.patch('/auth', checktoken, authController.updateUsers)
router.delete('/auth', checktoken, authController.deleteUser)
router.post('/login', authController.login)

module.exports = router