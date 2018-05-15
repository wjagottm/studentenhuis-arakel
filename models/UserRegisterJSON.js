class user {
	constructor(firstname, lastname, email, password) {
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