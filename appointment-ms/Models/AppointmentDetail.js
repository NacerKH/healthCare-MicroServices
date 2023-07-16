const mongoose = require('mongoose');

const AppointmentDetailSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true
    },
    detailField: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

const AppointmentDetailModel = mongoose.model('AppointmentDetail', AppointmentDetailSchema);
module.exports = AppointmentDetailModel;
