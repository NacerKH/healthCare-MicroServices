const appointmentController = require('../controllers/AppointmentController');
const appointmentValidator = require('../middlewares/AppointmentValidator');
const { upload } =require('../middlewares/Upload');

const router = require('express').Router();



// Create a new appointment
router.post('/addAppointment', appointmentValidator.validateAppointmentCreation,appointmentController.createAppointment);

// Get all appointments
router.get('/appointments',appointmentController.getAllAppointment);

// Get a specific appointment
router.get('/appointment/:id',appointmentController.getAppointment);

// Delete an appointment
router.delete('/appointment/:id', appointmentController.deleteAppointment);

// Update an appointment
router.put('/appointment/:id', appointmentController.updateAppointment);


// Research with MedicalSituation
router.get('/appointments', appointmentController.findAppointmentsByMedicalSituation);

// Get appointments for a specific user
router.get('/appointments/user/:userId', appointmentController.getAppointmentsByUser);

// Get appointments for a specific medicine
router.get('/appointments/medicine/:medicineId', appointmentController.getAppointmentsByMedicine);

/** This endPoint just for test  */
router.get('/first', (req, res) => {
    res.send('Hello, World!');
});

module.exports = router;