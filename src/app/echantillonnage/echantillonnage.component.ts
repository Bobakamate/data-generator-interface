import { Component } from '@angular/core';

@Component({
  selector: 'app-echantillonnage',
  templateUrl: './echantillonnage.component.html',
  styleUrls: ['../home/home.component.css']
})
export class EchantillonnageComponent {

  files: File[] = [];

  onFileSelected(event: any) {
    const selectedFiles: FileList = event.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      this.files.push(selectedFiles.item(i)!);
    }
  }

  deleteFile(file: File) {
    const index = this.files.indexOf(file);
    if (index !== -1) {
      this.files.splice(index, 1);
    }
  }

  validate() {
    // Votre logique de validation ici
  }
}
