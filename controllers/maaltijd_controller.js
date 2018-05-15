//
//CRUD operaties op maaltijd
//
let Maaltijd = require('../models/Maaltijd')
const assert = require('assert')

var db = require('../config/db')

//let maaltijdlist = []

module.exports = {
    createMaaltijd(req, res, next) {
        console.log('maaltijdcontroller.createMaaltijd')

        assert(req.body.maaltijdNaam, 'Maaltijd naam must be provided')
        assert(req.body.maaltijdBeschrijving, 'Maaltijd beschrijving must be provided')
        assert(req.body.maaltijdIngrediënten, 'Maaltijd ingrediënten must be provided')
        assert(req.body.maaltijdAllergie, 'Maaltijd allergie must be provided')
        assert(req.body.maaltijdPrijs, 'Maaltijd prijs must be provided')

        const maaltijdNaam = req.body.maaltijdNaam
        const maaltijdBeschrijving = req.body.maaltijdBeschrijving
        const maaltijdIngrediënten = req.body.maaltijdIngrediënten
        const maaltijdAllergie = req.body.maaltijdAllergie
        const maaltijdPrijs = req.body.maaltijdPrijs

        console.log('We got ' + maaltijdNaam + ', ' + maaltijdBeschrijving + ', ' + maaltijdIngrediënten + ', ' + maaltijdAllergie + ', ' + maaltijdPrijs)

        var sql = "INSERT INTO maaltijd (Naam, Beschrijving, Ingerdiënten, Allergie, Prijs) VALUES ?"
        var values = [[maaltijdNaam, maaltijdBeschrijving, maaltijdIngrediënten, maaltijdAllergie, maaltijdPrijs]]

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

    },

    deleteMaaltijd(req, res, next) {
        const id = req.params.id
        console.log('deleteMaaltijd id = ' + id)
        
        const removedMaaltijd = maaltijdlist.splice(id, 1)
        if(removedMaaltijd.length === 1) {
            // gelukt; status = 200
            res.status(200).json(removedMaaltijd).end();
        } else {
            // mislukt; fout -> next(error)
            let error = {
                message: "Maaltijd was not found"
            }
            next(error)
        }
    }

}