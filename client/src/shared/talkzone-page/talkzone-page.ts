
import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Background } from '../background/background';

@Component({
  selector: 'app-talkzone-page',
  standalone: true,
  imports: [CommonModule, Background],
  templateUrl: './talkzone-page.html',
})
export class TalkzonePageComponent {
  @Input() theme: string = '';
  @Input() subTheme: string = '';
  @Input() image: string = '';
  @Input() posts: Array<any> = [];
  @Input() showSearch: boolean = true;

  searchQuery = signal('');

  get filteredPosts() {
    const query = this.searchQuery().toLowerCase();
    return this.posts.filter(post =>
      post.title?.toLowerCase().includes(query) ||
      post.author?.toLowerCase().includes(query)
    );
  }

  onSearchChange(value: string) {
    this.searchQuery.set(value);
  }

  goBack() {
    window.history.back();
  }
}
