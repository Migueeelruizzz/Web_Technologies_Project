const { Router } = require('express');
const registrationController = require('../controllers/registration.controller');

const router = Router();

router.get('/', registrationController.getAllRegistrations);
router.get('/:id', registrationController.getRegistrationById);
router.post('/', registrationController.createRegistration);
router.put('/:id', registrationController.updateRegistration);
router.delete('/:id', registrationController.deleteRegistration);

module.exports = router;
