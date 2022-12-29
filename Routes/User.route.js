const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/User.Controller');

//Get a list of all items
router.get('/', UserController.getAllUsers);

//Create a new item
router.post('/', UserController.createNewUser);

//Get a item by id
router.get('/:id', UserController.findUserById);

// //Update a item by id
// router.patch('/:id', UserController.updateAPg);

// //Delete a item by id
// router.delete('/:id', UserController.deleteAPg);

module.exports = router;
