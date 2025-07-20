import { Component, computed } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { Background } from '../../../shared/background/background';
import { Button } from '../../../shared/button/button';
import { Talkzone } from '../../../shared/talkzone/talkzone';
import { Conversation } from '../../../shared/conversation/conversation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Background, Button, Talkzone, Conversation, CommonModule],
  templateUrl: './home.html'
})
export class Home {
  constructor(private router: Router, private userService: UserService) {}

  currentUser = computed(() => ({
    username: this.userService.currentUser().username,
    avatar: this.userService.currentUser().avatar
  }));

  conversations = [
    {
      username: 'Alice_2024',
      avatar: '👽',
      status: 'offline' as 'online' | 'away' | 'offline',
      borderColor: 'border-neon-pink'
    },
    {
      username: 'Bot_Helper',
      avatar: '🤖',
      status: 'online' as 'online' | 'away' | 'offline',
      borderColor: 'border-neon-purple'
    },
    {
      username: 'Bear_Gamer',
      avatar: '🐻',
      status: 'away' as 'online' | 'away' | 'offline',
      borderColor: 'border-neon-cyan'
    },
    {
      username: 'AI_Assistant',
      avatar: '🤖',
      status: 'online' as 'online' | 'away' | 'offline',
      borderColor: 'border-neon-pink'
    }
  ];

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  scrollLeft() {
    const slider = document.getElementById('talkzoneSlider');
    if (slider) {
      slider.scrollBy({ left: -150, behavior: 'smooth' });
    }
  }

  scrollRight() {
    const slider = document.getElementById('talkzoneSlider');
    if (slider) {
      slider.scrollBy({ left: 150, behavior: 'smooth' });
    }
  }

  scrollConversationLeft() {
    const slider = document.getElementById('conversationSlider');
    if (slider) {
      slider.scrollBy({ left: -100, behavior: 'smooth' });
    }
  }

  scrollConversationRight() {
    const slider = document.getElementById('conversationSlider');
    if (slider) {
      slider.scrollBy({ left: 100, behavior: 'smooth' });
    }
  }

  navigateToGaming() {
    this.router.navigate(['/gaming']);
  }
}
