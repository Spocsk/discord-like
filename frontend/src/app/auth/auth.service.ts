import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:3000/user/login', { username, password }).subscribe(response => {
      localStorage.setItem('access_token', response.access_token);
      this.isLoggedIn.next(true);
      this.router.navigate(['chat']);
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated$() {
    return this.isLoggedIn.asObservable();
  }
}
