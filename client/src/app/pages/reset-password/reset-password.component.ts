import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from 'src/app/core/service/authentification.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styles: [`
  :host ::ng-deep .pi-eye,
  :host ::ng-deep .pi-eye-slash {
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
  }
`]
})
export class ResetPasswordComponent implements OnInit  {

password!: string;
password_confirmation!: string;
token!: string;
    constructor(public layoutService: LayoutService, private router: Router, private _athentification: AuthentificationService,private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
          const token = params.get('token');
          if (token) {
            this.token = token;
            console.log('Token from URL:', token);
          } else {
            console.log('No token found in the URL.');
            // Handle the case when no token is present in the URL, maybe redirect to an error page or show a message.
          }
        });
    }

    resetPassword() {
        this._athentification.resetPassword(this.password,this.password_confirmation,this.token).subscribe((data) => {
            console.log(data);
            this.router.navigate(['/login']);
        }, (error) => {
            console.log(error);
        })
        // this.router.navigate(['/frontoffice']);
    }

}
