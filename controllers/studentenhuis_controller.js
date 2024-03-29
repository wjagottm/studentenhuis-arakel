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
                sql = "SELECT studentenhuis.ID, studentenhuis.Naam, studentenhuis.Adres, user.Voornaam AS Contact, user.Email FROM studentenhuis, user WHERE studentenhuis.ID = " + results.insertId + " AND studentenhuis.UserID = user.ID"
                db.query(sql, function(error, huisResult) {
                    res.status(200).json({
                        status: {
                            query: 'OK'
                        },
                        result: huisResult
                    }).end()
                })
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

        db.query('SELECT studentenhuis.ID, studentenhuis.Naam, Studentenhuis.Adres, user.Voornaam AS Contact, user.Email  FROM studentenhuis, user WHERE studentenhuis.UserId = user.ID', function (error, rows, fields) {
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
            } 
            else if(rows.length === 0){
                next(new ApiError('Studentenhuis bestaat niet', 404))
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
        
        try{
            assert(req.body.huisNaam, "Naam must be provided")
            assert(req.body.huisAdres, "Adres must be provided")
        } catch (err){
            next(new ApiError('Een of meer properties in de request body ontbreken of zijn foutief', 412))
        }

        const id = req.params.id

        const naam = req.body.huisNaam
        const adres = req.body.huisAdres

        var sql = "UPDATE studentenhuis SET Naam = '" + naam + "', Adres = '" + adres + "' WHERE studentenhuis.ID = " + id + " AND UserID = " + userId

        db.query(sql, function (error, result) {
            if (error) {
                next(new ApiError('Een of meer properties in de request body ontbreken of zijn foutief', 412))
                console.dir(error)
            } else {
                var sql = "SELECT studentenhuis.ID, studentenhuis.Naam, studentenhuis.Adres, user.Voornaam AS Contact, user.Email FROM studentenhuis, user WHERE studentenhuis.ID = " + id + " AND studentenhuis.UserID = user.ID"

                db.query(sql, function (error, results) {
                    if (error) {
                        next(new ApiError('Een of meer properties in de request body ontbreken of zijn foutief', 412))
                    } else {
                        res.status(200).json({
                            status: {
                                query: 'OK'
                            },
                            result: results
                        }).end()
                    }
                })
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