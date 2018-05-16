const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjY1MDEzMzgsImlhdCI6MTUyNjQ5NzczOCwic3ViIjoxM30.7GkwXJEE33GGxX_J49zBQTkNFqj63ydEJb5qqgnWBSY'

chai.should()
chai.use(chaiHttp)

describe('Studentenhuis API POST', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
            .post('/api/studentenhuis')
            .set({'X-Access-Token':'54vsc6546dgv4545.5sa6546sd8.7a8sad54'})
            .send({
                'Naam' : 'Lovensdijk',
                'Adres' : 'Lovensdijkstraat, Breda'
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

    it('should return a studentenhuis when posting a valid object', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .post('/api/studentenhuis')
        .set({'X-Access-Token': token})
        .send({
            'Naam' : 'Avans',
            'Adres' : 'Hogeschoollaan, Breda'
        })
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')

            let response = res.body
            response.should.have.property('Naam').equals('Avans')
            response.should.have.property('Adres').equals('Hogeschoollaan, Breda')

            done()
        })
    })

    it('should throw an error when naam is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .post('/api/studentenhuis')
        .set({'X-Access-Token': token})
        .send({
            "Adres": "Claudius Prinsenlaan, Breda"
        })
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object')

            const error = res.body
            error.should.have.property('message')
            error.should.have.property('code').equals(404)
            error.should.have.property('datetime')

        done()
        })
    })

    it('should throw an error when adres is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .post('/api/studentenhuis')
        .set({'X-Access-Token': token})
        .send({
            'Naam' : 'NHTV'
        })
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object')

            const error = res.body
            error.should.have.property('message')
            error.should.have.property('code').equals(404)
            error.should.have.property('datetime')

        done()
        })
    })
})

describe('Studentenhuis API GET all', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
            .get('/api/studentenhuis')
            .set('x-access-token', '54vsc6546dgv4545.5sa6546sd8.7a8sad54')
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should return all studentenhuizen when using a valid token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
            .get('/api/studentenhuis')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property()
                
            done()
            })
    })
})

describe('Studentenhuis API GET one', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
            .get('/api/studentenhuis')
            .set('x-access-token', '54vsc6546dgv4545.5sa6546sd8.7a8sad54')
            .end((err, res) => {
                done()
            })
    })

    it('should return the correct studentenhuis when using an existing huisId', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should return an error when using an non-existing huisId', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })
})

describe('Studentenhuis API PUT', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should return a studentenhuis with ID when posting a valid object', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when naam is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when adres is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })
})

describe('Studentenhuis API DELETE', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should return a studentenhuis when posting a valid object', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when naam is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })

    it('should throw an error when adres is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        done()
    })
})