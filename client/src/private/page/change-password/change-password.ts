

import { Component, signal } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { UserService } from '../../../shared/services/user.service';
import { Router } from '@angular/router';
import { Background } from '../../../shared/background/background';
import { InputComponent } from '../../../shared/input/input';
import { Button } from '../../../shared/button/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.html',
  standalone: true,
  imports: [Background, InputComponent, Button, CommonModule],
  providers: [ApiService]
})
export class ChangePasswordComponent {
  readonlyUser;

  currentPassword = signal('');
  newPassword = signal('');
  confirmPassword = signal('');
  loading = signal(false);
  error = signal('');
  success = signal('');

  constructor(private api: ApiService, private router: Router, private userService: UserService) {
    this.readonlyUser = this.userService.readonlyUser;
  }


  goBack() {
    window.history.back();
  }

  async changePassword() {
    this.error.set('');
    this.success.set('');
    if (!this.currentPassword() || !this.newPassword() || !this.confirmPassword()) {
      this.error.set('Tous les champs sont obligatoires.');
      return;
    }
    if (this.newPassword() !== this.confirmPassword()) {
      this.error.set('Les nouveaux mots de passe ne correspondent pas.');
      return;
    }
    if (this.newPassword().length < 6) {
      this.error.set('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    this.loading.set(true);
    try {
      const userId = this.readonlyUser().id || this.readonlyUser()._id;
      await this.api.changePassword(userId, this.currentPassword(), this.newPassword()).toPromise();
      this.success.set('Mot de passe changé avec succès !');
      this.currentPassword.set('');
      this.newPassword.set('');
      this.confirmPassword.set('');
    } catch (err: any) {
      this.error.set(err?.error?.message || 'Erreur lors du changement de mot de passe.');
    }
    this.loading.set(false);
  }
}
