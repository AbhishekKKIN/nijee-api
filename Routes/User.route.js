const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/User.Controller');
const { authenticateJWT } = require('../middlewares/auth');

//Get a list of all items
router.get('/', authenticateJWT, UserController.getAllUsers);

//Create a new item
router.post('/registration', UserController.createNewUser);

//Get a item by id
router.get('/:id', authenticateJWT, UserController.findUserById);

// //Update a item by id
// router.patch('/:id', UserController.updateAPg);

// //Delete a item by id
// router.delete('/:id', UserController.deleteAPg);

module.exports = router;
