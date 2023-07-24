import { Component, OnInit } from '@angular/core';
import { User } from '../../../api/User'; // Replace 'path-to-user-model' with the actual path to the User model
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserService } from 'src/app/core/service/user.service'; // Replace 'path-to-user-service' with the actual path to the UserService

@Component({
    templateUrl: './user.component.html',
    providers: [MessageService],
})
export class UserComponent implements OnInit {
    userDialog: boolean = false;

    deleteUserDialog: boolean = false;

    deleteUsersDialog: boolean = false;

    users: User[] = [];

    user: User = {};

    selectedUsers: User[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    userRoles: any[] = [
        { label: 'Patient', value: 'patient' },
        { label: 'Medecin', value: 'medecin' }
      ];

    constructor(
        private userService: UserService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.userService
            .getAllUsers()
            .then((data) => {
                this.users = data || []; // Assign data to users or use an empty array if data is undefined
                console.log('hello', this.users);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
                this.users = []; // Assign an empty array in case of an error
            });

        this.cols = [
            { field: 'pseudo', header: 'pseudo' },
            { field: 'email', header: 'email' },
            { field: 'bio', header: 'Category' },
            { field: 'role', header: 'Role' },
            { field: 'email_verification', header: 'verfied' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }

    deleteSelectedUsers() {
        this.deleteUsersDialog = true;
    }

    editUser(user: User) {
        this.user = { ...user };
        this.userDialog = true;
    }

    deleteUser(user: User) {
        this.deleteUserDialog = true;
        this.user = { ...user };
    }

    confirmDeleteSelected() {
        this.deleteUsersDialog = false;
        this.users = this.users.filter(
            (val) => !this.selectedUsers.includes(val)
        );

        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Users Deleted',
            life: 3000,
        });
        this.selectedUsers = [];
    }

    confirmDelete() {
        this.deleteUserDialog = false;

        // Ensure that the user has a valid _id before attempting deletion
        if (this.user._id) {
            // Call the userService to delete the user
            this.userService
                .deleteUser(this.user._id)
                .then(() => {
                    // If the deletion is successful, remove the user from the users array
                    this.users = this.users.filter(
                        (val) => val._id !== this.user._id
                    );

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'User Deleted',
                        life: 3000,
                    });

                    this.user = {};
                })
                .catch((error) => {
                    console.error('Error deleting user:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to delete user',
                        life: 3000,
                    });
                });
        }
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    saveUser() {
        this.submitted = true;

            if (this.user._id) {
                this.userService
                    .updateUser(this.user._id, this.user)
                    .then((res) => {
                        if (res) {
                            const index = this.findIndexById(res._id);
                            if (index !== -1) {
                                this.users[index] = res;
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Successful',
                                    detail: 'User Updated',
                                    life: 3000,
                                });
                            } else {
                                console.error(
                                    'User not found in the list'
                                );
                            }
                        } else {
                            console.error('Failed to update user:', res);
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Failed to update user',
                                life: 3000,
                            });
                        }
                    })
                    .catch((error) => {
                        console.error('Error updating user:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to update user',
                            life: 3000,
                        });
                    });
            } else {
                this.userService
                    .createUser(this.user)
                    .then((res) => {
                        if (res && res._id) {
                            this.user._id = res._id;
                            this.users.push(this.user);
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'User Created',
                                life: 3000,
                            });
                        } else {
                            console.error('Failed to create user:', res);
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Failed to create user',
                                life: 3000,
                            });
                        }
                    })
                    .catch((error) => {
                        console.error('Error creating user:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Failed to create user',
                            life: 3000,
                        });
                    });
            }

            this.users = [...this.users];
            this.userDialog = false;
            this.user = {};
    }

    findIndexById(_id: string | undefined): number {
        if (_id === undefined) {
            return -1; // Return -1 or any appropriate value to indicate that the id is not found.
        }

        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i]._id === _id) {
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

    // Function to validate the user before saving
    validateUser(user: any): boolean {
        // Perform your validation logic here
        // For example, check if all the required fields are filled

        if (
            user.medicalSituation.trim() === '' ||
            user.probableStartTime.trim() === '' ||
            user.actualEndTime.trim() === '' ||
            user.appointmentStatus.trim() === '' ||
            user.emailMed.trim() === '' ||
            user.medicineId.trim() === '' ||
            user.userId.trim() === ''
        ) {
            return false; // Validation failed
        }

        return true; // Validation passed
    }
    onFileChange(event: any) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
          this.user.picture = reader.result as string;
        };

        if (file) {
          reader.readAsDataURL(file);
        }
      }
}
