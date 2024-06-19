import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../Data/data.service';
import { Projet } from '../Data/DataModel';

 

@Component({
  selector: 'app-data-download',
  templateUrl: './data-download.component.html',
  styleUrls: ['./data-download.component.css',]
})
export class DataDownloadComponent implements OnInit {
  dataFiles: Projet[] ;

  constructor(private appService : ApplicationService) { 
    this. dataFiles = this.appService.getApplication().projects
  }

  ngOnInit(): void {
    // Initialisation ou récupération des données si nécessaire
  }

  downloadFile(file: Projet) {
    // Logique pour télécharger le fichier
    console.log('Téléchargement du fichier:', file);
    // Implémentez ici la logique pour télécharger le fichier en fonction de son type
    // Vous pouvez utiliser des services Angular ou une simple gestion des événements pour déclencher le téléchargement
  }
}
