export interface Appointment {
    _id?: string;
    userId?: string;
    medicineId?: string;
    emailMed?: string;
    probableStartTime?: string;
    actualEndTime?: string;
    appointmentStatus?: string;
    medicalSituation?: string;
    notes?: string;
    // Add other properties as needed for your appointment model
  }
