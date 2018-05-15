const settings = require('../config/config.json');
const moment = require('moment');
const jwt = require('jwt-simple');
const assert = require('assert');
let authentication = require('../auth/authetication');
var db = require('../config/db');

const user = require('../models/UserLoginJSON');

function login(req, res, next) {
	console.log(req.body);

	console.log(moment().unix());
	if (!req.body.email || !req.body.password) {
		res.status(412).json('{"message": "Een of meer properties in de request body ontbreken of zijn foutief", "code": 412, "datetime": ' + moment().unix() + '}').end();
		return;
	}

	const email = req.body.email;
	const password = req.body.password;

	// TODO: Get token from database and check if it exists
	db.query(db.query('SELECT (ID, Email, Password) FROM user WHERE Email=' + email, function (error, rows, fields) {
		if (error) {
			next(error);
		} else {
			if(rows.email == email && rows.password == password) {
				userId = rows.ID
				var token = authentication.encodeToken(userId);
			} else {
				res.status(401).json('{"message": "Niet geautoriseerd", "code": 401, "datetime": ' + moment().unix() + '}').end();
			}
		}
	}));

	res.status(200).json('{"token": "' + token + '", "email": "' + email + '"}').end();
}

function register(req, res, next) {
	res.status(200).end();
}

module.exports = {
	login,
	register
};