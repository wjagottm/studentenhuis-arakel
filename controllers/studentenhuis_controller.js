//
// CRUD operaties op studentenhuis
//
let Studentenhuis = require('../models/Studentenhuis')
const assert = require('assert')
const ApiError = require('../models/ApiError')

const auth = require('../auth/authentication')

var db = require('../config/db')

module.exports = {

    createStudentenhuis(req, res, next) {
        console.log('studentenhuiscontroller.createStudentenhuis')
        try {
            assert(req.body.huisNaam, 'Huisnaam must be provided')
            assert(req.body.huisAdres, 'Huis adres must be provided')
        } catch (error) {
            throw(new ApiError(error.toString(), 412))
        }

        var token = (req.header('X-Access-Token')) || '';
        let userId;

        auth.decodeToken(token, (err, payload) => {
            if (err) {
				next(new ApiError('Niet geautoriseerd', err.status || 401))
            } else {
                console.log(payload)
                userId = payload.sub
            }
        });

        const huisNaam = req.body.huisNaam
        const huisAdres = req.body.huisAdres
        console.log('We got ' + huisNaam + ', ' + huisAdres)

        var sql = "INSERT INTO studentenhuis (Naam, Adres, UserID) VALUES ?"
        var values = [[huisNaam, huisAdres, userId]]

        db.query(sql, [values], function (error, results) {
            if (error) {
				next(new ApiError('Een of meer properties in de request body ontbreken of zijn foutief', 412))
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

    getStudentenhuis(req, res, next) {
        
        var token = (req.header('X-Access-Token')) || '';
        let userId;

        auth.decodeToken(token, (err, payload) => {
            if (err) {
				next(new ApiError('Niet geautoriseerd', err.status || 401))
            } else {
                console.log(payload)
                userId = payload.sub
            }
        });

        db.query('SELECT * FROM studentenhuis', function (error, rows, fields) {
                if (error) {
                    next(new ApiError('Een of meer properties in de request body ontbreken of zijn foutief', 412))
                } else {
                    res.status(200).json({
                        status: {
                            query: 'OK'
                        },
                        result: rows
                    }).end();
                }
            })
    },

    getStudentenhuisById(req, res, next) {
        
        var token = (req.header('X-Access-Token')) || '';
        let userId;

        auth.decodeToken(token, (err, payload) => {
            if (err) {
				next(new ApiError('Niet geautoriseerd', err.status || 401))
            } else {
                console.log(payload)
                userId = payload.sub
            }
        });
        
        const id = req.params.id

        db.query('SELECT * FROM studentenhuis WHERE ID=' + id, function (error, rows, fields) {
            if (error) {
				next(new ApiError('Een of meer properties in de request body ontbreken of zijn foutief', 412))
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

    editStudentenhuis(req, res, next) {
        
        var token = (req.header('X-Access-Token')) || '';
        let userId;

        auth.decodeToken(token, (err, payload) => {
            if (err) {
				next(new ApiError('Niet geautoriseerd', err.status || 401))
            } else {
                console.log(payload)
                userId = payload.sub
            }
        });
        
        assert(req.body.naam, "Naam must be provided")
        assert(req.body.adres, "Adres must be provided")

        const id = req.params.id

        const naam = req.body.naam
        const adres = req.body.adres

        var token = (req.header('X-Access-Token')) || '';
        let userId;

        auth.decodeToken(token, (err, payload) => {
            if (err) {
				const error = new ApiError('Niet geautoriseerd', err.status || 401)
                res.status(401).json(error).end()
            } else {
                console.log(payload)
                userId = payload.sub
            }
        });

        var sql = "UPDATE studentenhuis SET Naam = " + naam + ", Adres = " + adres + " WHERE studentenhuis.ID = " + id + " AND UserID = " + userId

        db.query(sql, function (error, result) {
            if (error) {
				next(new ApiError('Een of meer properties in de request body ontbreken of zijn foutief', 412))
            } else {
                res.status(200).json({
                    status: {
                        query: 'OK'
                    },
                    result: result.affectedRows
                }).end()
            }
        })
        

    },

    deleteStudentenhuis(req, res, next) {
        const id = req.params.id
        console.log('deleteStudentenhuis id = ' + id)

        var token = (req.header('X-Access-Token')) || '';
        let userId;

        auth.decodeToken(token, (err, payload) => {
            if (err) {
				const error = new ApiError('Niet geautoriseerd', err.status || 401)
                res.status(401).json(error).end()
            } else {
                console.log(payload)
                userId = payload.sub
            }
        });
        
        var sql = "DELETE FROM studentenhuis WHERE ID = " + id + " AND UserID = " + userId
        db.query(sql, function(error, result) {
            if (error) {
				next(new ApiError('Een of meer properties in de request body ontbreken of zijn foutief', 412))
            } else {
                res.status(200).json({
                    status: {
                        query: 'OK'
                    },
                    result: result.affectedRows
                }).end()
            }
        })
    }

}