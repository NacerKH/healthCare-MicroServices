import { Component, OnInit } from '@angular/core';
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
    `],
    providers: [MessageService],
})
export class LoginComponent  implements OnInit{

    valCheck: string[] = ['remember'];

    password!: string;
    email!: string;

    constructor(public layoutService: LayoutService, private router: Router, private _authentificationService: AuthentificationService, private messageService: MessageService) { }
  ngOnInit(): void {
   if (this._authentificationService.isLoggedIn()){
    this.router.navigate(['/']);
   }
  }
    signIn() {

        if (this.email?.trim() && this.password?.trim()) {
            this._authentificationService.login(this.email, this.password).subscribe((res: any) => {
                if (res.error) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to log in', // You may customize the error message as needed
                        life: 3000,
                    });
                    return;
                }

                // Login successful
                localStorage.setItem('token', res.token);
                localStorage.setItem('role', res.role);
                localStorage.setItem('user', res.user_id);

                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Logged in successfully', // You may customize the success message as needed
                    life: 3000,
                });

                if (res.role == 'patient' || res.role == 'medecin') {
                    this.router.navigate(['/frontoffice']);
                } else {
                    this.router.navigate(['/backoffice']);
                }

            }, (error) => {
                console.error('Error logging in:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to log in',
                    life: 3000,
                });
            });
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Warning',
                detail: 'Please provide both email and password',
                life: 3000,
            });
        }
    }

}
