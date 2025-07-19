import { Component } from '@angular/core';
import { Background } from '../../../shared/background/background';
import { Button } from "../../../shared/button/button";
import { InputComponent } from '../../../shared/input/input';


@Component({
  selector: 'app-login',
  imports: [Background, Button, InputComponent],
  templateUrl: './login.html'
})
export class Login {}
