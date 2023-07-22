import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Forum } from '../api/Forum';

@Injectable()
export class ForumService {

    private apiUrl: string ='http://127.0.0.1:5012/api/v1';

    constructor(private http: HttpClient) { }
    handleRefresh(): void {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    getAllPosts(): Promise<Forum[] | undefined>  {
        return this.http.get<Forum[]>(`${this.apiUrl}/posts`)
          .toPromise()
          .then((res) => {
            return res;
          })
          .catch((error) => {
            console.error('Error fetching forums:', error);
            return []; // Return an empty array if there is an error.
          });
      }

    getPostsById(id: string) {
        const url = `${this.apiUrl}/posts/${id}`;
        return this.http.get<any>(url)
            .toPromise()
            .then(res => res.data as any)
            .catch(this.handleError);
    }
    createPost(message: string) {
      const posterId=localStorage.getItem('user');
      const url = `${this.apiUrl}/createpost`;
      const requestBody = {posterId:posterId, message: message };
      
      return this.http
        .post<any>(url, requestBody) // Send the requestBody in the request
        .toPromise()
        .then((res) => res.data as any)
        .catch(this.handleError);
    }


      deletePostById(id: string) {
        const url = `${this.apiUrl}/${id}`;
        return this.http.delete<any>(url)
            .toPromise()
            .then(res => res.data as any)
            .catch(this.handleError);
    }
    UpdatePostById(postid: string, message: string) {
      const url = `${this.apiUrl}/${postid}`;
      
      // Create the request body with the message
      const requestBody = { message: message };
      
      return this.http
        .put<any>(url, requestBody) // Send the requestBody in the request
        .toPromise()
        .then((res) => res.data as any)
        .catch(this.handleError);
    }

    likePostById(postid: string) {
      const url = `${this.apiUrl}/like-post/${postid}`;
      const likerid=localStorage.getItem('user');
      // Create the request body with the likerid
      const requestBody = { id: likerid };
      
      return this.http
        .patch<any>(url, requestBody) // Send the requestBody in the request
        .toPromise()
        .then((res) => res.data as any)
        .catch(this.handleError);
    }

    unlikePostById(postid: string, likerid: string) {
      const url = `${this.apiUrl}/unlike-post/${postid}`;
      
      // Create the request body with the likerid
      const requestBody = { id: likerid };
      
      return this.http
        .patch<any>(url, requestBody) // Send the requestBody in the request
        .toPromise()
        .then((res) => res.data as any)
        .catch(this.handleError);
    }

    CreatecommentPostById(postid: string,text:String) {
      const url = `${this.apiUrl}/comment-post/${postid}`;
      const commenterId=localStorage.getItem('user');
      const commenterPseudo=localStorage.getItem('userpseudo');
      const requestBody={commenterId:commenterId,commenterPseudo:commenterPseudo,text:text}
      
      return this.http
        .patch<any>(url, requestBody) // Send the requestBody in the request
        .toPromise()
        .then((res) => res.data as any)
        .catch(this.handleError);
    }
    EditcommentPostById(postid: string,commentId: string,text:String) {
      const url = `${this.apiUrl}/edit-comment-post/${postid}`;

      const requestBody={commentId:commentId,text:text}
      
      return this.http
        .patch<any>(url, requestBody) // Send the requestBody in the request
        .toPromise()
        .then((res) => res.data as any)
        .catch(this.handleError);
    }
    DeletecommentPostById(postid: string,commentId: string) {
      const url = `${this.apiUrl}/delete-comment-post/${postid}`;

      const requestBody={commentId:commentId}
      
      return this.http
        .patch<any>(url, requestBody) // Send the requestBody in the request
        .toPromise()
        .then((res) => res.data as any)
        .catch(this.handleError);
    }
    searchgifs(search: string) {
      const url = `${this.apiUrl}/gif/${search}`;
      return this.http.get<any>(url)
          .toPromise()
          .then(res => res.data as any)
          .catch(this.handleError);
  }

    // findAppointmentsByMedicalSituation(medicalSituation: string): Promise<Appointment[]> {
    //     const params = new HttpParams().set('medicalSituation', medicalSituation);
    //     return this.http.get<any[]>(this.apiUrl + '/appointments?', { params })
    //       .toPromise()
    //       .then(res => res as Appointment[]) // Cast the response to an array of Appointment objects
    //       .catch((error: any) => {
    //         this.handleError(error); // You can handle the error here or rethrow it.
    //         return []; // Return an empty array in case of error.
    //       });
    //   }

    private handleError(error: any) {
        console.error('An error occurred:', error);
        throw error;
    }
}
