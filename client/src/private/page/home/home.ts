import { Component, computed } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { ApiService } from '../../../shared/services/api.service';
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
  constructor(
    private router: Router,
    private userService: UserService,
    private api: ApiService
  ) {
    this.readonlyUser = this.userService.readonlyUser;
  }
  
  readonlyUser: any;

  ngOnInit() {
    // Recharge l'utilisateur courant via le backend (cookie HTTPOnly)
    this.userService.fetchCurrentUser().subscribe({
      next: (user: any) => {
        if (user) {
          this.userService.setCurrentUser(user);
        }
      }
    });
    this.api.getHealth().subscribe({
      next: (res) => console.log('API health:', res),
      error: (err) => console.error('API error:', err)
    });
  }


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

  navigateToSport() {
    this.router.navigate(['/sport']);
  }

  navigateToCinema() {
    this.router.navigate(['/cinema']);
  }

  navigateToMusique() {
    this.router.navigate(['/musique']);
  }

  goToTalkzone(title: string) {
    // Associer chaque zone à son thème
    const zone = title.replace('#', '').toLowerCase();
    // Dictionnaire d'association zone -> thème
    const mapping: { [key: string]: string } = {
      cs2: 'gaming',
      tlou: 'gaming',
      apex: 'gaming',
      lol: 'gaming',
      soad: 'musique',
      psg: 'sport',
      // Ajoute ici d'autres associations si besoin
    };
    const theme = mapping[zone] || 'gaming';
    this.router.navigate([`/${theme}/${zone}`]);
  }
}
