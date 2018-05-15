const express = require('express');
const router = express.Router();

const authenticationcontroller = require('../controllers/authentication_controller');

router.post('/login', authenticationcontroller.login);
router.post('/register', authenticationcontroller.register);

module.exports = router;