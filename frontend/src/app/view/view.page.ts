import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IonicImports } from '../shared/ionic-imports';
import { NameService } from '../services/name';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
  imports: [
    ...IonicImports
  ]
})
export class ViewPage implements OnInit {

  names: any[] = [];

  constructor(
    private nameService: NameService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadNames();
  }

  loadNames() {
    this.nameService.getNames().subscribe({
      next: (response: any) => {

        console.log('VIEW NAMES:', response);

        this.names = response;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('VIEW ERROR:', error);
      }
    });
  }
}