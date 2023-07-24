import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthentificationService } from 'src/app/core/service/authentification.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class RegisterComponent {
    valCheck: string[] = ['remember'];

    password!: string;
    email!: string;
    role!: string;
    pseudo!: string;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private _athentification: AuthentificationService,
        private messageService: MessageService
    ) {}

    Register() {
        console.log(this.email, this.password, this.role, this.pseudo);
        if (
            this.email?.trim() &&
            this.password?.trim() &&
            this.role?.trim() &&
            this.pseudo?.trim()
        ) {
            this._athentification
                .register(this.email, this.password, this.role, this.pseudo)
                .subscribe(
                    (data) => {
                        console.log(data);
                        this.router.navigate(['/login']);
                    },
                    (error) => {
                        if (error) {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Failed to log in', // You may customize the error message as needed
                                life: 3000,
                            });
                            return;
                        }
                        console.log(error);
                    }
                );
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Warning',
                detail: 'Please provide both email and password',
                life: 3000,
            });
        }
        // this.router.navigate(['/frontoffice']);
    }
}
