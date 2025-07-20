import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  getProfile() {
    const token = localStorage.getItem('token');
    let headers: HttpHeaders | undefined = undefined;
    if (token) {
      headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    }
    return this.http.get(`${this.apiUrl}/users/profile`, headers ? { headers } : {});
  }

  getHealth() {
    return this.http.get(`${this.apiUrl}/health`);
  }

  updateProfile(data: any) {
    const token = localStorage.getItem('token');
    let headers: HttpHeaders | undefined = undefined;
    if (token) {
      headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    }
    return this.http.patch(`${this.apiUrl}/users/profile`, data, headers ? { headers } : {});
  }

  // ...autres méthodes si besoin...
  // Ajoute ici d'autres méthodes selon tes besoins
}
