//
//CRUD operaties op Deelnemer
//
let Deelnemer = require('../models/Deelnemer')
const assert = require('assert')
const auth = require('../auth/authentication')
const ApiError = require('../models/ApiError')

var db = require('../config/db')

module.exports = {
    addDeelnemer(req, res, next) {
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




        var sql = "INSERT INTO deelnemers (UserID, StudentenhuisID, MaaltijdID) VALUES ?"
        var values = [[userId, huisId, maaltijdId]]

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

        var sql = "DELETE FROM deelnemers WHERE UserID = " + userId + " AND MaaltijdID = " + maaltijdId + " AND StudentenhuisID = " + huisId
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