/**
 * Testcases aimed at testing the authentication process. 
 */
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.should()
chai.use(chaiHttp)

// After successful registration we have a valid token. We export this token
// for usage in other testcases that require login.
let validToken

describe('Registration', () => {
    it('should return a token when providing valid information', (done) => {
        chai.request(server)
            .post('/api/register')
            .send({
                'firstname' : 'firstname',
                'lastname' : 'lastname',
                'email' : 'test1@test.nl',
                'password' : 'secret'
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property('token').which.is.a('string')

                validToken = res.body.token
                module.exports = {
                    token: validToken
                }
                done()
            })

        // Tip: deze test levert een token op. Dat token gebruik je in 
        // andere testcases voor beveiligde routes door het hier te exporteren
        // en in andere testcases te importeren via require.
        
    })

    it('should return an error on GET request', (done) => {
        chai.request(server)
        .get('/api/register')
        .end((err, res) => {
            res.should.have.status(404)
            res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(404)
                error.should.have.property('datetime')
                done()
        }) 
    })

    it('should throw an error when the user already exists', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
            .post('/api/register')
            .send({
                "firstname": "firstname",
                "lastname": "lastname",
                "email": "test1@test.com",
                "password": "secret"
            })
            .end((err, res) => {
                res.should.have.status(401)

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should throw an error when no firstname is provided', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .post('/api/register')
        .send({
            'lastname': 'lastname',
            'email' : 'test1@test.nl',
            'password' : 'secret'

        })
        .end((err, res) => {
            res.should.have.status(412)
            res.body.should.be.a('object')

            const error = res.body
            error.should.have.property('message')
            error.should.have.property('code').equals(412)
            error.should.have.property('datetime')

            done()
        })
    })

    it('should throw an error when firstname is shorter than 2 chars', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
            .post('/api/register')
            .send({
                'firstname': 'f',
                'lastname': 'lastname',
                'email': 'email@email.com',
                'password': 'secret'
            })
            .end( (err, res) => {
                res.should.have.status(412)
                //res.body.should.be.length() > 2

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')

                done()
            })
    })

    it('should throw an error when no lastname is provided', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
            .post('/api/register')
            .send({
                'firstname': 'firstname',
                'email' : 'test1@test.nl',
                'password' : 'secret'
            })
            .end((err, res) => {
                res.should.have.status(412)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')

                done()
            })
    })

    it('should throw an error when lastname is shorter than 2 chars', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
            .post('/api/register')
            .send({
                'firstname': 'firstname',
                'lastname': 'l',
                'email': 'email@email.com',
                'password': 'secret'
            })
            .end( (err, res) => {
                res.should.have.status(412)
                //res.body.length.should.be > 2

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')

                done()
            })        
    })

    it('should throw an error when email is invalid', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
            .post('/api/register')
            .send({
                'firstname': 'firstname',
                'lastname': 'lastname',
                'email': 'emailemail.com',
                'password': 'secret'
            })
            .end( (err, res) => {
                res.should.have.status(412)

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(412)
                error.should.have.property('datetime')

                done()
            }) 
    })

})

describe('Login', () => {

    it('should return a token when providing valid information', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .post('/api/login')
        .send({
            'firstname' : 'firstname',
            'lastname' : 'lastname',
            'email' : 'test1@test.nl',
            'password' : 'secret'
        })
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')

            const response = res.body
            response.should.have.property('token').which.is.a('string')

            validToken = res.body.token
            module.exports = {
                token: validToken
            }
            done()  
        })
    })

    it('should throw an error when email does not exist', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .post('/api/login')
        .send({
            'email': 'email@email.com',
            'password': 'secret'
        })
        .end( (err, res) => {
            res.should.have.status(412)

            const error = res.body
            error.should.have.property('message')
            error.should.have.property('code').equals(412)
            error.should.have.property('datetime')

        done()
        })
    })

    it('should throw an error when email exists but password is invalid', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .post('/api/login')
        .send({
            'email' : 'test1@test.nl',
            'password' : 123456
        })
        .end((err, res) => {
            res.should.have.status(412)

            const error = res.body
            error.should.have.property('message')
            error.should.have.property('code').equals(412)
            error.should.have.property('datetime')

            done()
        })
    })

    it('should throw an error when using an invalid email', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .post('/api/login')
        .send({
            'email' : 'test1test.nl',
            'password' : 'secret'
        })
        .end((err, res) => {
            res.should.have.status(412)

            const error = res.body
            error.should.have.property('message')
            error.should.have.property('code').equals(412)
            error.should.have.property('datetime')

            done()
        })
    })
})