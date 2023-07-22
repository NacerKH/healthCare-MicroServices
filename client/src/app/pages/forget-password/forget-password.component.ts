import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/core/service/authentification.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styles: [`
  :host ::ng-deep .pi-eye,
  :host ::ng-deep .pi-eye-slash {
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
  }
`]
})
export class ForgetPasswordComponent {
    email!: string;

    constructor(public layoutService: LayoutService, private router: Router, private _athentificationService: AuthentificationService) { }



    ForgetPassword() {
      this._athentificationService.forgetPassword(this.email).subscribe((data) => {
        console.log(data);
//alert("email sent");

        }, (error) => {
            console.log(error);
        })


    }

}
