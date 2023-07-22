import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/core/service/authentification.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class RegisterComponent {

    valCheck: string[] = ['remember'];

    password!: string;
    email!: string;
    role!: string;
    pseudo!: string;


    constructor(public layoutService: LayoutService, private router: Router, private _athentification: AuthentificationService) { }


    Register() {
        console.log(this.email, this.password, this.role, this.pseudo);
        this._athentification.register(this.email, this.password, this.role, this.pseudo).subscribe((data) => {
            console.log(data);
            this.router.navigate(['/login']);
        }, (error) => {
            console.log(error);
        })
        // this.router.navigate(['/frontoffice']);
    }
}
