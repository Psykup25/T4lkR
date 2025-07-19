import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-talkzone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './talkzone.html',
  styleUrl: './talkzone.css'
})
export class Talkzone {
  @Input() title: string = '#TITLE';
  @Input() image: string = '';
  @Input() altText: string = 'TalkZone';
  @Input() borderColor: string = '#FF01AA';
}
