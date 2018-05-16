//
// Login User class
//
const assert = require('assert')
const ApiError = require('./ApiError')

function validateEmail(email) {
    const validator = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validator.test(email);
}

class user {
	constructor(email, password) {
		try {
			assert(typeof (email) === 'string', 'email must be a string')
			assert(typeof (password) === 'string', 'password must be a string')
			assert(validateEmail(email.trim()), 'email must be a valid emailaddress')
		} catch (error) {
			throw(new ApiError(error.toString(), 412))
		}
		this.email = email;
		this.password = password;
	}

	getEmail() {
		return this.email;
	}

	getPassword() {
		return this.password;
	}
}

module.exports = user;