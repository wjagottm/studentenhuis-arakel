//
// CRUD operaties op studentenhuis
//
let Studentenhuis = require('../models/Studentenhuis')
const assert = require('assert')

var db = require('../config/db');

let studentenhuislist = []

module.exports = {

    createStudentenhuis(req, res, next) {
        console.log('studentenhuiscontroller.createStudentenhuis')

        assert(req.body.huisNaam, 'Huisnaam must be provided')
        assert(req.body.huisAdres, 'Huis adres must be provided')

        const huisNaam = req.body.huisNaam
        const huisAdres = req.body.huisAdres
        console.log('We got ' + huisNaam + ', ' + huisAdres)

        var sql = "INSERT INTO studentenhuis (Naam, Adres, UserID) VALUES ?"
        var values = [[huisNaam, huisAdres, userId]]

        db.query(sql, [values], function (error, results) {
                if (error) {
                        next(error);
                } else {
                        res.status(200).json({
                                status: {
                                        query: 'OK'
                                },
                                result: results.affectedRows
                        }).end();
                };
        });
    },

    getStudentenhuis(req, res, next) {
        db.query('SELECT * FROM studentenhuis', function (error, rows, fields) {
                if (error) {
                    next(error);
                } else {
                    res.status(200).json({
                        status: {
                            query: 'OK'
                        },
                        result: rows
                    }).end();
                };
            });
    },

    getStudentenhuisById(req, res, next) {
        const id = req.params.id
        db.query('SELECT * FROM studentenhuis WHERE ID=' + id, function (error, rows, fields) {
                if (error) {
                    next(error);
                } else {
                    res.status(200).json({
                        status: {
                            query: 'OK'
                        },
                        result: rows
                    }).end();
                };
            });
    },

    editStudentenhuis(req, res, next) {
        const id = req.params.id
        

    },

    deleteStudentenhuis(req, res, next) {
        const id = req.params.id
        console.log('deleteStudentenhuis id = ' + id)
        
        const removedStudentenhuis = studentenhuislist.splice(id, 1)
        if(removedStudentenhuis.length === 1) {
            // gelukt; status = 200
            res.status(200).json(removedStudentenhuis).end();
        } else {
            // mislukt; fout -> next(error)
            let error = {
                message: "Studentenhuis was not found"
            }
            next(error)
        }
    }

}