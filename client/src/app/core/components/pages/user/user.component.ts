import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { User } from '../../../api/User';
import { UserService } from 'src/app/core/service/user.service';
import { Table } from 'primeng/table';
@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    providers: [MessageService]
})
export class UserComponent {
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


    constructor(
        private _userService: UserService,
        private messageService: MessageService
    ) { }

    ngOnInit() {
        this._userService.getAllUsers().then((data) => {
            this.users = data || []; // Assign data to appointments or use an empty array if data is undefined
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
        this.userDialog = false;
        this.users = this.users.filter(val => !this.selectedUsers.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
        this.selectedUsers = [];
    }

    confirmDelete() {
        this.deleteUserDialog = false;
        this.users = this.users.filter(val => val.id !== this.user.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
        this.user = {};
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    saveUser() {
        this.submitted = true;

        if (this.user.pseudo?.trim()) {
            if (this.user.id) {
                // @ts-ignore
                this.users.inventoryStatus = this.users.inventoryStatus.value ? this.users.inventoryStatus.value : this.users.inventoryStatus;
                this.users[this.findIndexById(this.user.id)] = this.user;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.user.id = this.createId();
                // this.user.code = this.createId();
                // this.user.image = 'user-placeholder.svg';
                // @ts-ignore
                this.user.inventoryStatus = this.user.inventoryStatus ? this.user.inventoryStatus.value : 'INSTOCK';
                this.users.push(this.user);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'user Created', life: 3000 });
            }

            this.users = [...this.users];
            this.userDialog = false;
            this.user = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
