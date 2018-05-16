//
// Maaltijd Class
//

class Maaltijd {
    constructor (maaltijdId, maaltijdNaam, maaltijdBeschrijving, maaltijdIngrediënten, maaltijdAllergie, maaltijdPrijs) {
    try {
        assert(typeof (maaltijdNaam) === 'string', 'maaltijd name must be a string')
        assert(typeof (maaltijdBeschrijving) === 'string', 'maaltijd beschrijving must be a string')
        assert(typeof (maaltijdIngrediënten) === 'string', 'maaltijd ingrediënten must be a string')
        assert(typeof (maaltijdAllergie) === 'string', 'maaltijd allergie must be a string')
        assert(typeof (maaltijdPrijs) === 'string', 'maaltijd prijs must be a string')
    } catch (error) {
        throw(new ApiError(error.toString(), 422))
    }

    this.maaltijdId = maaltijdId
    this.maaltijdNaam = maaltijdNaam
    this.maaltijdBeschrijving = maaltijdBeschrijving
    this.maaltijdIngrediënten = maaltijdIngrediënten
    this.maaltijdAllergie = maaltijdAllergie
    this.maaltijdPrijs = maaltijdPrijs
    }

    getMaaltijdId() {
        return this.maaltijdId
    }

    getMaaltijdNaam() {
        return this.maaltijdNaam
    }

    getMaaltijdBeschijving() {
        return this.maaltijdBeschrijving
    }

    getMaaltijdIngrediënten() {
        return this.maaltijdIngrediënten
    }

    getMaaltijdPrijs() {
        return this.maaltijdPrijs
    }
}

module.exports = Maaltijd;