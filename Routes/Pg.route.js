const express = require('express');
const router = express.Router();

const PgController = require('../Controllers/Pg.Controller');

//Get a list of all items
router.get('/', PgController.getAllPgs);

//Create a new item
router.post('/', PgController.createNewPg);

//Get a item by id
router.get('/:id', PgController.findPgById);

router.get('/:id/tenants', PgController.getTenants);

//Update a item by id
router.patch('/:id', PgController.updateAPg);

//Delete a item by id
router.delete('/:id', PgController.deleteAPg);

module.exports = router;
