import { Component, ElementRef, ViewChild, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Background } from '../../../shared/background/background';
import { Talkzone } from '../../../shared/talkzone/talkzone';

@Component({
  selector: 'app-gaming',
  standalone: true,
  imports: [Background, Talkzone, CommonModule, FormsModule],
  templateUrl: './gaming.html'
})
export class Gaming {
  
  constructor(private router: Router) {}

  @ViewChild('searchInput') searchInput!: ElementRef;

  isSearchOpen = false;
  searchTerm = signal(''); // Utiliser un signal pour la réactivité

  allTalkzones = [
    { title: '#CS2', image: '' },
    { title: '#GTA', image: '' },
    { title: '#STEAM', image: '' },
    { title: '#PS', image: '' },
    { title: '#NINTENDO', image: '' },
    { title: '#XBOX', image: '' },
    { title: '#MOBILE', image: '' },
    { title: '#FPS', image: '' },
    { title: '#RPG', image: '' },
    { title: '#SPORTS', image: '' },
    { title: '#HORREUR', image: '' },
    { title: '#INDIE', image: '' }
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
    this.isSearchOpen = !this.isSearchOpen;
    if (this.isSearchOpen) {
      this.searchTerm.set('');
      // Focus l'input après que l'animation s'affiche
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
    // La recherche se fait automatiquement via le computed property
    console.log('Recherche:', this.searchTerm());
    console.log('Résultats:', this.filteredTalkzones());
  }

  clearSearch() {
    this.searchTerm.set('');
    this.isSearchOpen = false;
  }

  // Getter pour la compatibilité avec ngModel
  get searchTermValue() {
    return this.searchTerm();
  }

  set searchTermValue(value: string) {
    this.searchTerm.set(value);
  }
}
