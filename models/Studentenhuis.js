//
// Studentenhuis Class
//
const assert = require('assert')
const ApiError = require('./ApiError')

class Studentenhuis {

    constructor(huisNaam, huisAdres){
        try {
            assert(typeof (huisNaam) === 'string', 'huis naam must be a string')
            assert(typeof (huisAdres) === 'string', 'huis adres must be a string')
        } catch (error) {
            throw(new ApiError(ex.toString(), 422))
        }

        this.huisNaam = huisNaam
        this.huisAdres = huisAdres
    }

    getHuisNaam() {
        return this.huisNaam
    }

    getHuisAdres() {
        return this.huisAdres
    }
}

module.exports = Studentenhuis;