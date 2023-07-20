import { Component } from '@angular/core';
import { FrontOfficeService } from "./service/app.frontOffice.service";

@Component({
    selector: 'app-footer',
    templateUrl: './app.footer.component.html'
})
export class AppFooterComponent {
    constructor(public layoutService: FrontOfficeService) { }
}
