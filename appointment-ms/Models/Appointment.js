const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medicine',
      required: true
    },
    probableStartTime: {
      type: Date,
      required: true
    },
    actualEndTime: {
      type: Date,
      required: true
    },
    appointmentStatus: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled'
    },
    medicalSituation: {
      type: String,
      required: true
    },
    notes: {
      type: String
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

const AppointmentModel = mongoose.model('Appointment', AppointmentSchema);
module.exports = AppointmentModel;
