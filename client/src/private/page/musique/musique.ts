import { Component, ElementRef, ViewChild, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Background } from '../../../shared/background/background';
import { Talkzone } from '../../../shared/talkzone/talkzone';

@Component({
  selector: 'app-musique',
  standalone: true,
  imports: [Background, Talkzone, CommonModule, FormsModule],
  templateUrl: './musique.html'
})
export class Musique {
  
  constructor(private router: Router) {}

  @ViewChild('searchInput') searchInput!: ElementRef;

  isSearchOpen = signal(false);
  searchTerm = signal('');

  allTalkzones = [
    { title: '#RAP', image: '' },
    { title: '#ROCK', image: '' },
    { title: '#POP', image: '' },
    { title: '#ELECTRONIC', image: '' },
    { title: '#JAZZ', image: '' },
    { title: '#CLASSICAL', image: '' },
    { title: '#REGGAE', image: '' },
    { title: '#METAL', image: '' },
    { title: '#FUNK', image: '' },
    { title: '#BLUES', image: '' },
    { title: '#RNB', image: '' },
    { title: '#COUNTRY', image: '' }
  ];

  // Computed property pour filtrer les TalkZones
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

  // Getter/Setter pour la compatibilité avec ngModel
  get searchTermValue() {
    return this.searchTerm();
  }

  set searchTermValue(value: string) {
    this.searchTerm.set(value);
  }
}