import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/core/service/authentification.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit {

    isLogged = false;
    role = localStorage.getItem('role');
    constructor(public layoutService: LayoutService, public router: Router, private _authentificationService: AuthentificationService) { }
    ngOnInit(): void {
        if (this._authentificationService.isLoggedIn()) {
            this.isLogged = true;
        }
    }
    onLoginClick() {
        this.router.navigate(['/login']);
    }

    onRegisterClick() {
        // Replace 'register' with the path of your register page component.
        this.router.navigate(['/register']);
    }
    onDashboardClick() {
        if (this.role == 'admin') {
            this.router.navigate(['/backoffice']);

        }
        else {
            this.router.navigate(['/frontoffice']);

        }
    }
}
