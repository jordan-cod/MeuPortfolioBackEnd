require('dotenv').config({path: '.env'})
const express = require ('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const routes = require('./routes')

const server = express()

server.use(cors())
server.use(bodyParser.urlencoded({extended: false}))


server.use('/api', routes)

server.use(express.json())

server.listen(3000, ()=>{
    console.log(`Servidor rodando`)
})