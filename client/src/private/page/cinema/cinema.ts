import { Component, ElementRef, ViewChild, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Background } from '../../../shared/background/background';
import { Talkzone } from '../../../shared/talkzone/talkzone';

@Component({
  selector: 'app-cinema',
  standalone: true,
  imports: [Background, Talkzone, CommonModule, FormsModule],
  templateUrl: './cinema.html'
})
export class Cinema {
  
  constructor(private router: Router) {}

  @ViewChild('searchInput') searchInput!: ElementRef;

  isSearchOpen = signal(false);
  searchTerm = signal('');

  allTalkzones = [
    { title: '#MARVEL', image: '' },
    { title: '#DC', image: '' },
    { title: '#STARWARS', image: '' },
    { title: '#ANIME', image: '' },
    { title: '#HORROR', image: '' },
    { title: '#SCIFI', image: '' },
    { title: '#COMEDIE', image: '' },
    { title: '#ACTION', image: '' },
    { title: '#DRAMA', image: '' },
    { title: '#FANTASY', image: '' },
    { title: '#THRILLER', image: '' },
    { title: '#ROMANCE', image: '' }
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
