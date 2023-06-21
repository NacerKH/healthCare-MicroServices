const appointmentController = require('../controllers/AppointmentController');
//const { AddUserValidation } =  require('../middlewares/Validation');
const { upload } =require('../middlewares/Upload');

const router = require('express').Router();



// Create a new appointment
router.post('/addAppointment', upload,appointmentController.createAppointment);

// Get all appointments
router.get('/appointments',appointmentController.getAllAppointment);

// Get a specific appointment
router.get('/appointment/:id',appointmentController.getAppointment);

// Delete an appointment
router.delete('/appointment/:id', appointmentController.deleteAppointment);

// Update an appointment
router.put('/appointment/:id', appointmentController.updateAppointment);

/** This endPoint just for test  */
router.get('/first', (req, res) => {
    res.send('Hello, World!');
});

module.exports = router;