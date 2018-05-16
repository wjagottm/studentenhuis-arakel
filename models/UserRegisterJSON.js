//
//Register User class
//
const assert = require('assert')
const ApiError = require('./ApiError')

function validateEmail(email) {
    const validator = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validator.test(email);
}

class user {
	constructor(firstname, lastname, email, password) {

		try {
			assert(typeof (firstname) === 'string', 'firstname must be a string')
            assert(typeof (lastname) === 'string', 'lastname must be a string')
            assert(typeof (email) === 'string', 'email must be a string')
			assert(typeof (password) === 'string', 'password must be a string')

			assert(firstname.length > 2, 'firstname must be at least 3 characters')
			assert(lastname.length > 2, 'lastname must be at least 3 characters')
			assert(validateEmail, 'email must be a valid emailaddress')
		}
		catch(error){
			throw(new ApiError(ex.toString(), 422))
		}

		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.password = password;

	}

	getFirstName() {
		return this.firstname;
	}

	getLastName() {
		return this.lastname;
	}

	getEmail() {
		return this.email;
	}

	getPassword() {
		return this.password;
	}
}

module.exports = user;