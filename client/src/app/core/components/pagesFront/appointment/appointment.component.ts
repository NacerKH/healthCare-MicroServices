import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../../api/Appointment'; // Replace 'path-to-appointment-model' with the actual path to the Appointment model
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AppointmentService } from '../../../service/appointment.service'; // Replace 'path-to-appointment-service' with the actual path to the AppointmentService

@Component({
    templateUrl: './appointment.component.html',
    providers: [MessageService],
})
export class AppointmentComponent implements OnInit {
    appointmentDialog: boolean = false;

    deleteAppointmentDialog: boolean = false;

    deleteAppointmentsDialog: boolean = false;

    appointments: Appointment[] = [];

    appointment: Appointment = {};

    selectedAppointments: Appointment[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    medicalSituations: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private appointmentService: AppointmentService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.appointmentService
            .getAllAppointments()
            .then((data) => {
                this.appointments = data || []; // Assign data to appointments or use an empty array if data is undefined
                console.log('hello', this.appointments);
            })
            .catch((error) => {
                console.error('Error fetching appointments:', error);
                this.appointments = []; // Assign an empty array in case of an error
            });

        this.cols = [
            { field: 'medicalSituation', header: 'Medical Situation' },
            { field: 'probableStartTime', header: 'Start Time' },
            { field: 'actualEndTime', header: 'End Time' },
            { field: 'appointmentStatus', header: 'Status' },
        ];

        // You can customize the medicalSituations as needed.
        this.medicalSituations = [
            { label: 'Medical Situation 1', value: 'situation1' },
            { label: 'Medical Situation 2', value: 'situation2' },
            // Add more medical situations as needed
        ];
    }

    openNew() {
        this.appointment = {};
        this.submitted = false;
        this.appointmentDialog = true;
    }

    deleteSelectedAppointments() {
        this.deleteAppointmentsDialog = true;
    }

    editAppointment(appointment: Appointment) {
        this.appointment = { ...appointment };
        this.appointmentDialog = true;
    }

    deleteAppointment(appointment: Appointment) {
        this.deleteAppointmentDialog = true;
        this.appointment = { ...appointment };
    }

    confirmDeleteSelected() {
        this.deleteAppointmentsDialog = false;
        this.appointments = this.appointments.filter(
            (val) => !this.selectedAppointments.includes(val)
        );

        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Appointments Deleted',
            life: 3000,
        });
        this.selectedAppointments = [];
    }

    confirmDelete() {
        this.deleteAppointmentDialog = false;

        // Ensure that the appointment has a valid _id before attempting deletion
        if (this.appointment._id) {
            // Call the appointmentService to delete the appointment
            this.appointmentService
                .deleteAppointment(this.appointment._id)
                .then(() => {
                    // If the deletion is successful, remove the appointment from the appointments array
                    this.appointments = this.appointments.filter(
                        (val) => val._id !== this.appointment._id
                    );

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Appointment Deleted',
                        life: 3000,
                    });

                    this.appointment = {};
                })
                .catch((error) => {
                    console.error('Error deleting appointment:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to delete appointment',
                        life: 3000,
                    });
                });
        }
    }

    hideDialog() {
        this.appointmentDialog = false;
        this.submitted = false;
    }

    saveAppointment() {
        this.submitted = true;

        if (this.appointment.medicalSituation?.trim()) {
            if (this.appointment._id) {
                this.appointmentService
                    .updateAppointment(this.appointment._id, this.appointment)
                    .then((res) => {
                        if (res) {
                            const index = this.findIndexById(res._id);
                            if (index !== -1) {
                                this.appointments[index] = res;
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Successful',
                                    detail: 'Appointment Updated',
                                    life: 3000,
                                });
                            } else {
                                console.error(
                                    'Appointment not found in the list'
                                );
                            }
                        } else {
                            console.error('Failed to update appointment:', res);
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Failed to update appointment',
                                life: 3000,
                            });
                        }
                    })
                    .catch((error) => {
                        console.error('Error updating appointment:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to update appointment',
                            life: 3000,
                        });
                    });
            } else {
                this.appointmentService
                    .createAppointment(this.appointment)
                    .then((res) => {
                        if (res && res._id) {
                            this.appointment._id = res._id;
                            this.appointments.push(this.appointment);
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'Appointment Created',
                                life: 3000,
                            });
                        } else {
                            console.error('Failed to create appointment:', res);
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Failed to create appointment',
                                life: 3000,
                            });
                        }
                    })
                    .catch((error) => {
                        console.error('Error creating appointment:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to create appointment',
                            life: 3000,
                        });
                    });
            }

            this.appointments = [...this.appointments];
            this.appointmentDialog = false;
            this.appointment = {};
        }
    }

    findIndexById(_id: string | undefined): number {
        if (_id === undefined) {
            return -1; // Return -1 or any appropriate value to indicate that the id is not found.
        }

        for (let i = 0; i < this.appointments.length; i++) {
            if (this.appointments[i]._id === _id) {
                return i; // Return the index when the id is found.
            }
        }

        return -1; // Return -1 or any appropriate value to indicate that the id is not found.
    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    // Function to validate the appointment before saving
    validateAppointment(appointment: any): boolean {
        // Perform your validation logic here
        // For example, check if all the required fields are filled

        if (
            appointment.medicalSituation.trim() === '' ||
            appointment.probableStartTime.trim() === '' ||
            appointment.actualEndTime.trim() === '' ||
            appointment.appointmentStatus.trim() === '' ||
            appointment.emailMed.trim() === '' ||
            appointment.medicineId.trim() === '' ||
            appointment.userId.trim() === ''
        ) {
            return false; // Validation failed
        }

        return true; // Validation passed
    }
}
