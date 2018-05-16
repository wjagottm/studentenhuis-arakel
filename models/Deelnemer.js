//
// Deelnemer class
//

class Deelnemer {

    constructor(deelnemerId, deelnemerVoornaam, deelnemerAchternaam, email, huisId, maaltijdId){
        try {
            assert(typeof (deelnemerVoornaam) === 'string', 'deelnemer voornaam must be a string')
            assert(typeof (deelnemerAchternaam) === 'string', 'deelnemer achternaam must be a string')
            assert(typeof (email) === 'string', 'email must be a string')
        } catch (error) {
            throw(new ApiError(error.toString(), 422))
        }
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