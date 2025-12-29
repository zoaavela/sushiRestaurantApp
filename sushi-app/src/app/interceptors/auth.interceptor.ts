// DANS src/app/interceptors/auth.interceptor.ts

import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  // Liste des URLs qui ne nécessitent PAS d'authentification
  const publicUrls = [
    '/api/boxes/index.php',
    '/api/users/add_user.php',
    '/api/users/login.php'
  ];
  
  const isPublicUrl = publicUrls.some(url => req.url.includes(url));
  
  let authReq = req;

  // 1. Ajout du token (sauf pour les URLs publiques)
  if (token && !isPublicUrl) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }
  
  // 2. Gestion de l'erreur 401 pour la déconnexion automatique
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Déclenche la déconnexion complète (logout contient la redirection)
        authService.logout(); 
        console.error("Déconnexion automatique : Jeton expiré ou invalide.");
      }
      return throwError(() => error);
    })
  );
};