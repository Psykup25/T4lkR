import { Component } from '@angular/core';

@Component({
  selector: 'app-background',
  template: `<div class="min-h-screen flex flex-col bg-page-gradient px-4 py-10"><ng-content></ng-content></div>`,
})
export class Background {}