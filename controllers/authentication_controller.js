const settings = require('../config/config.json');
const moment = require('moment');
const jwt = require('jwt-simple');
const assert = require('assert');

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
	if (false) {
		res.status(401).json('{"message": "Niet geautoriseerd", "code": 401, "datetime": ' + moment().unix() + '}').end();
		return;
	}

	let token = 'lol';

	res.status(200).json('{"token": "' + token + '", "email": "' + email + '"}').end();
}

function register(req, res, next) {
	res.status(200).end();
}

function encodeToken(username) {
	const payload = {
		expires: moment().add(7, 'days').unix(),
		instant: moment().unix(),
		sub: username,
	};
	return jwt.encode(payload, settings.secretkey);
}

function decodeToken(token, cb) {
	try {
		const payload = jwt.decode(token, settings.secretkey);

		const now = moment.unix();

		if (now > payload.exp)
			console.log('Token expired');

		cb(null, payload);
	} catch (err) {
		cb(err, null);
	}
}

module.exports = {
	encodeToken,
	decodeToken,
	login,
	register,
};