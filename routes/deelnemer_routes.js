let express = require('express')
let routes = express.Router()
let deelnemercontroller = require('../controllers/deelnemer_controller')

const auth = require('../auth/authentication')

routes.all( new RegExp("[^(\/login)][^(\/register)]"), function (req, res, next) {

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

//routes.post('/studentenhuis/:huisId/maaltijd/:maaltijdId/deelnemers', deelnemercontroller.addDeelnemer)
//routes.get('/studentenhuis/:huisId/maaltijd/:maaltijdId/deelnemers', deelnemercontroller.getDeelnemers)
//routes.delete('/studentenhuis/:huisId/maaltijd/:maaltijdId/deelnemers', deelnemercontroller.deleteDeelnemer)

module.exports = routes