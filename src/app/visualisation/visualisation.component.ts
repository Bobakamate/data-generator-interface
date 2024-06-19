import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Value,Parameter ,Data, Application} from '../Data/DataModel';
import { ApplicationService, DataService } from '../Data/data.service';

@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['../home/home.component.css']
})
export class VisualisationComponent {
  SharedData : Data;// this.SharedData.parametres liste qui contein t les nom des parametrre 
  appData :Application;
 
   constructor(private router: Router, private dataService: DataService, private appService :ApplicationService) { 
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
    this.appService.addProject(projet)

   }


    this.router.navigate(['/app/generation']);


  }
   

}
