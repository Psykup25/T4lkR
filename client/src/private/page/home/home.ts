import { Component } from '@angular/core';
import { Background } from '../../../shared/background/background';
import { Button } from '../../../shared/button/button';
import { Talkzone } from '../../../shared/talkzone/talkzone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Background, Button, Talkzone, CommonModule],
  templateUrl: './home.html'
})
export class Home {
  currentUser = {
    username: 'Jerome_Dev',
    avatar: null
  };
}
