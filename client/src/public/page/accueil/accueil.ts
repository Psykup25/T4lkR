import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Background } from '../../../shared/background/background';
import { Button } from '../../../shared/button/button';

@Component({
  selector: 'app-accueil',
  imports: [Background, Button],
  templateUrl: './accueil.html'
})
export class Accueil {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
