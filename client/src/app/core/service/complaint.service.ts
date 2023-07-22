import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Complaint } from '../api/Complaint';

@Injectable()
export class ComplaintService {

    private apiUrl: string = 'http://127.0.0.1:8000/api';

    constructor(private http: HttpClient) { }

    getAllComplaints(): Promise<Complaint[] | undefined> {
        return this.http.get<Complaint[]>(`${this.apiUrl}/complaint/`)
            .toPromise()
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error('Error fetching complaints:', error);
                return []; // Return an empty array if there is an error.
            });
    }

    getComplaintById(id: string): Promise<Complaint | undefined> {
        const url = `${this.apiUrl}/complaint/${id}`;
        return this.http.get<any>(url)
            .toPromise()
            .then((res) => {
                return res as Complaint;
            })
            .catch((error) => {
                console.error('Error fetching complaint by ID:', error);
                return undefined; // Return undefined in case of an error.
            });
    }

    createComplaint(complaint: Complaint): Promise<Complaint | undefined> {
        return this.http.post<Complaint>(`${this.apiUrl}/addComplaint`, complaint)
            .toPromise()
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error('Error creating complaint:', error);
                return undefined;
            });
    }

    updateComplaint(id: string, complaint: Complaint): Promise<Complaint | undefined> {
        return this.http.put<Complaint>(`${this.apiUrl}/complaint/${id}`, complaint)
            .toPromise()
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error('Error updating complaint:', error);
                return undefined;
            });
    }

    deleteComplaint(id: string): Promise<any> {
        const url = `${this.apiUrl}/complaint/${id}`;
        return this.http.delete<any>(url)
            .toPromise()
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error('Error deleting complaint:', error);
                return undefined;
            });
    }


    getComplaintsByUser(userId: string): Promise<Complaint[] | undefined> {
        const url = `${this.apiUrl}/complaint/user/${userId}`;
        return this.http.get<Complaint[]>(url)
            .toPromise()
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error('Error fetching complaint:', error);
                return []; // Return an empty array if there is an error.
            });      }



    getComplaintsByMedicine(medicineId: string): Promise<Complaint[] | undefined> {
        const url = `${this.apiUrl}/complaint/medicine/${medicineId}`;
        return this.http.get<Complaint[]>(url)
            .toPromise()
            .then((res) => {
                return res
            })
            .catch((error) => {
                console.error('Error fetching appointments:', error);
                return []; // Return an empty array if there is an error.
            });
    }

    private handleError(error: any) {
        console.error('An error occurred:', error);
        throw error;
    }
}
