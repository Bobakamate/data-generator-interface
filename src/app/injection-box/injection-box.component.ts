import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-injection-box',
  templateUrl: './injection-box.component.html',
  styleUrls: ['../home/home.component.css']
})
export class InjectionBoxComponent  {
  constructor(private router: Router) { }    
  uploadedFileName: string = '';
  @ViewChild('fileInput') fileInput: ElementRef; 
  Edit(){
    this.router.navigate(['/app/injection']);
  }
  NewLine(){
    this.router.navigate(['/app/injection-line']);


  }
  triggerFileInput() {
    this.fileInput.nativeElement.click(); // Déclenche l'élément input file caché
  }

  uploadFile(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.uploadedFileName = file.name; // Récupère le nom du fichier
      // Vous pouvez ajouter ici la logique pour télécharger ou manipuler le fichier si nécessaire
    }
  }
  NewColunm(){
    this.router.navigate(['/app/injection-colunm']);

  }
  Back(){
    this.router.navigate(['/app/rules-box']);

  }

  
}
