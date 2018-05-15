const settings = require('../config/config.json');
const moment = require('moment');
const jwt = require('jwt-simple');
const assert = require('assert');
let authentication = require('../auth/authentication');
var db = require('../config/db');

const user = require('../models/UserLoginJSON');

function login(req, res, next) {
	var sql = "SELECT * FROM user WHERE Email = ?";

	assert(req.body.email, "Email must be provided")
	assert(req.body.password, "Password must be provided")

	const email = req.body.email;
	const password = req.body.password;

	// TODO: Get token from database and check if it exists
	db.query(db.query(sql, [email], function (error, result) {
		if (error) {
			next(error);
		} else if (result[0].Email == email && result[0].Password == password) {
			userId = result[0].ID
			var token = authentication.encodeToken(userId);
			res.status(200).json('{"token": "' + token + '", "email": "' + email + '"}').end();
		} else {
			res.status(401).json('{"message": "Niet geautoriseerd", "code": 401, "datetime": ' + moment().unix() + '}').end();
		}
	}));
}

function register(req, res, next) {

	assert(req.body.email, "Email must be provided")
	assert(req.body.password, "Password must be provided")
	assert(req.body.firstname, "firstname must be provided")
	assert(req.body.lastname, "lastname must be provided")

	const email = req.body.email;
	const password = req.body.password;
	const firstname = req.body.firstname;
	const lastname = req.body.lastname

	var sql = "INSERT INTO user (Voornaam, Achternaam, Email, Password) VALUES ?"
        var values = [[firstname, lastname, email, password]]

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
}

module.exports = {
	login,
	register
};