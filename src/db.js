const express = require('express')
const mysql = require('mysql')

const connection = mysql.createConnection(process.env.DATABASE_URL)

connection.connect((error) =>{
    if(error) throw error
    console.log(`Conectado ao banco de dados: ${process.env.DB_NAME}`)
})

module.exports = connection