import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class AuthentificationService {

    constructor(private http: HttpClient) { }
    private url: string = environment.baseUrl;

    login(email: string, password: string) {
        console.log(this.url);
        let url = this.url + '/user/login';
        return this.http.post(url, { email: email, password: password })
    }
    logout() {

        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');

    }

    isLoggedIn() {

        if (localStorage.getItem('token') && localStorage.getItem('role') && localStorage.getItem('user')) {
            return true;
        }
        return false;
    }
    getRole() {
        return localStorage.getItem('role');
    }

    getUserId() {
        return localStorage.getItem('user');
    }

    register(email: string, password: string, role: string, pseudo: string) {
        let url = this.url + '/user/register';
        return this.http.post(url, { email: email, password: password, role: role, pseudo: pseudo })
    }

    forgetPassword(email: string) {
        let url = this.url + '/user/forget-password';
        return this.http.post(url, { email: email })
    }
    resetPassword(password: string, password_confirmation :string, token: string) {
        let url = this.url + '/user/reset-password/' + token;
        return this.http.post(url, { password: password,password_confirmation:password_confirmation})
    }

}
