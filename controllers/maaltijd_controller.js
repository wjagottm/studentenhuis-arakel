//
//CRUD operaties op maaltijd
//
let Maaltijd = require('../models/Maaltijd')
const assert = require('assert')
const auth = require('../auth/authentication')
const ApiError = require('../models/ApiError')

var db = require('../config/db')

//let maaltijdlist = []

module.exports = {
    addMaaltijd(req, res, next) {
        console.log('maaltijdcontroller.createMaaltijd')
        try {
            assert(req.body.maaltijdNaam, 'Maaltijd naam must be provided')
            assert(req.body.maaltijdBeschrijving, 'Maaltijd beschrijving must be provided')
            assert(req.body.maaltijdIngredienten, 'Maaltijd ingrediënten must be provided')
            assert(req.body.maaltijdAllergie, 'Maaltijd allergie must be provided')
            assert(req.body.maaltijdPrijs, 'Maaltijd prijs must be provided')
        } catch (error) {
            throw(new ApiError(error.toString(), 412))
        }

        const maaltijdNaam = req.body.maaltijdNaam
        const maaltijdBeschrijving = req.body.maaltijdBeschrijving
        const maaltijdIngredienten = req.body.maaltijdIngredienten
        const maaltijdAllergie = req.body.maaltijdAllergie
        const maaltijdPrijs = req.body.maaltijdPrijs

        const huisId = req.params.huisId

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

        console.log('We got ' + maaltijdNaam + ', ' + maaltijdBeschrijving + ', ' + maaltijdIngredienten + ', ' + maaltijdAllergie + ', ' + maaltijdPrijs)

        var sql = "INSERT INTO maaltijd (Naam, Beschrijving, Ingredienten, Allergie, Prijs, UserID, StudentenhuisID) VALUES ?"
        var values = [[maaltijdNaam, maaltijdBeschrijving, maaltijdIngredienten, maaltijdAllergie, maaltijdPrijs, userId, huisId]]

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

    getAllMaaltijd(req, res, next) {
        db.query('SELECT * FROM maaltijd', function (error, rows, fields) {
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

    getMaaltijdById(req, res, next) {
        const id = req.params.id

        db.query('SELECT * FROM maaltijd WHERE ID=' + id, function (error, rows, fields) {
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

    editMaaltijd(req, res, next) {
        try{
            assert(req.body.maaltijdNaam, 'Maaltijd naam must be provided')
            assert(req.body.maaltijdBeschrijving, 'Maaltijd beschrijving must be provided')
            assert(req.body.maaltijdIngredienten, 'Maaltijd ingrediënten must be provided')
            assert(req.body.maaltijdAllergie, 'Maaltijd allergie must be provided')
            assert(req.body.maaltijdPrijs, 'Maaltijd prijs must be provided')
        } catch (error) {
            throw(new ApiError(error.toString(), 412))
    }

        const maaltijdNaam = req.body.maaltijdNaam
        const maaltijdBeschrijving = req.body.maaltijdBeschrijving
        const maaltijdIngredienten = req.body.maaltijdIngredienten
        const maaltijdAllergie = req.body.maaltijdAllergie
        const maaltijdPrijs = req.body.maaltijdPrijs

        const huisId = req.params.huisId
        const maaltijdId = req.params.maaltijdId

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

        var sql = "UPDATE maaltijd SET Naam = '" + maaltijdNaam + "', Beschrijving = '" + maaltijdBeschrijving + "', Ingredienten = '" + maaltijdIngredienten + "', Allergie = '" + maaltijdAllergie + "', Prijs = " + maaltijdPrijs + " WHERE UserID = " + userId + " AND StudentenhuisID = " + huisId

        db.query(sql, function (error, result) {
            if (error) {
                next(error)
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

    deleteMaaltijd(req, res, next) {
        const huisId = req.params.huisId
        const maaltijdId = req.params.maaltijdId

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
        
        var sql = "DELETE FROM maaltijd WHERE ID = " + maaltijdId + " AND UserID = " + userId + " AND StudentenhuisID = " + huisId
        db.query(sql, function(error, result) {
            if (error) {
                next(error)
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