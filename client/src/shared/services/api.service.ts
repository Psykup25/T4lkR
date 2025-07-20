import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getHealth() {
    return this.http.get(`${this.apiUrl}/health`);
  }

  // Exemple: récupérer le profil utilisateur
  getProfile() {
    return this.http.get(`${this.apiUrl}/users/profile`);
  }

  // Exemple: inscription
  register(data: any) {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  // Exemple: connexion
  login(data: any) {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  // Ajoute ici d'autres méthodes selon tes besoins
}
