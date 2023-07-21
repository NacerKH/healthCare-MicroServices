import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { FrontOfficeService } from "./service/app.frontOffice.service";
import { Router } from '@angular/router';
import { AuthentificationService } from '../core/service/authentification.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: FrontOfficeService, private _authentificactionService : AuthentificationService,private router :Router) { }

    logout() {
        this._authentificactionService.logout();
        this.router.navigate(['/login']);
    }
}
