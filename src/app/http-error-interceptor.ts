import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from "@angular/core";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.status === 403) {
            errorMessage = 'Vous ne disposez pas des autorisations nécessaires pour effectuer cette action';
          } else if (error.status === 401) {
            errorMessage = 'Vous devez vous identifier pour accéder à cette ressource';
          } else {
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // server-side error
              errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
            }
          }
          window.alert(errorMessage);
          return throwError(errorMessage);
        })
      );
  }
}

export const httpErrorInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
];
