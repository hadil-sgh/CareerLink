import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          Swal.fire({
            icon: 'error',
            title: 'Access denied !',
            confirmButtonText: 'OK',
            customClass: {
              popup: 'small-alert'
            }
          });
          // Retourne un Observable vide pour interrompre la chaîne des intercepteurs
          return of();
        }
        // Renvoie l'erreur pour que le reste de l'application puisse la traiter
        return throwError(error);
      })
    );
  }
}
