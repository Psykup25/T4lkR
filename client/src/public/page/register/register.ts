import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Background } from '../../../shared/background/background';
import { Button } from '../../../shared/button/button';
import { InputComponent } from '../../../shared/input/input';

@Component({
  selector: 'app-register',
  imports: [CommonModule, Background, Button, InputComponent],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  
  constructor(private router: Router) {}
  
  // Variable pour stocker le genre sélectionné
  selectedGender: string = '';

  // Génère automatiquement les jours (1-31)
  get days(): number[] {
    return Array.from({ length: 31 }, (_, i) => i + 1);
  }

  // Mois avec leurs abréviations
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

  // Génère automatiquement les années valides pour les majeurs (18+)
  get validYears(): number[] {
    const currentYear = new Date().getFullYear();
    const maxYear = currentYear - 18; // Année max pour être majeur
    const minYear = currentYear - 100; // Limite raisonnable (100 ans)
    
    const years = [];
    for (let year = maxYear; year >= minYear; year--) {
      years.push(year);
    }
    return years;
  }

  // Fonction pour sélectionner un genre
  selectGender(gender: string) {
    this.selectedGender = gender;
  }

  // Fonction trackBy pour optimiser le rendu des mois
  trackByMonth(index: number, month: { value: number; label: string }): number {
    return month.value;
  }

  // Fonction pour créer un compte et rediriger vers login
  createAccount() {
    // Ici vous pourrez ajouter la logique de validation et d'envoi des données
    // Pour l'instant, on redirige directement vers login
    this.router.navigate(['/login']);
  }

}
