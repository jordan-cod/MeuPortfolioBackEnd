const db = require('../db.js')

module.exports = {
    register: (data, callback) => {
        db.query(
            'INSERT INTO users(_user, _email, _password) VALUES (?,?,?)',
        [
            data._user,
            data._email,
            data._password,
        ],
        (error, results) => {
            if(error) {
               return callback(error)
            }
            return callback(null, results)
        })
    },
    getUsers: callback => {
        db.query(
            'SELECT id, _user, _email FROM users',
            [],
            (error, results) => {
                if(error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        )
    },
    getUserByid: (id, callback) => {
        db.query(
            'SELECT id, _user, _email FROM users WHERE id = ?',
            [id],
            (error, results) => {
                if (error) {
                    callback(error)
                }
                return callback(null, results[0])
            }
        )
    },
    updateUser: (data, callback) => {
        db.query(
            'UPDATE users set _user = ?, _email  = ?, _password = ? WHERE id = ?',
            [   
                data._user,
                data._email,
                data._password,
                data.id
            ],
            (error, results) => {
                if(error){
                    callback(error)
                }
                return callback(null, results)
            }
        )
    },
    deleteUser: (data, callback) => {
        db.query(
            'DELETE FROM users WHERE id = ?',
            [data.id],
            (error, results) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results[0])
            }
        )
    },
    getUserByEmail: (email, callback) => {
        db.query(
            'SELECT * FROM users WHERE _email = ?',
            [email],
            (error, results) => {
                if (error) {
                    callback(error)
                }
                return callback(null, results[0])
            }
        )
    }
}