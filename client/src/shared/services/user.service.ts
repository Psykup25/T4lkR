// ...existing code...
import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUserFromBackend(id: string) {
    const url = `http://127.0.0.1:3000/api/auth/user/${id}`;
    // Utilise le cookie HTTPOnly
    return this.http.get(url, { withCredentials: true });
  }
  fetchCurrentUser() {
    // Endpoint /api/auth/me pour récupérer l'utilisateur courant via cookie
    return this.http.get('http://127.0.0.1:3000/api/auth/me', { withCredentials: true });
  }
  private _currentUser = signal({
    id: '',
    _id: '',
    username: '',
    avatar: '',
    location: '',
    status: ''
  });

  readonlyUser = this._currentUser.asReadonly();

  constructor(private http: HttpClient) {}

  logout() {
    // Appelle la route backend pour supprimer le cookie
    return this.http.post('http://127.0.0.1:3000/api/auth/logout', {}, { withCredentials: true });
  }

  updateUserOnBackend(id: string, userData: Partial<{ username: string; avatar: string; location: string; status: string; }>) {
    const url = `http://127.0.0.1:3000/api/auth/user/${id}`;
    return this.http.put(url, userData, { withCredentials: true });
  }

  updateStatusOnBackend(id: string, status: string) {
    const url = `http://127.0.0.1:3000/api/auth/user/${id}`;
    const user = this.currentUser();
    const userData = {
      username: user?.username || '',
      avatar: user?.avatar || '',
      location: user?.location || '',
      status: status
    };
    return this.http.put(url, userData, { withCredentials: true });
  }

  updateLocationOnBackend(id: string, location: string) {
    const url = `http://127.0.0.1:3000/api/auth/user/${id}`;
    const user = this.currentUser();
    const userData = {
      username: user?.username || '',
      avatar: user?.avatar || '',
      status: user?.status || '',
      location: location
    };
    return this.http.put(url, userData, { withCredentials: true });
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
  }

  currentUser() {
    return this.user;
  }

  clear() {
    this.user = null;
    this._currentUser.set({
      id: '',
      _id: '',
      username: '',
      avatar: '',
      location: '',
      status: ''
    });
  }
}
