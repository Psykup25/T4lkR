
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { ApiService } from '../../../shared/services/api.service';
import { Background } from '../../../shared/background/background';
import { Button } from '../../../shared/button/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [Background, Button, CommonModule, FormsModule],
  templateUrl: './profile.html'
})
export class Profile {
  readonlyUser: any;
  isEditingLocation = signal(false);
  tempLocation = signal('');
  isAvatarPopupOpen = signal(false);
  isEditingStatus = signal(false);
  showAvatarPicker = signal(false);

  availableAvatars = [
    '/assets/image/Avatar1.svg',
    '/assets/image/Avatar2.svg',
    '/assets/image/Avatar3.svg',
    '/assets/image/Avatar4.svg',
    '/assets/image/Avatar5.svg',
    '/assets/image/Avatar6.svg'
  ];

  statusOptions = [
    { value: 'En ligne', label: 'En ligne', icon: '/assets/image/online.svg' },
    { value: 'Absent', label: 'Absent', icon: '/assets/image/away.svg' },
    { value: 'Anonyme', label: 'Anonyme', icon: '/assets/image/Anon.svg' }
  ];

  constructor(
    private router: Router,
    private userService: UserService,
    private api: ApiService
  ) {
    this.readonlyUser = this.userService.readonlyUser;
  }

  ngOnInit() {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!userStr || !token) {
      this.router.navigate(['/public/login']);
      return;
    }
    this.syncUser();
  }

  syncUser() {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (userStr && token) {
      const user = JSON.parse(userStr);
      const userId = user.id || user._id;
      if (userId) {
        this.userService.getUserFromBackend(userId, token).subscribe((freshUser: any) => {
          this.userService.setCurrentUser(freshUser);
        });
      }
    }
  }

  onTempLocationInput(event: Event) {
    const value = (event.target as HTMLInputElement)?.value || '';
    this.tempLocation.set(value);
  }

  openAvatarPopup() { this.isAvatarPopupOpen.set(true); }
  closeAvatarPopup() { this.isAvatarPopupOpen.set(false); }

  selectAvatar(avatarPath: string) {
    const user = this.readonlyUser();
    const token = localStorage.getItem('token');
    const userId = user?.id || user?._id;
    if (user && userId && token) {
      this.userService.updateUserOnBackend(userId, { avatar: avatarPath }, token).subscribe(
        response => {
          this.userService.updateAvatar(avatarPath);
          this.closeAvatarPopup();
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'avatar:', error);
        }
      );
    }
  }

  startEditLocation() {
    this.isEditingLocation.set(true);
    this.tempLocation.set(this.readonlyUser()?.location || '');
  }

  saveLocation() {
    const user = this.readonlyUser();
    const token = localStorage.getItem('token');
    const userId = user?.id || user?._id;
    const loc = this.tempLocation().trim();
    if (loc && loc.length <= 40 && user && userId && token) {
      this.userService.updateLocationOnBackend(userId, loc, token).subscribe(
        (response: any) => {
          this.userService.updateLocation(response.location);
          this.userService.setCurrentUser(response);
          this.isEditingLocation.set(false);
        },
        error => {
          console.error('Erreur lors de la mise à jour de la localisation:', error);
          this.isEditingLocation.set(false);
        }
      );
    } else if (loc.length > 40) {
      console.warn('La localisation ne peut pas dépasser 40 caractères');
    } else {
      this.isEditingLocation.set(false);
    }
  }

  cancelEditLocation() {
    this.isEditingLocation.set(false);
    this.tempLocation.set('');
  }

  startEditStatus() { this.isEditingStatus.set(true); }
  selectStatus(status: string) {
    const user = this.readonlyUser();
    const token = localStorage.getItem('token');
    const userId = user?.id || user?._id;
    if (user && userId && token) {
      this.userService.updateStatusOnBackend(userId, status, token).subscribe(
        response => {
          this.userService.updateStatus(status);
          this.userService.setCurrentUser({ ...user, status });
          this.isEditingStatus.set(false);
        },
        error => {
          console.error('Erreur lors de la mise à jour du statut:', error);
          this.isEditingStatus.set(false);
        }
      );
    }
  }
  cancelEditStatus() { this.isEditingStatus.set(false); }

  getCurrentStatusIcon(): string {
    const currentStatus = this.readonlyUser()?.status;
    const statusOption = this.statusOptions.find(option => option.value === currentStatus);
    return statusOption ? statusOption.icon : '/assets/image/online.svg';
  }

  changeAvatar(emoji: string) {
    const user = this.readonlyUser();
    if (!user) return;
    this.userService.updateAvatar(emoji);
    this.showAvatarPicker.set(false);
  }

  openTalkSettings() { console.log('Paramètre des Talks'); }
  changePassword() {
    this.router.navigate(['/private/change-password']);
  }
  logout() { console.log('Se déconnecter'); this.router.navigate(['/']); }
  deleteAccount() { console.log('Supprimer mon compte'); }
  goHome() { this.router.navigate(['/home']); }
}