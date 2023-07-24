import { Component, OnInit } from '@angular/core';
import { Complaint } from '../../../api/Complaint';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ComplaintService } from '../../../service/complaint.service';

@Component({
    templateUrl: './complaint-front.component.html',
    providers: [MessageService],
})
export class ComplaintFrontComponent implements OnInit {
    complaintDialog: boolean = false;
    deleteComplaintDialog: boolean = false;
    deleteComplaintsDialog: boolean = false;
    complaints: Complaint[] = [];
    complaint: Complaint | any;

    selectedComplaints: Complaint[] = [];
    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
    userId: any;
    constructor(
        private complaintService: ComplaintService,
        private messageService: MessageService
    ) { }

    ngOnInit() {

        this.userId = localStorage.getItem('user');
        this.complaintService
            .getComplaintsByUser(this.userId)
            .then((data) => {
                this.complaints = data || [];
                console.log('hello', this.complaints);
            })
            .catch((error) => {
                console.error('Error fetching complaints:', error);
                this.complaints = [];
            });

        this.cols = [
            { field: 'medecineId', header: 'medecineId' },
            { field: 'userId', header: 'userId' },
            { field: 'title', header: 'title' },
            { field: 'description', header: 'description' },
            { field: 'type', header: 'type' },
        ];

    }

    openNew() {
        this.complaint = {
            _id: '',
            medecineId: 0,
            userId: 0,
            title: '',
            description: '',
            type: '',

        };
        this.submitted = false;
        this.complaintDialog = true;
    }

    deleteSelectedComplaints() {
        this.deleteComplaintsDialog = true;
    }

    editComplaint(complaint: Complaint) {
        this.complaint = { ...complaint };
        this.complaintDialog = true;
    }

    deleteComplaint(complaint: Complaint) {
        this.deleteComplaintDialog = true;
        this.complaint = { ...complaint };
    }

    confirmDeleteSelected() {
        this.deleteComplaintsDialog = false;
        this.complaints = this.complaints.filter(
            (val) => !this.selectedComplaints.includes(val)
        );

        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Complaints Deleted',
            life: 3000,
        });
        this.selectedComplaints = [];
    }

    confirmDelete() {
        this.deleteComplaintDialog = false;


        if (this.complaint && this.complaint._id) {
            this.complaintService
                .deleteComplaint(this.complaint && this.complaint._id)
                .then(() => {
                    this.complaints = this.complaints.filter(
                        (val) => val._id !== this.complaint?._id
                    );

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Complaint Deleted',
                        life: 3000,
                    });

                    this.complaint = {
                        id: '',
                        medicineId: 0,
                        userId: 0,
                        title: '',
                        description: '',
                        type: '',
                    };
                })
                .catch((error) => {
                    console.error('Error deleting complaint:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to delete complaint',
                        life: 3000,
                    });
                });
        }
    }

    hideDialog() {
        this.complaintDialog = false;
        this.submitted = false;
    }

    saveComplaint() {
        this.submitted = true;

        if (this.complaint?._id) {
            this.complaintService
                .updateComplaint(this.complaint._id, this.complaint)
                .then((res) => {
                    if (res) {
                        const index = this.findIndexById(res._id);
                        if (index !== -1) {
                            this.complaints[index] = res;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'Complaint Updated',
                                life: 3000,
                            });
                        } else {
                            console.error(
                                'Complaint not found in the list'
                            );
                        }
                    } else {
                        console.error('Failed to update complaint:', res);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to update complaint',
                            life: 3000,
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error updating complaint:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to update complaint',
                        life: 3000,
                    });
                });
        } else {
            this.complaintService
                .createComplaint(this.complaint)
                .then((res) => {
                    if (res && res._id) {
                        this.complaint._id = res._id;
                        this.complaints.push(this.complaint);
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Complaint Created',
                            life: 3000,
                        });
                    } else {
                        console.error('Failed to create complaint:', res);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to create complaint',
                            life: 3000,
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error creating complaint:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to create complaint',
                        life: 3000,
                    });
                });
        }

        this.complaints = [...this.complaints];
        this.complaintDialog = false;
        this.complaint = {
            id: '',
            medicineId: 0,
            userId: 0,
            title: '',
            description: '',
            type: '',
        };
    }

    findIndexById(_id: string | undefined): number {
        if (_id === undefined) {
            return -1; // Return -1 or any appropriate value to indicate that the id is not found.
        }

        for (let i = 0; i < this.complaints.length; i++) {
            if (this.complaints[i]._id === _id) {
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

    // Function to validate the complaint before saving
    validateComplaint(complaint: any): boolean {
        // Perform your validation logic here
        // For example, check if all the required fields are filled

        if (
            complaint.medicalSituation.trim() === '' ||
            complaint.probableStartTime.trim() === '' ||
            complaint.actualEndTime.trim() === '' ||
            complaint.appointmentStatus.trim() === '' ||
            complaint.emailMed.trim() === '' ||
            complaint.medicineId.trim() === '' ||
            complaint.userId.trim() === ''
        ) {
            return false; // Validation failed
        }

        return true; // Validation passed
    }
}
