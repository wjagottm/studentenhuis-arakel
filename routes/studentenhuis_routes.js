let express = require('express')
let routes = express.Router()
let studentenhuiscontroller = require('../controllers/studentenhuis_controller')
const auth = require('../auth/authentication')

routes.all( new RegExp("[^(\/login)]"), function (req, res, next) {

    //
    console.log("VALIDATE TOKEN")

    var token = (req.header('X-Access-Token')) || '';

    auth.decodeToken(token, (err, payload) => {
        if (err) {
            console.log('Error handler: ' + err.message);
            res.status((err.status || 401 )).json({error: new Error("Not authorised").message});
        } else {
            next();
        }
    });
});

routes.post('/studentenhuis', studentenhuiscontroller.createStudentenhuis)
routes.get('/studentenhuis', studentenhuiscontroller.getStudentenhuis)
routes.get('/studentenhuis/:id', studentenhuiscontroller.getStudentenhuisById)
routes.put('/studenthuis/:id', studentenhuiscontroller.editStudentenhuis)
routes.delete('/studentenhuis/:id', studentenhuiscontroller.deleteStudentenhuis)

module.exports = routes