//
// CRUD operaties op studentenhuis
//
let Studentenhuis = require('../models/Studentenhuis')
const assert = require('assert')

let studentenhuislist = []

module.exports = {

    createStudentenhuis(req, res, next) {
        console.log('studentenhuiscontroller.createStudentenhuis')

        assert(req.body.huisNaam, 'Huisnaam must be provided')
        assert(req.body.huisAdres, 'Huis adres must be provided')

        const huisNaam = req.body.huisNaam
        const huisAdres = req.body.huisAdres
        console.log('We got ' + huisNaam + ', ' + huisAdres)

        let studentenhuis = new Studentenhuis(huisNaam, huisAdres)

        studentenhuislist.push(studentenhuis)

        res.status(200).json(studentenhuis).end();
    },

    getStudentenhuis(req, res, next) {
        res.status(200).json(studentenhuislist).end();
    },

    getStudentenhuisById(req, res, next) {
        let studentenhuis = studentenhuislist.find(req.params.id)
        res.status(200).json(studentenhuis).end();
    },

    editStudentenhuis(req, res, next) {
        let studentenhuis = studentenhuislist.find(req.params.id)
    },

    deleteStudentenhuis(req, res, next) {

    }

}