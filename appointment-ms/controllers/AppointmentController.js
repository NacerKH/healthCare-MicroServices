const mongoose = require('mongoose');
const AppointmentModel = require('../Models/Appointment')
const ObjectID = require('mongoose').Types.ObjectId;
const nodemailer = require('nodemailer');

// Create a transporter instance
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'cassandre.rodriguez@ethereal.email',
        pass: 'SVYVAP597f3BJrqn3D'
  }
});

module.exports.createAppointment = async (req, res) => {
  const newAppointment = new AppointmentModel({
    userId: req.body.userId,
    medicineId: req.body.medicineId,
    emailMed:req.body.emailMed,
    probableStartTime: req.body.probableStartTime,
    actualEndTime: req.body.actualEndTime,
    appointmentStatus: req.body.appointmentStatus,
    medicalSituation: req.body.medicalSituation,
    notes: req.body.notes,
    createdBy: req.body.createdBy
  });
  try {
    const appointment = await newAppointment.save();
    // Compose the email message
    console.log(req.body.emailMed);
    const mailOptions = {
      from: 'cassandre.rodriguez@ethereal.email',
      to: req.body.emailMed,
      subject: 'New Appointment Created',
      text: 'A new appointment has been created.'
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info);
      }
    });

    return res.status(201).json(appointment);
  } catch (err) {
    return res.status(400).send(err);
  }

}
module.exports.getAllAppointment = async (req, res) => {

  try {
    const appointment = await AppointmentModel.find();
    return res.status(200).json(appointment);
  } catch (err) {
    return res.status(400).send(err);
  }

}
module.exports.getAppointment = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  AppointmentModel.findById({ _id: req.params.id }, (err, data) => {
    if (!err && data) return res.send(data);
    else console.log('ID unknow : ' + err);
  });


}


module.exports.deleteAppointment = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);

  try {
    const deletedAppointment = await AppointmentModel.findByIdAndDelete({
      _id: req.params.id
    });
    if (!deletedAppointment)
      return res.status(404).send("Appointment not found");

    return res.status(200).json(deletedAppointment);
  } catch (err) {
    return res.status(500).send(err);
  }
};


module.exports.updateAppointment = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);

  try {
    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    if (!updatedAppointment)
      return res.status(404).send("Appointment not found");

    return res.status(200).json(updatedAppointment);
  } catch (err) {
    return res.status(500).send(err);
  }
};
