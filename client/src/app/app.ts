import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from '../shared/button/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  standalone: true,
})
export class App {
  protected title = 'client';
}
