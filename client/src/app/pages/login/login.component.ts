import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/core/service/authentification.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;
    email!: string;

    constructor(public layoutService: LayoutService, private router: Router, private _authentificationService: AuthentificationService, private messageService: MessageService) { }

    signIn() {
        // Perform login logic here
        this._authentificationService.login(this.email, this.password).subscribe((res: any) => {
            if (res.error) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to update appointment',
                    life: 3000,
                });
                return;
            }
            localStorage.setItem('token', res.token);
            localStorage.setItem('role', res.role);
            localStorage.setItem('user', res.user_id);
            if (res.role == 'patient') {
                this.router.navigate(['/frontoffice']);

            }
            else {
                this.router.navigate(['/backoffice']);

            }

        });

    }
}
