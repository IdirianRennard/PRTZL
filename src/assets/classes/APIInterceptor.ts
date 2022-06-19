import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const apiReq = req.url.includes('google') ? req.clone({ url: req.url }) : req.clone({ url: `https://prtzl.houserennard.online/assets/api/${req.url}` });

    return next.handle(apiReq);
  }
}
