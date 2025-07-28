import { Component, ElementRef, ViewChild, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Background } from '../../../shared/background/background';
import { Talkzone } from '../../../shared/talkzone/talkzone';

@Component({
  selector: 'app-sport',
  standalone: true,
  imports: [Background, Talkzone, CommonModule, FormsModule],
  templateUrl: './sport.html'
})
export class Sport {
  
  constructor(private router: Router) {}

  @ViewChild('searchInput') searchInput!: ElementRef;

  isSearchOpen = signal(false);
  searchTerm = signal('');

  allTalkzones = [
    { title: '#FOOTBALL', image: '' },
    { title: '#BASKET', image: '' },
    { title: '#TENNIS', image: '' },
    { title: '#RUGBY', image: '/assets/image/rugby.svg' },
    { title: '#HAND', image: '/assets/image/hand.svg' },
    { title: '#VOLLEY', image: '/assets/image/volley.svg' },
    { title: '#NATATION', image: '/assets/image/natation.svg' },
    { title: '#BOXE', image: '/assets/image/boxe.svg' },
    { title: '#MMA', image: '/assets/image/mma.svg' },
    { title: '#F1', image: '/assets/image/f1.svg' },
    { title: '#CYCLISME', image: '/assets/image/cyclisme.svg' },
    { title: '#RUNNING', image: '/assets/image/running.svg' }
  ];

  filteredTalkzones = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    if (!search) {
      return this.allTalkzones;
    }
    
    return this.allTalkzones.filter(talkzone => 
      talkzone.title.toLowerCase().includes(search)
    );
  });

  goHome() {
    this.router.navigate(['/home']);
  }

  toggleSearch() {
    this.isSearchOpen.set(!this.isSearchOpen());
    if (this.isSearchOpen()) {
      this.searchTerm.set('');
      setTimeout(() => {
        if (this.searchInput) {
          this.searchInput.nativeElement.focus();
        }
      }, 100);
    } else {
      this.searchTerm.set('');
    }
  }

  performSearch() {
    console.log('Recherche:', this.searchTerm());
    console.log('Résultats:', this.filteredTalkzones());
  }

  clearSearch() {
    this.searchTerm.set('');
        this.isSearchOpen.set(false);
  }

  get searchTermValue() {
    return this.searchTerm();
  }

  set searchTermValue(value: string) {
    this.searchTerm.set(value);
  }
}
