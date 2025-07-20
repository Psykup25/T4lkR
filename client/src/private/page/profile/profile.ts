import { Component, computed } from '@angular/core';
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
  constructor(private router: Router, private userService: UserService, private api: ApiService) {}

  currentUser = computed(() => this.userService.currentUser());

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

  avatarEmojis = [
    '👤','👽','🤖','🐻','🐱','🐶','🦊','🐸','🐵','🦄','🐼','🐧','🐯','🐰','🦁','🐨','🐙','🐢','🐲','🧙‍♂️','🧑‍🚀','🧑‍🎤','🧑‍💻','🧑‍🏫','🧑‍🎨','🧑‍🚒','🧑‍✈️'
  ];

  openAvatarPopup() { this.isAvatarPopupOpen = true; }
  closeAvatarPopup() { this.isAvatarPopupOpen = false; }

  selectAvatar(avatarPath: string) {
    // Met à jour l'avatar côté backend et frontend
    const updateProfileResult = this.api.updateProfile({ avatar: avatarPath });
    // Si updateProfile retourne void, effectuez la mise à jour localement
    this.userService.setCurrentUser({ ...this.currentUser(), avatar: avatarPath });
    this.closeAvatarPopup();
  }

  startEditLocation() {
    this.isEditingLocation = true;
    this.tempLocation = this.currentUser().location;
  }

  saveLocation() {
    if (this.tempLocation.trim() && this.tempLocation.trim().length <= 40) {
      this.userService.updateLocation(this.tempLocation.trim());
      this.isEditingLocation = false;
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
    this.userService.updateStatus(status);
    this.isEditingStatus = false;
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
    this.api.updateProfile({ avatar: emoji }).subscribe({
      next: (updatedUser: any) => {
        this.userService.setCurrentUser(updatedUser);
        this.showAvatarPicker = false;
      },
      error: (err: any) => alert('Erreur lors de la mise à jour de l\'avatar')
    });
  }

  openTalkSettings() { console.log('Paramètre des Talks'); }
  changePassword() { console.log('Modifier mon mot de passe'); }
  logout() { console.log('Se déconnecter'); this.router.navigate(['/']); }
  deleteAccount() { console.log('Supprimer mon compte'); }
  goHome() { this.router.navigate(['/home']); }
}

