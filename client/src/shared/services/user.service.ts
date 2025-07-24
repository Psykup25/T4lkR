import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _currentUser = signal({
    username: 'Jerome_Dev',
    avatar: '👤',
    location: 'Franche Comté',
    status: 'En ligne'
  });

  readonlyUser = this._currentUser.asReadonly();

  constructor(private http: HttpClient) {}

  updateUserOnBackend(id: string, userData: Partial<{ username: string; avatar: string; location: string; status: string; }>, token: string) {
    const url = `http://localhost:3000/api/auth/user/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put(url, userData, { headers });
  }

  updateStatusOnBackend(id: string, status: string, token: string) {
    const url = `http://localhost:3000/api/auth/user/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    // Get the current user and update the status
    const user = this.currentUser();
    const userData = {
      username: user?.username || '',
      avatar: user?.avatar || '',
      location: user?.location || '',
      status: status
    };
    return this.http.put(url, userData, { headers });
  }

  updateLocationOnBackend(id: string, location: string, token: string) {
    const url = `http://localhost:3000/api/auth/user/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    // Get the current user and update the location
    const user = this.currentUser();
    const userData = {
      username: user?.username || '',
      avatar: user?.avatar || '',
      status: user?.status || '',
      location: location
    };
    return this.http.put(url, userData, { headers });
  }

  updateUser(userData: Partial<{ username: string; avatar: string; location: string; status: string; }>) {
    this._currentUser.update(current => ({ ...current, ...userData }));
  }

  updateAvatar(avatar: string) {
    this._currentUser.update(current => ({ ...current, avatar }));
  }

  updateLocation(location: string) {
    this._currentUser.update(current => ({ ...current, location }));
  }

  updateStatus(status: string) {
    this._currentUser.update(current => ({ ...current, status }));
  }

  private user: any = null;

  setCurrentUser(user: any) {
    // Merge avec l'état courant pour ne jamais perdre de champ (location, etc.)
    const merged = { ...this._currentUser(), ...user };
    this.user = merged;
    this._currentUser.set(merged);
    localStorage.setItem('user', JSON.stringify(merged));
  }

  currentUser() {
    if (!this.user) {
      const userStr = localStorage.getItem('user');
      if (userStr) this.user = JSON.parse(userStr);
    }
    return this.user;
  }

  clear() {
    this.user = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}
