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

  currentUser = this._currentUser.asReadonly();

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
}
