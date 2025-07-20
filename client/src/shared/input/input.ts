import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.html'
})
export class InputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() autocomplete: string = '';

  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  onValueChange(val: any) {
    this.value = val;
    this.valueChange.emit(val);
  }
}
