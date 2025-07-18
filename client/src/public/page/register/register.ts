import { Component } from '@angular/core';
import { Background } from '../../../shared/background/background';
import { Button } from '../../../shared/button/button';
import { InputComponent } from '../../../shared/input/input';

@Component({
  selector: 'app-register',
  imports: [Background, Button, InputComponent],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

}
