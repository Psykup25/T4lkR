import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Background } from '../../../shared/background/background';
import { Button } from '../../../shared/button/button';
import { InputComponent } from '../../../shared/input/input';

@Component({
  selector: 'app-register',
  imports: [CommonModule, Background, Button, InputComponent],
  templateUrl: './register.html'
})
export class Register {
  
  constructor(private router: Router) {}
  
  selectedGender: string = '';

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
    this.selectedGender = gender;
  }

  trackByMonth(index: number, month: { value: number; label: string }): number {
    return month.value;
  }

  createAccount() {
    this.router.navigate(['/login']);
  }
}
