const mongoose = require('mongoose');
const AppointmentModel = require('../Models/Appointment');
const AppointmentDetailModel = require('../Models/AppointmentDetail');
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
    emailMed: req.body.emailMed,
    probableStartTime: req.body.probableStartTime,
    actualEndTime: req.body.actualEndTime,
    appointmentStatus: req.body.appointmentStatus,
    medicalSituation: req.body.medicalSituation,
    notes: req.body.notes,
    createdBy: req.body.createdBy
  });

  try {
    const savedAppointment = await newAppointment.save();

    const newAppointmentDetail = new AppointmentDetailModel({
      appointmentId: savedAppointment._id,
      detailField: req.body.detailField,
      // Add more fields as needed
    });

    const savedAppointmentDetail = await newAppointmentDetail.save();

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

    return res.status(201).json(savedAppointment);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.getAllAppointment = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find().populate('appointmentDetail');
    return res.status(200).json(appointments);
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.getAppointment = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  AppointmentModel.findById({ _id: req.params.id })
    .populate('appointmentDetail')
    .exec((err, data) => {
      if (!err && data) return res.send(data);
      else console.log('ID unknown : ' + err);
    });
};

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
    ).populate('appointmentDetail');

    if (!updatedAppointment)
      return res.status(404).send("Appointment not found");

    return res.status(200).json(updatedAppointment);
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports.findAppointmentsByMedicalSituation = async (req, res) => {
  const medicalSituation = req.query.medicalSituation; // Retrieve the medicalSituation from query parameters

  try {
    const appointments = await AppointmentModel.find({
      medicalSituation: { $regex: medicalSituation, $options: 'i' }
    }).populate('appointmentDetail');
    return res.status(200).json(appointments);
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Get appointments for a specific user
module.exports.getAppointmentsByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const appointments = await AppointmentModel.find({ userId }).populate('appointmentDetail');
    return res.status(200).json(appointments);
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Get appointments for a specific medicine
module.exports.getAppointmentsByMedicine = async (req, res) => {
  const medicineId = req.params.medicineId;

  try {
    const appointments = await AppointmentModel.find({ medicineId }).populate('appointmentDetail');
    return res.status(200).json(appointments);
  } catch (err) {
    return res.status(400).send(err);
  }
};
