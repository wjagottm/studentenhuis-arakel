const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjY1MDYxMjYsImlhdCI6MTUyNjUwMjUyNiwic3ViIjoxM30.w3DpulPEZXjZyhS9pOnc-3-nIK6aRqBdRd2ppX5X80I'

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
            'huisNaam' : 'Avans',
            'huisAdres' : 'Hogeschoollaan, Breda'
        })
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')

            let response = res.body.result[0]
            response.should.have.property('ID')
            response.should.have.property('Naam').equals('Avans')
            response.should.have.property('Adres').equals('Hogeschoollaan, Breda')
            response.should.have.property('Contact')
            response.should.have.property('Email')
            
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
            "huisAdres": "Claudius Prinsenlaan, Breda"
        })
        .end((err, res) => {
            res.should.have.status(412);
            res.body.should.be.a('object')

            const error = res.body
            error.should.have.property('message')
            error.should.have.property('code').equals(412)
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
            'huisNaam' : 'NHTV'
        })
        .end((err, res) => {
            res.should.have.status(412);
            res.body.should.be.a('object')

            const error = res.body
            error.should.have.property('message')
            error.should.have.property('code').equals(412)
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
            .set('X-access-token', '54vsc6546dgv4545.5sa6546sd8.7a8sad54')
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
            .set('X-access-token', token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                
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
            .set('X-access-token', '54vsc6546dgv4545.5sa6546sd8.7a8sad54')
            .end((err, res) => {
                done()
            })
    })

    it('should return the correct studentenhuis when using an eXisting huisId', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
            .get('/api/studentenhuis/1')
            .set('X-access-token', token)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.result[0].should.have.property("ID").and.equal(1)
                done()
            })
    })

    it('should return an error when using an non-eXisting huisId', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
            .get('/api/studentenhuis/2000000')
            .set('X-access-token', token)
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
})

describe('Studentenhuis API PUT', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
            .put('/api/studentenhuis/1')
            .set('X-access-token', '54vsc6546dgv4545.5sa6546sd8.7a8sad54')
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')

                done()
            })
    })

    it('should return a studentenhuis with ID when posting a valid object', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
        .put('/api/studentenhuis/3')
        .set({'X-Access-Token': token})
        .send({
            'huisNaam' : 'Avans',
            'huisAdres' : 'Hogeschoollaan, Breda'
        })
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')

            let response = res.body.result[0]
            response.should.have.property('ID')
            response.should.have.property('Naam').equals('Avans')
            response.should.have.property('Adres').equals('Hogeschoollaan, Breda')
            response.should.have.property('Contact')
            response.should.have.property('Email')

            done()
        })
    })

    it('should throw an error when naam is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
            .put('/api/studentenhuis/1')
            .set('X-access-token', token)
            .send({
                "adres": "Chasse, Breda"
            })
            .end((err, res) => {
                res.should.have.status(412)


                done()
            })
    })

    it('should throw an error when adres is missing', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
            .put('/api/studentenhuis/1')
            .set('X-access-token', token)
            .send({
                "naam": "Hogeschool"
            })
            .end((err, res) => {
                res.should.have.status(412)

                done()
            })
    })
})

describe('Studentenhuis API DELETE', () => {
    it('should throw an error when using invalid JWT token', (done) => {
        //
        // Hier schrijf je jouw testcase.
        //
        chai.request(server)
            .delete('/api/studentenhuis/2')
            .set('X-access-token', '54vsc6546dgv4545.5sa6546sd8.7a8sad54')
            .end((err, res) => {
            
                done()
            })
    })

    it('should give notice that studentenhuis is deleted', (done) => {
        //
        // Deze is zelf geïmplementeerd aan de hand van de Swaggger UI
        //

        chai.request(server)
            .delete('/api/studentenhuis/4')
            .set('X-access-token', token)
            .end((err, res) => {
                //res.body.result = 1
                res.should.have.status(200)
                done()
            })
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