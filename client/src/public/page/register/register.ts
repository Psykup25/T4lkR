import { Component } from '@angular/core';
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
  username: any;
  email: any;
  password: any;
  confirmPassword: any;
  birthDay: any;
  birthMonth: any;
  birthYear: any;
  selectedGender: string = '';
  acceptedTerms: boolean = false;

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
    // Si déjà sélectionné, on désélectionne
    if (
      (gender === 'male' && this.selectedGender === 'Homme') ||
      (gender === 'female' && this.selectedGender === 'Femme') ||
      (gender === 'other' && this.selectedGender === 'Autre')
    ) {
      this.selectedGender = '';
    } else if (gender === 'male') {
      this.selectedGender = 'Homme';
    } else if (gender === 'female') {
      this.selectedGender = 'Femme';
    } else {
      this.selectedGender = 'Autre';
    }
  }

  trackByMonth(index: number, month: { value: number; label: string }): number {
    return month.value;
  }

  createAccount() {
    // Assemble la date de naissance
    const birthDate = this.birthYear && this.birthMonth && this.birthDay
      ? `${this.birthYear}-${String(this.birthMonth).padStart(2, '0')}-${String(this.birthDay).padStart(2, '0')}`
      : '';

    const data = {
      username: this.username,
      email: this.email,
      password: this.password,
      birthDate,
      gender: this.selectedGender
    };
    console.log('Register payload:', data);

    // Vérification simple côté front
    if (!data.username || !data.email || !data.password || !data.birthDate || !data.gender) {
      alert('Tous les champs sont obligatoires.');
      return;
    }
    if (this.password !== this.confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
    if (!this.acceptedTerms) {
      alert('Vous devez accepter les CGU et la politique de confidentialité.');
      return;
    }

    this.api.register(data).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => {
        // Affiche le message d'erreur du backend pour comprendre le 400
        alert(err.error?.message || 'Erreur lors de la création du compte');
        console.error('Erreur backend:', err.error);
      }
    });
  }
}
