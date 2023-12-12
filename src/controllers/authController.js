const { genSaltSync, hashSync, compareSync } = require('bcrypt')
const authService = require ('../services/authService.js')
const { sign } = require('jsonwebtoken')

module.exports = {
    register: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body._password = hashSync(body._password, salt)
        authService.register(body, ( err, results) =>{
            if (err) {
                console.log(err)
                return res.status(500).json({
                    sucess: 0,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                sucess: 1,
                data: results
            })
        })
    },
    getUserByUserId: (req, res) => {
        const id = req.params.id
        authService.getUserByid(id, (err, results) => {
            if(err) {
                console.log(err)
                return
            }
            if (!results) {
                return res.json({
                    sucess: 0,
                    message: 'Record not Found'
                })
            }
            return res.json({
                sucess: '1',
                data: results
            })
        })
    },
    getUsers: (req, res) => {
        authService.getUsers((err, results) => {
            if (err) {
                console.log(err)
                return
            }
            return res.json({
                sucess: 1,
                data: results
            })
        })
    },
    updateUsers: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body._password = hashSync(body._password, salt)
        authService.updateUser(body, (err, results) => {
            if (err) {
                console.log(err)
                return
            }
            if(!results){
                return res.json({
                    sucess: 0,
                    message: "falied to update user"
                })
            }
            return res.json({
                sucess: 1,
                message: 'updated successfully'
            })
        })
    },
    deleteUser: (req, res) => {
        const body = req.body
        authService.deleteUser(body, (err, results) => {
            if (err) {
                console.log(err)
                return
            }
            if(results === false) {
                return res.json({
                    sucess: 0,
                    message: "Record not found"
                })
            }
            return res.json({
                sucess: 1,
                message: "User deleted successfully"
            })
        })
    },
    login: (req, res) => {
        const body = req.body
        authService.getUserByEmail(body._email, (err, results) => {
            if(err) {
                console.log(err)
            }
            if (!results) {
                return res.json({
                    sucess: 0,
                    data: 'Invalid email or password'
                })
            }
            const result = compareSync(body._password, results._password)
            if (result) {
                results._password = undefined
                const jsontoken = sign({ result: results}, "qwe1234", {
                    expiresIn: "1h"
                })
                return res.json({
                    sucess: 1,
                    message: 'login successfully',
                    token: jsontoken
                })
            }
            else {
             return res.json({
                sucess: 0,
                data: "Invalid email or password"
             })       
            }
        })
    }
}