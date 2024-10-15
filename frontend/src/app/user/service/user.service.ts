import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  token: string = localStorage.getItem('access_token') || '';
  constructor(private http: HttpClient) {}

  getProfile$() {
    return this.http.get('http://localhost:3000/user/profile', {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }
}
