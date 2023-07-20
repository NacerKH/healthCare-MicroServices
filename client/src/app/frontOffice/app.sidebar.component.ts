import { Component, ElementRef } from '@angular/core';
import { FrontOfficeService } from "./service/app.frontOffice.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html'
})
export class AppSidebarComponent {
    constructor(public layoutService: FrontOfficeService, public el: ElementRef) { }
}

