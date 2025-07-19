import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-conversation',
  standalone: true,
  templateUrl: './conversation.html'
})
export class Conversation {
  @Input() username: string = '';
  @Input() avatar: string = '👤';
  @Input() statusColor: string = 'bg-gray-500';
  @Input() borderColor: string = 'border-neon-pink';
}
