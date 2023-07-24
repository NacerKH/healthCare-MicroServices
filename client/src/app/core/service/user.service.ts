import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../api/User';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }
    url: string = environment.baseUrl + '/user';

    getAllUsers(): Promise<User[] | undefined> {


        return this.http.get<User[]>(`${this.url}`)
            .toPromise()
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
                return []; // Return an empty array if there is an error.
            });
    }

    getUserById(id: string) {
        const url = `${this.url}/${id}`;
        return this.http.get<any>(url)
            .toPromise()
            .then(res => res.data as any)
            .catch(this.handleError);
    }

    createUser(user: User): Promise<User | undefined> {
        return this.http.post<User>(`${this.url}/addUser`, user)
            .toPromise()
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error('Error creating User:', error);
                return undefined;
            });
    }

    updateUser(id: string, user: User): Promise<User | undefined> {
        return this.http.put<User>(`${this.url}/${id}`, user)
            .toPromise()
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error('Error updating User:', error);
                return undefined;
            });
    }

    deleteUser(id: string) {
        const url = `${this.url}/${id}`;
        return this.http.delete<any>(url)
            .toPromise()
            .then(res => res.data as any)
            .catch(this.handleError);
    }



    private handleError(error: any) {
        console.error('An error occurred:', error);
        throw error;
    }

}
