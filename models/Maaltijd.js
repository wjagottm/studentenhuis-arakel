//
// Maaltijd Class
//

class Maaltijd {
    constructor (maaltijdId, maaltijdNaam, maaltijdBeschrijving, maaltijdIngrediënten, maaltijdAllergie, maaltijdPrijs) {
    this.maaltijdId = maaltijdId
    this.maaltijdNaam = maaltijdNaam
    this.maaltijdBeschrijving = maaltijdBeschrijving
    this.maaltijdIngrediënten = maaltijdIngrediënten
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