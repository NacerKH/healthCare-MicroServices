import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../api/Appointment';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppointmentService {

    private apiUrl: string =environment.baseUrl;

    constructor(private http: HttpClient) { }

    getAllAppointments(): Promise<Appointment[] | undefined>  {
        return this.http.get<Appointment[]>(`${this.apiUrl}/v1/appointments`)
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
        const url = `${this.apiUrl}/v1/appointment/${id}`;
        return this.http.get<any>(url)
            .toPromise()
            .then(res => res.data as any)
            .catch(this.handleError);
    }

    createAppointment(appointment: Appointment): Promise<Appointment | undefined> {
        console.log(appointment);
        return this.http.post<Appointment>(`${this.apiUrl}/v1/addAppointment`, appointment)
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
        return this.http.put<Appointment>(`${this.apiUrl}/v1/appointment/${id}`, appointment)
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
        const url = `${this.apiUrl}/v1/appointment/${id}`;
        return this.http.delete<any>(url)
            .toPromise()
            .then(res => res.data as any)
            .catch(this.handleError);
    }

    findAppointmentsByMedicalSituation(medicalSituation: string): Promise<Appointment[]> {
        const params = new HttpParams().set('medicalSituation', medicalSituation);
        return this.http.get<any[]>(this.apiUrl + '/v1/appointments?', { params })
          .toPromise()
          .then(res => res as Appointment[]) // Cast the response to an array of Appointment objects
          .catch((error: any) => {
            this.handleError(error); // You can handle the error here or rethrow it.
            return []; // Return an empty array in case of error.
          });
      }

    getAppointmentsByUser(userId: string): Promise<Appointment[] | undefined> {

        const url = `${this.apiUrl}/v1/appointments/user/${userId}`;
        return this.http.get<Appointment[]>(url)
            .toPromise()
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error('Error fetching appointments:', error);
                return []; // Return an empty array if there is an error.
            });      }

    getAppointmentsByMedicine(medicineId: string): Promise<Appointment[] | undefined> {
        const url = `${this.apiUrl}/v1/appointments/medicine/${medicineId}`;
        return this.http.get<Appointment[]>(url)
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
