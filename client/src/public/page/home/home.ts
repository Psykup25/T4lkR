import { Component } from '@angular/core';
import { Background } from '../../../shared/background/background';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Background],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
