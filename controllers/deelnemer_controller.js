//
//CRUD operaties op Deelnemer
//
let Deelnemer = require('../models/Deelnemer')
const assert = require('assert')

var db = require('../config/db')

//let deelnemerlist = []

module.exports = {
    createDeelnemer(req, res, next) {
        console.log('deelnemercontroller.createDeelnemer')

        assert(req.body.deelnemerVoornaam, 'Deelnemer voornaam must be provided')
        assert(req.body.deelnemerAchternaam, 'Deelnemer achternaam must be provided')
        assert(req.body.deelnemerEmail, 'Deelnemer email must be provided')

        const deelnemerVoornaam = req.body.deelnemerVoornaam
        const deelnemerAchternaam = req.body.deelnemerAchternaam
        const deelnemerEmail = req.body.deelnemerEmail
        console.log('We got ' + deelnemerVoornaam + ', ' + deelnemerAchternaam + ', ' + deelnemerEmail)



        var sql = "INSERT INTO deelnemers (Voornaam, Achternaam, Email) VALUES ?"
        var values = [[deelnemerVoornaam, deelnemerAchternaam, deelnemerEmail]]

        db.query(sql, [values], function (error, results) {
                if (error) {
                        next(error)
                } else {
                        res.status(200).json({
                                status: {
                                        query: 'OK'
                                },
                                result: results.affectedRows
                        }).end()
                }
        })
    },

    getDeelnemers(req, res, next) {
        const maaltijdId = req.params.maaltijdId
        
        db.query('SELECT * FROM deelnemers', function (error, rows, fields) {
            if (error) {
                next(error)
            } else {
                res.status(200).json({
                    status: {
                        query: 'OK'
                    },
                    result: rows
                }).end()
            }
        })
    },

    deleteDeelnemer(req, res, next) {

    }

}