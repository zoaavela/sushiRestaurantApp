// DANS src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { BehaviorSubject, Observable, tap, map } from 'rxjs'; 
import { User, LoginResponse } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/SAE303/sushi_box/api/users';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { 
    this.loadUserFromStorage();
  }

  setUser(user: User | null): void {
    this.currentUserSubject.next(user);
    if (user) {
        localStorage.setItem('current_user', JSON.stringify(user));
    } else {
        localStorage.removeItem('current_user');
    }
  }
  
  // CORRECTION TS2355
  register(userData: { firstname: string, lastname: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/add_user.php`, JSON.stringify(userData));
  }

  // CORRECTION TS2355
  login(credentials: { email: string, password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login.php`, JSON.stringify(credentials))
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('auth_token', response.token);
            if (response.user) {
              this.setUser(response.user); 
            }
          }
        })
      );
  }
  
  fetchUser(): Observable<User> {
    const token = this.getToken();
    if (!token) {
      this.logout();
      return new Observable(observer => observer.error('No token available'));
    }
    
    return this.http.get<any>(`${this.apiUrl}/update_user.php`).pipe( 
        map(response => { 
            const user = response.user || response; 
            
            if (user && user.email) { 
                this.setUser(user); 
                return user as User; 
            }
            throw new Error('Réponse API invalide lors du rafraîchissement de l\'utilisateur');
        })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user'); 
    this.setUser(null); 
    this.router.navigate(['/login']); 
  }
  
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private loadUserFromStorage(): void {
    const user = localStorage.getItem('current_user');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }
}