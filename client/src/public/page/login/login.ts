import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../shared/services/api.service';
import { Background } from '../../../shared/background/background';
import { Button } from "../../../shared/button/button";
import { InputComponent } from '../../../shared/input/input';


@Component({
  selector: 'app-login',
  imports: [Background, Button, InputComponent],
  templateUrl: './login.html'
})
export class Login {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private api: ApiService) {}

  login() {
    const data = {
      email: this.email,
      password: this.password
    };

    this.api.login(data).subscribe({
      next: (res) => {
        this.router.navigate(['/home']);
      },
      error: err => alert(err.error?.message || 'Erreur lors de la connexion')
    });
  }
}
