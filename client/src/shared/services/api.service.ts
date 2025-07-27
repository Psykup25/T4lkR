

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'http://127.0.0.1:3000/api';

  constructor(private http: HttpClient) {}

  changePassword(userId: string, currentPassword: string, newPassword: string) {
    // Utiliser le cookie HTTPOnly (withCredentials)
    return this.http.post(
      `${this.apiUrl}/auth/user/${userId}/change-password`,
      { currentPassword, newPassword },
      { withCredentials: true }
    );
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, data, { withCredentials: true });
  }

  getProfile() {
    return this.http.get(`${this.apiUrl}/users/profile`, { withCredentials: true });
  }

  getHealth() {
    return this.http.get(`${this.apiUrl}/health`);
  }

  updateProfile(data: any) {
    return this.http.patch(`${this.apiUrl}/users/profile`, data, { withCredentials: true });
  }
}
