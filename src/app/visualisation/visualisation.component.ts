import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Value,Parameter ,Data, Application} from '../Data/DataModel';
import { ApplicationService, DataService } from '../Data/data.service';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['../home/home.component.css']
})
export class VisualisationComponent {
  SharedData : Data;// this.SharedData.parametres liste qui contein t les nom des parametrre 
  appData :Application;
 
   constructor(private router: Router, private dataService: DataService, private appService :ApplicationService,private apiService:ApiServiceService) { 
    this.SharedData = dataService.getSharedData();
   }
  edit(){
    this.router.navigate(['/app/data-generation']);

  }
  next(){
    const id = this.appService.getSavedNumber()
   
   let projet =  this.appService.getProjectById(id);
   if(projet){
    projet.data = this.SharedData;
    this.appService.deleteProjectById(id);
    this.appService.addProject(projet);
    this.apiService.addProjectToUser(projet).subscribe(
      (response) => {
        console.log('Projet ajouter avec succès:', response);
        // Réactualiser la liste des projets ou effectuer d'autres actions après l'ajout
      },
      (error) => {
        console.error('Erreur lors de ajout du projet:', error);
        // Gérer les erreurs
      }
    );;

   }


    this.router.navigate(['/app/generation']);


  }
   

}
