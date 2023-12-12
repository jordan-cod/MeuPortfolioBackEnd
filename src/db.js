const express = require('express')
const mysql = require('mysql')

const connection = mysql.createConnection(process.env.DATABASE_URL)
//const connection = mysql.createConnection({
//    host: process.env.DB_HOST,
//    user: process.env.DB_USER,
//    password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
//})

connection.connect((error) =>{
    if(error) throw error
    console.log(`Conectado ao banco de dados: ${process.env.DB_NAME}`)
})

module.exports = connection