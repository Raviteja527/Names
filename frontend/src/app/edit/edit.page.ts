import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicImports } from '../shared/ionic-imports';
import { NameService } from '../services/name';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
  imports: [
    ...IonicImports,
    FormsModule
  ]
})
export class EditPage implements OnInit {

  names: any[] = [];

  selectedId: number | null = null;
  editName = '';
  isUpdating = false;

  constructor(
    private nameService: NameService,
    private cdr: ChangeDetectorRef,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.loadNames();
  }

  loadNames() {
    this.nameService.getNames().subscribe({
      next: (response: any) => {

        console.log('EDIT NAMES:', response);

        this.names = response;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('EDIT ERROR:', error);
      }
    });
  }

  selectName(item: any) {

    this.selectedId = item.id;
    this.editName = item.name;

  }

  async showToast(message: string) {

    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });

    await toast.present();
  }

  updateName() {

    if (this.selectedId === null) {
      this.showToast('Please select a name');
      return;
    }

    if (!this.editName.trim()) {
      this.showToast('Please enter a name');
      return;
    }

    this.isUpdating = true;

    this.nameService
      .updateName(this.selectedId, this.editName.trim())
      .subscribe({

        next: (response) => {

          console.log('UPDATED:', response);

          this.isUpdating = false;
          this.selectedId = null;
          this.editName = '';

          this.loadNames();

          this.showToast('Name updated successfully!');
        },

        error: (error) => {

          console.error('UPDATE ERROR:', error);

          this.isUpdating = false;

          this.showToast('Failed to update name');
        }

      });
  }

  cancelEdit() {

    this.selectedId = null;
    this.editName = '';

  }
  async deleteName(item: any) {

    const alert = await this.alertController.create({
      header: 'Delete Name',
      message: `Are you sure you want to delete "${item.name}"?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {

            this.nameService.deleteName(item.id).subscribe({
              next: () => {

                this.loadNames();

                this.showToast('Name deleted successfully!');
              },

              error: (error) => {

                console.error('DELETE ERROR:', error);

                this.showToast('Failed to delete name');
              }
            });

          }
        }
      ]
    });

    await alert.present();
  }
}