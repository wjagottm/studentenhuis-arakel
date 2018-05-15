//
// Deelnemer class
//

class Deelnemer {

    constructor(deelnemerId, deelnemerVoornaam, deelnemerAchternaam, email, huisId, maaltijdId){
        this.deelnemerId = deelnemerId
        this.deelnemerNaam = deelnemerNaam
        this.huisId = huisId
        this.maaltijdId = maaltijdId
    }

    getDeelnemerId() {
        return this.deelnemerId
    }

    getDeelnemerNaam() {
        return this.deelnemerNaam
    }

    getDeelnemerHuisId() {
        return this.huisId
    }

    getDeelnemerMaaltijdId() {
        return this.maaltijdId
    }
}

module.exports = Deelnemer;