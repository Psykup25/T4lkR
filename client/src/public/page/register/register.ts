import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Background } from '../../../shared/background/background';
import { Button } from '../../../shared/button/button';
import { InputComponent } from '../../../shared/input/input';
import { ApiService } from '../../../shared/services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, Background, Button, InputComponent, FormsModule],
  templateUrl: './register.html'
})
export class Register {
  username = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  birthDay: any;
  birthMonth: any;
  birthYear: any;
  selectedGender = signal('');
  acceptedTerms = signal(false);
  error = signal('');
  success = signal('');

  constructor(private router: Router, private api: ApiService) {}

  get days(): number[] {
    return Array.from({ length: 31 }, (_, i) => i + 1);
  }

  get months(): { value: number; label: string }[] {
    return [
      { value: 1, label: 'Jan' },
      { value: 2, label: 'Fév' },
      { value: 3, label: 'Mar' },
      { value: 4, label: 'Avr' },
      { value: 5, label: 'Mai' },
      { value: 6, label: 'Juin' },
      { value: 7, label: 'Juil' },
      { value: 8, label: 'Août' },
      { value: 9, label: 'Sep' },
      { value: 10, label: 'Oct' },
      { value: 11, label: 'Nov' },
      { value: 12, label: 'Déc' }
    ];
  }

  get validYears(): number[] {
    const currentYear = new Date().getFullYear();
    const maxYear = currentYear - 18;
    const minYear = currentYear - 100;
    const years = [];
    for (let year = maxYear; year >= minYear; year--) {
      years.push(year);
    }
    return years;
  }

  selectGender(gender: string) {
    if (
      (gender === 'male' && this.selectedGender() === 'Homme') ||
      (gender === 'female' && this.selectedGender() === 'Femme') ||
      (gender === 'other' && this.selectedGender() === 'Autre')
    ) {
      this.selectedGender.set('');
    } else if (gender === 'male') {
      this.selectedGender.set('Homme');
    } else if (gender === 'female') {
      this.selectedGender.set('Femme');
    } else {
      this.selectedGender.set('Autre');
    }
  }

  trackByMonth(index: number, month: { value: number; label: string }): number {
    return month.value;
  }

  createAccount() {
    this.error.set('');
    this.success.set('');
    const birthDate = this.birthYear && this.birthMonth && this.birthDay
      ? `${this.birthYear}-${String(this.birthMonth).padStart(2, '0')}-${String(this.birthDay).padStart(2, '0')}`
      : '';

    const data = {
      username: this.username(),
      email: this.email(),
      password: this.password(),
      birthDate,
      gender: this.selectedGender()
    };

    if (!data.username || !data.email || !data.password || !data.birthDate || !data.gender) {
      this.error.set('Tous les champs sont obligatoires.');
      return;
    }
    if (this.password() !== this.confirmPassword()) {
      this.error.set('Les mots de passe ne correspondent pas.');
      return;
    }
    if (!this.acceptedTerms()) {
      this.error.set('Vous devez accepter les CGU et la politique de confidentialité.');
      return;
    }

    this.api.register(data).subscribe({
      next: () => {
        this.success.set('Compte créé avec succès !');
        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      error: err => {
        this.error.set(err.error?.message || 'Erreur lors de la création du compte');
      }
    });
  }
}
