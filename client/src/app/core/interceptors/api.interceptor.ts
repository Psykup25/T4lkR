import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Gestion des erreurs HTTP globales
        if (error.status === 401 || error.status === 403) {
          // Redirige vers la page de login si non authentifié ou non autorisé
          this.router.navigate(['/login']);
        } else if (error.status >= 500) {
          // Affiche un message d'erreur serveur (à personnaliser)
          alert('Erreur serveur, veuillez réessayer plus tard.');
        }
        // Log l'erreur pour le debug
        console.error('Erreur HTTP interceptée:', error);
        return throwError(() => error);
      })
    );
  }
}
