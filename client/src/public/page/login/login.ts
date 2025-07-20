import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { UserService } from '../../../shared/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../../shared/input/input';
import { Button } from '../../../shared/button/button';
import { Background } from '../../../shared/background/background';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent, Button, Background],
  templateUrl: './login.html'
})
export class Login {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private router: Router,
    private api: ApiService,
    private userService: UserService
  ) {}

  login() {
    const data = {
      username: this.username,
      password: this.password
    };

    this.api.login(data).subscribe({
      next: (res: any) => {
        // Stocke le token et l'utilisateur
        localStorage.setItem('token', res.token);
        this.userService.setCurrentUser(res.user);
        // Redirige vers la page home
        this.router.navigate(['/home']);
      },
      error: err => {
        this.error = err.error?.message || 'Erreur lors de la connexion';
      }
    });
  }
}
