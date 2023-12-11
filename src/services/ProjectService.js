const db = require('../db.js')

module.exports = {
    searchALL: ()=> {
        return new Promise((accept, reject)=>{
            db.query('SELECT * FROM projects', (error, results)=>{
                if(error) {reject(error); return; }
                accept(results)
            })
        })
    },

    searchONE: (id)=>{
        return new Promise((accept, reject)=>{
            db.query('SELECT * FROM projects WHERE id = ?', [id], (error, results)=>{
                if(error) {reject(error); return; }
                if(results.length > 0){
                    accept(results[0])
                }else {
                    accept(false)
                }
            })
        })
    },
    insert: (title, descript, url, img, download)=>{
        return new Promise((accept, reject)=>{
            db.query('INSERT INTO projects (img, title, descript, url, download) VALUES (?,?,?,?,?); SELECT SCOPE_IDENTITY();',
             [img, title, descript, url, download], (error, results)=>{
                if(error) {reject(error); return; }
                    accept(results.project_ID)
            })
        })
    },
    edit: (id, img, title, descript, url, download)=>{
        return new Promise((accept, reject)=>{
            db.query('UPDATE projects SET img = ?, title = ?, descript = ?, url = ?, download = ? WHERE id = ?',
             [img, title, descript, url, download, id], (error, results)=>{
                if(error) {reject(error); return; }
                    accept(results)
            })
        })
    },
    delete: (id)=>{
        return new Promise((accept, reject)=>{
            db.query('DELETE FROM projects WHERE id = ?',[id], (error, results)=>{
                if(error) {reject(error); return; }
                    accept(results)
            })
        })
    },

}