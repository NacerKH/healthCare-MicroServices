const AppointmentModel = require('../Models/Appointment');

// Middleware to validate appointment creation
const validateAppointmentCreation = async (req, res, next) => {
  const { probableStartTime, actualEndTime } = req.body;

  // Check if there is another appointment at the same time
  const existingAppointment = await AppointmentModel.findOne({
    probableStartTime: probableStartTime,
    actualEndTime: actualEndTime
  });

  if (existingAppointment) {
    return res.status(400).json({ error: 'Another appointment already exists at the same time.' });
  }

  // If no overlapping appointment found, proceed to the next middleware/route handler
  next();
};

module.exports = {
  validateAppointmentCreation
};
