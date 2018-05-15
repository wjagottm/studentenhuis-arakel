let express = require('express')
let routes = express.Router()
let maaltijdcontroller = require('../controllers/maaltijd_controller')

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

//routes.post('studentenhuis/:huisId/maaltijd', maaltijdcontroller.addMaaltijd)
//routes.get('/studentenhuis/:huisId/maaltijd', maaltijdcontroller.getMaaltijden)
//routes.get('/studentenhuis/:huisId/maaltijd/:maaltijdId', maaltijdcontroller.getMaaltijdById)
//routes.put('/studentenhuis/:huisId/maaltijd/:maaltijdId', maaltijdcontroller.editMaaltijd)
//routes.delete('/studentenhuis/:huisId/maaltijd/:maaltijdId', maaltijdcontroller.deleteMaaltijd)

module.exports = routes