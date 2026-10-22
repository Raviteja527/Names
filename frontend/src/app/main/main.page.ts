import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IonicImports } from '../shared/ionic-imports';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  imports: [
    ...IonicImports,
    RouterLink,
    RouterOutlet
  ]
})
export class MainPage {}