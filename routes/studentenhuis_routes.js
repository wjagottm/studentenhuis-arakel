let express = require('express')
let routes = express.Router()
let studentenhuiscontroller = require('../controllers/studentenhuis_controller')

routes.post('/studentenhuis', studentenhuiscontroller.createStudentenhuis)
routes.get('/studentenhuis', studentenhuiscontroller.getStudentenhuis)
routes.get('/studentenhuis/:id', studentenhuiscontroller.getStudentenhuisById)
routes.put('/studenthuis/:id', studentenhuiscontroller.editStudentenhuis)
routes.delete('/studentenhuis/:id', studentenhuiscontroller.deleteStudentenhuis)

module.exports = routes