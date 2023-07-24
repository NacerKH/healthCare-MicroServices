import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');

    if (token) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': token
          });
      request = request.clone({ headers });
    }

    return next.handle(request);
  }
}
