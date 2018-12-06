let connection = require('../config/db')
class Eleve{
    static create (nom, cb){
        connection.query('INSERT INTO eleve set nom = ?, date = ?', [nom, new Date()], (err, result)=>{
            if (err) throw err
            cb(result)
        })
    }
    static all (cb) {
        connection.query('SELECT * FROM eleve', (err, rows)=>{
            if (err) throw err
            cb(rows)
        })
    }
}

module.exports =Eleve