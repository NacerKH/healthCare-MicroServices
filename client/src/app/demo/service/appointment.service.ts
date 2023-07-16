import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../api/Appointment';

@Injectable()
export class AppointmentService {

    private apiUrl: string ='http://127.0.0.1:5005/api/v1';

    constructor(private http: HttpClient) { }

    getAllAppointments(): Promise<Appointment[] | undefined>  {
        return this.http.get<Appointment[]>(`${this.apiUrl}/appointments`)
          .toPromise()
          .then((res) => {
            return res;
          })
          .catch((error) => {
            console.error('Error fetching appointments:', error);
            return []; // Return an empty array if there is an error.
          });
      }

    getAppointmentById(id: string) {
        const url = `${this.apiUrl}/appointment/${id}`;
        return this.http.get<any>(url)
            .toPromise()
            .then(res => res.data as any)
            .catch(this.handleError);
    }

    createAppointment(appointment: Appointment): Promise<Appointment | undefined> {
        return this.http.post<Appointment>(`${this.apiUrl}/addAppointment`, appointment)
          .toPromise()
          .then((res) => {
            return res;
          })
          .catch((error) => {
            console.error('Error creating appointment:', error);
            return undefined;
          });
      }

    updateAppointment(id: string, appointment: Appointment): Promise<Appointment | undefined> {
        return this.http.put<Appointment>(`${this.apiUrl}/appointment/${id}`, appointment)
          .toPromise()
          .then((res) => {
            return res;
          })
          .catch((error) => {
            console.error('Error updating appointment:', error);
            return undefined;
          });
      }

    deleteAppointment(id: string) {
        const url = `${this.apiUrl}/appointment/${id}`;
        return this.http.delete<any>(url)
            .toPromise()
            .then(res => res.data as any)
            .catch(this.handleError);
    }

    findAppointmentsByMedicalSituation(medicalSituation: string): Promise<Appointment[]> {
        const params = new HttpParams().set('medicalSituation', medicalSituation);
        return this.http.get<any[]>(this.apiUrl + '/appointments?', { params })
          .toPromise()
          .then(res => res as Appointment[]) // Cast the response to an array of Appointment objects
          .catch((error: any) => {
            this.handleError(error); // You can handle the error here or rethrow it.
            return []; // Return an empty array in case of error.
          });
      }

    private handleError(error: any) {
        console.error('An error occurred:', error);
        throw error;
    }
}
