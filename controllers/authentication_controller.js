const settings = require('../config/config.json')
const moment = require('moment')
const jwt = require('jwt-simple')
const assert = require('assert')
const ApiError = require('../models/ApiError')

const bcrypt = require('bcrypt')
let authentication = require('../auth/authentication')
var db = require('../config/db')

const UserLoginJSON = require('../models/UserLoginJSON')
const UserRegisterJSON = require('../models/UserRegisterJSON')

const user = require('../models/UserLoginJSON')

function login(req, res, next) {
	try {
		assert(req.body.email, "Email must be provided")
		assert(req.body.password, "Password must be provided")
	} catch (error) {
		next(new ApiError('Een of meer properties in de request body ontbreken of zijn foutief', 412))
	}

	const email = req.body.email
	const password = req.body.password

	let user = new UserLoginJSON(email, password)

	var sql = "SELECT * FROM user WHERE Email = ?"

	db.query(sql, [user.email], function (error, result) {
		if (error) {
			next(error);
		} else if (result.length == 0){
			next(new ApiError('Email does not exist', 412))
		} else {
			bcrypt.compare(user.password, result[0].Password, function(error, passResult) {
				if(passResult) {
					userId = result[0].ID
					var token = authentication.encodeToken(userId);
		
					res.status(200).json({
						token: token,
						email:  email 
					}).end()
				} else {
					const error = new ApiError('niet geautoriseerd', 401)
					res.status(401).json(error).end()
				}
			})
		}
	});
}

function register(req, res, next) {
	try {
		assert(req.body.email, "Email must be provided")
		assert(req.body.password, "Password must be provided")
		assert(req.body.firstname, "firstname must be provided")
		assert(req.body.lastname, "lastname must be provided")
	} catch (error) {
		next(new ApiError('Een of meer properties in de request body ontbreken of zijn foutief', 412))
	}

	const email = req.body.email
	let password = req.body.password
	let encryptedPassword = bcrypt.hashSync(password, 10);
	const firstname = req.body.firstname
	const lastname = req.body.lastname

	let user = new UserRegisterJSON(firstname, lastname, email, encryptedPassword)

	var sql = "SELECT * FROM user WHERE Email = '" + email + "'"

	db.query(sql, function(error, results) {
		if (error) {
			next(error)
	   	} else {
		   	if(results.length != 0) {
				const error = new ApiError('User already exists', 401)
				res.status(401).json(error).end()
		   	} else {
				var sql = "INSERT INTO user (Voornaam, Achternaam, Email, Password) VALUES ?"
				var values = [[user.firstname, user.lastname, user.email, user.password]]
					
				db.query(sql, [values], function (error, results) {
					if (error) {
						next(error)
					} else {
						var sql = "SELECT * FROM user WHERE Email = ?"
						
						db.query(sql, [email], function (error, result) {
							if (error) {
								next(error);
							} else if (result[0].Email == email) {
								bcrypt.compare(password, result[0].Password, function(error, passResult) {
									if(passResult) {
										userId = result[0].ID
										var token = authentication.encodeToken(userId);
										
										res.status(200).json({
											token: token,
											email:  email 
										}).end()
									} else {
										const error = new ApiError('niet geautoriseerd', 401)
										res.status(401).json(error).end()
									}
								})
							}
						});
					};
				});
		   	}
	   }
	})
}

module.exports = {
	login,
	register
}