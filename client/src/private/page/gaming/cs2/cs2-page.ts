import { Component } from '@angular/core';
// Update the import path to the correct location and filename
import { TalkzonePageComponent } from '../../../../shared/talkzone-page/talkzone-page';

@Component({
  selector: 'app-cs2-page',
  standalone: true,
  imports: [TalkzonePageComponent],
  template: `
    <app-talkzone-page
      [theme]="'gaming'"
      [subTheme]="'CS2'"
      [image]="'assets/image/CS2.jpg'"
      [posts]="posts"
    ></app-talkzone-page>
  `
})
export class Cs2PageComponent {
  posts = [
    {
      title: 'Titre du post',
      author: 'User 1',
      date: '07/05/25',
      lastReaction: '12h45'
    },
    // ...autres posts
  ];
}
