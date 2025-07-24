import { Component } from '@angular/core';
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
  currentUser: any;
  isEditingLocation = false;
  tempLocation = '';
  isAvatarPopupOpen = false;
  isEditingStatus = false;
  showAvatarPicker = false;

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

  constructor(private router: Router, private userService: UserService, private api: ApiService) {
    // Initialise le signal avec l'utilisateur connecté
    this.currentUser = this.userService.readonlyUser;
    const user = this.userService.currentUser();
    if (user) {
      this.userService.setCurrentUser(user);
    }
  }

  openAvatarPopup() { this.isAvatarPopupOpen = true; }
  closeAvatarPopup() { this.isAvatarPopupOpen = false; }

  selectAvatar(avatarPath: string) {
    const user = this.userService.currentUser();
    const token = localStorage.getItem('token');
    if (user && token) {
      this.userService.updateUserOnBackend(user.id, { avatar: avatarPath }, token).subscribe(
        response => {
          this.userService.updateAvatar(avatarPath);
          this.userService.setCurrentUser({ ...user, avatar: avatarPath });
          this.closeAvatarPopup();
        },
        error => {
          console.error('Erreur lors de la mise à jour de l\'avatar:', error);
        }
      );
    }
  }

  startEditLocation() {
    this.isEditingLocation = true;
    this.tempLocation = this.currentUser().location;
  }

  saveLocation() {
    const user = this.userService.currentUser();
    const token = localStorage.getItem('token');
    if (this.tempLocation.trim() && this.tempLocation.trim().length <= 40 && user && token) {
      this.userService.updateLocationOnBackend(user.id, this.tempLocation.trim(), token).subscribe(
        (response: any) => {
          this.userService.updateLocation(response.location);
          this.userService.setCurrentUser(response);
          this.isEditingLocation = false;
        },
        error => {
          console.error('Erreur lors de la mise à jour de la localisation:', error);
          this.isEditingLocation = false;
        }
      );
    } else if (this.tempLocation.trim().length > 40) {
      console.warn('La localisation ne peut pas dépasser 40 caractères');
    } else {
      this.isEditingLocation = false;
    }
  }

  cancelEditLocation() {
    this.isEditingLocation = false;
    this.tempLocation = '';
  }

  startEditStatus() { this.isEditingStatus = true; }
  selectStatus(status: string) {
    const user = this.userService.currentUser();
    const token = localStorage.getItem('token');
    if (user && token) {
      this.userService.updateStatusOnBackend(user.id, status, token).subscribe(
        response => {
          this.userService.updateStatus(status);
          this.userService.setCurrentUser({ ...user, status });
          this.isEditingStatus = false;
        },
        error => {
          console.error('Erreur lors de la mise à jour du statut:', error);
          this.isEditingStatus = false;
        }
      );
    }
  }
  cancelEditStatus() { this.isEditingStatus = false; }

  getCurrentStatusIcon(): string {
    const currentStatus = this.currentUser().status;
    const statusOption = this.statusOptions.find(option => option.value === currentStatus);
    return statusOption ? statusOption.icon : '/assets/image/online.svg';
  }

  changeAvatar(emoji: string) {
    const user = this.userService.currentUser();
    if (!user) return;
    user.avatar = emoji;
    this.userService.setCurrentUser({ ...user });
    this.showAvatarPicker = false;
  }

  openTalkSettings() { console.log('Paramètre des Talks'); }
  changePassword() { console.log('Modifier mon mot de passe'); }
  logout() { console.log('Se déconnecter'); this.router.navigate(['/']); }
  deleteAccount() { console.log('Supprimer mon compte'); }
  goHome() { this.router.navigate(['/home']); }
}

