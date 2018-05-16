let express = require('express')
let routes = express.Router()
let maaltijdcontroller = require('../controllers/maaltijd_controller')

routes.post('/studentenhuis/:huisId/maaltijd', maaltijdcontroller.addMaaltijd)
routes.get('/studentenhuis/:huisId/maaltijd', maaltijdcontroller.getAllMaaltijd)
routes.get('/studentenhuis/:huisId/maaltijd/:maaltijdId', maaltijdcontroller.getMaaltijdById)
routes.put('/studentenhuis/:huisId/maaltijd/:maaltijdId', maaltijdcontroller.editMaaltijd)
routes.delete('/studentenhuis/:huisId/maaltijd/:maaltijdId', maaltijdcontroller.deleteMaaltijd)

module.exports = routes