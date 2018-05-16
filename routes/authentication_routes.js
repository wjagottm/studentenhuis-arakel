const express = require('express');
const router = express.Router();
const ApiError = require('../models/ApiError')

const authenticationcontroller = require('../controllers/authentication_controller');


const auth = require('../auth/authentication')

router.all( new RegExp("[^(\/login)][^(\/register)]"), function (req, res, next) {

    var token = (req.header('X-Access-Token')) || '';

    auth.decodeToken(token, (err, payload) => {
        if (err) {
            next(new ApiError('Niet geautoriseerd', 401))
        } else {
            next();
        }
    });
});

router.post('/login', authenticationcontroller.login);
router.post('/register', authenticationcontroller.register);

module.exports = router;