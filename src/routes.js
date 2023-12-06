const express = require("express")
const router = express.Router()

const ProjectController = require ('./controllers/projectController')
const projectController = require("./controllers/projectController")

router.get('/projects', ProjectController.searchALL)
router.get('/project/:id', ProjectController.searchONE)
router.post('/projects', ProjectController.insert)
router.put('/project/:id', projectController.edit)
router.delete('/project/:id', projectController.delete)

module.exports = router