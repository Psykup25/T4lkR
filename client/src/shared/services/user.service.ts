import { Injectable, signal } from '@angular/core';

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
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
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
