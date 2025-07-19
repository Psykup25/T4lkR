import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-conversation',
  standalone: true,
  templateUrl: './conversation.html'
})
export class Conversation {
  @Input() username: string = '';
  @Input() avatar: string = '👤';
  @Input() status: 'online' | 'away' | 'offline' = 'offline';
  @Input() borderColor: string = 'border-neon-pink';

  get statusColor(): string {
    switch (this.status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  }
}
