import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
  
  constructor(private router: Router) {}

  currentUser = {
    username: 'Jerome_Dev',
    location: 'Franche Comté', 
    status: 'En ligne',
    avatar: '👤'
  };

  isEditingLocation = false;
  tempLocation = '';

  // Édition de la localisation
  startEditLocation() {
    this.isEditingLocation = true;
    this.tempLocation = this.currentUser.location;
  }

  saveLocation() {
    if (this.tempLocation.trim()) {
      this.currentUser.location = this.tempLocation.trim();
    }
    this.isEditingLocation = false;
  }

  cancelEditLocation() {
    this.isEditingLocation = false;
    this.tempLocation = '';
  }

  // Actions des boutons
  openTalkSettings() {
    console.log('Paramètre des Talks');
  }

  changePassword() {
    console.log('Modifier mon mot de passe');
  }

  logout() {
    console.log('Se déconnecter');
    this.router.navigate(['/']);
  }

  deleteAccount() {
    console.log('Supprimer mon compte');
  }

  // Navigation vers la page d'accueil
  goHome() {
    this.router.navigate(['/home']);
  }
}
