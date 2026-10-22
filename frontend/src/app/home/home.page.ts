import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonicImports } from '../shared/ionic-imports';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonicImports],
})
export class HomePage {
  constructor(private router: Router) {}

  goToCreate() {
    this.router.navigate(['/main/create']);
  }
}
