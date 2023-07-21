import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = true;

    if (token) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjlkMjcwNTQ1YWI0MDcyOWUzMGJlYiIsImlhdCI6MTY4OTk0NzgzNCwiZXhwIjoxOTQ5MTQ3ODM0fQ.HCHWYKdJCQ118hHbVZqPR3U_YuQBE5zfgvaANTlJz7k'
          });
      request = request.clone({ headers });
    }

    return next.handle(request);
  }
}
