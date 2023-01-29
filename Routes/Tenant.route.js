const express = require('express');
const router = express.Router();

const TenantController = require('../Controllers/Tenant.Controller');

router.post('/', TenantController.createTenant);
router.get('/', TenantController.getAllTenants);
router.get('/:id', TenantController.getTenantById);
router.get('/ByPg/:id', TenantController.getTenantsByPg);

module.exports = router;
