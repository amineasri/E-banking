import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!req.url.includes("/auth/login")){
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.authService.accessToken)
    });
    return next.handle(clonedReq);}else return next.handle(req);

  }
}
