import { Component } from '@angular/core';
import { Application, Data, Projet } from '../Data/DataModel';
import { ApplicationService, DataService } from '../Data/data.service';
import { Router } from '@angular/router';

 

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent {
  appData : Application;
  sharedData :Data
  
 
  constructor(private appService :ApplicationService,private data : DataService,private router :Router){
    this.appData = appService.getApplication();
    this.sharedData = data.getSharedData();
    console.log("SHared data ::::::::::::::::::::::::::::::::::::::::::::::");
    console.log(this.sharedData);



  }

  

  modalOuvert = false; // Déclaration de la propriété modalOuvert
  ajouterProjet(nom: string, description: string) {
    if (nom && description) {
      this.appData.projects.push({
        titre: nom, description: description, data: {
          parametres: [],
          regles: [],
          injections: [],
          injectionsColunm: [],
          injectionsLine:{ 
            parameters: [], 
            dynamicParameter: [], 
            reference: [
              [],
              []
            ] 
          }  
        },
        id: this.appService.getMaxProjectIndex() + 1 
      });
      this.appService.saveApplication(this.appData);
      
      this.fermerModal(); // Ferme le modal après avoir ajouté un projet
    }
  }

  ouvrirModal() {
    this.modalOuvert = true;
  }

  fermerModal() {
    this.modalOuvert = false;
  }

  ouvrirProjet(projet: Projet) {
    this.data.setSharedData(projet.data);
    this.appService.saveNumber(projet.id);
    this.router.navigate(['/app/data-generation']);


    // Ici vous pouvez implémenter l'action d'ouvrir un projet spécifique
    console.log('Projet ouvert:', projet);
    // Par exemple, naviguer vers une autre page ou afficher les détails du projet
  }
}
