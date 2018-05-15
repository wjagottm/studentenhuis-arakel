//
// Studentenhuis Class
//

class Studentenhuis {

    constructor(huisNaam, huisAdres){
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