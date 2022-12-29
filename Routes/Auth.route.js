const express = require('express');
const router = express.Router();

const AuthController = require('../Controllers/Auth.Controller');

// Authenticate Users
router.post('/', AuthController.authenticate);


module.exports = router;
