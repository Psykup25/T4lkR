import { Component } from '@angular/core';
import { Button } from '../../../shared/button/button';


@Component({
  selector: 'app-login',
  imports: [Button],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
})
export class Login {}
