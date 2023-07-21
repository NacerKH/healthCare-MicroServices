import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
})
export class LandingComponent {
    constructor(public layoutService: LayoutService, public router: Router) {}

    onLoginClick() {
        this.router.navigate(['/login']);
    }

    onRegisterClick() {
        // Replace 'register' with the path of your register page component.
        this.router.navigate(['/register']);
    }
}
