import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NameService } from '../services/name';
import { IonicImports } from '../shared/ionic-imports';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  imports: [CommonModule, FormsModule, IonicImports]
})
export class CreatePage {

  name = '';
  message = '';
  isSaving = false;

  constructor(
    private nameService: NameService,
    private cdr: ChangeDetectorRef,
    private toastController: ToastController
  ) { }

  saveName() {

    const nameToSave = this.name.trim();

    if (!nameToSave) {
      this.showToast('Please enter a name');
      return;
    }

    this.isSaving = true;

    this.nameService.addName(nameToSave).subscribe({

      next: (response) => {

        console.log('API success:', response);

        this.name = '';
        this.isSaving = false;

        this.cdr.detectChanges();

        this.showToast('Name saved successfully!');
      },

      error: (error) => {

        console.error('API ERROR:', error);

        this.isSaving = false;

        this.cdr.detectChanges();

        this.showToast('Failed to save name');
      }

    });
  }
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });

    await toast.present();
  }

}
