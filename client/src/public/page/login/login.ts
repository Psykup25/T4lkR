import { Component, signal } from '@angular/core';
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
  username = signal('');
  password = signal('');
  error = signal('');

  constructor(
    private router: Router,
    private api: ApiService,
    private userService: UserService
  ) {}

  login() {
    const data = {
      username: this.username(),
      password: this.password()
    };

    this.api.login(data).subscribe({
      next: (res: any) => {
        // Le backend doit envoyer le cookie HTTPOnly automatiquement
        this.userService.setCurrentUser(res.user);
        this.router.navigate(['/home']);
      },
      error: err => {
        this.error.set(err.error?.message || 'Erreur lors de la connexion');
      }
    });
  }
}
