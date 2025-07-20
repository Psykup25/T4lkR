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
      status: 'offline',
      borderColor: 'border-neon-pink'
    },
    {
      username: 'Bot_Helper',
      avatar: '🤖',
      status: 'online',
      borderColor: 'border-neon-purple'
    },
    {
      username: 'Bear_Gamer',
      avatar: '🐻',
      status: 'away',
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
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00FFCC',
        'neon-purple': '#5F5FFF', 
        'neon-pink': '#FF01AA'
      },
      fontFamily: {
        'jetbrains': ['JetBrains Mono', 'monospace']
      },
      backgroundImage: {
        'page-gradient': 'linear-gradient(0deg, rgba(255, 1, 170, 0.2) 0%, rgba(9, 0, 49, 0.2) 24.97%), #0F0F0F'
      },
      boxShadow: {
        'neon-cyan': '0 0 20px 4px rgba(0, 255, 204, 0.4)',
        'neon-pink': '0 0 20px 4px rgba(255, 1, 170, 0.4)',
        'page-shadow': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
      }
    }
  },
  plugins: []
}