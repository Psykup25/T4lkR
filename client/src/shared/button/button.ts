import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.html',
})
export class Button {
  @Input() type: string = 'button'; // Permet de définir le type du bouton (submit, button, etc.)
}
