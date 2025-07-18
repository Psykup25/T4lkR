import { Component } from '@angular/core';
import { Background } from '../../../shared/background/background';
import { Button } from "../../../shared/button/button";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [Background, Button],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {}
