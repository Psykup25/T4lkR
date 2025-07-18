import { Component } from '@angular/core';
import { Background } from '../../../shared/background/background';
import { Button } from "../../../shared/button/button";
import { InputComponent } from '../../../shared/input/input';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [Background, Button, InputComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
