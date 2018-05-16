const express = require('express');
const router = express.Router();

const authenticationcontroller = require('../controllers/authentication_controller');


const auth = require('../auth/authentication')

router.all( new RegExp("[^(\/login)][^(\/register)]"), function (req, res, next) {

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

router.post('/login', authenticationcontroller.login);
router.post('/register', authenticationcontroller.register);

module.exports = router;