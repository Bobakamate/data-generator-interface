import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Value,Parameter ,Data} from '../Data/DataModel';
import { DataService } from '../Data/data.service';

@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['../home/home.component.css']
})
export class VisualisationComponent {
  SharedData : Data;// this.SharedData.parametres liste qui contein t les nom des parametrre 
   //  this.SharedData.parametres[id].valeurs  liste contenant les valeur pour chaque paramettre en corelation avec la liste Parametre

   constructor(private router: Router, private dataService: DataService) { 
    this.SharedData = dataService.getSharedData();
   }
  edit(){
    this.router.navigate(['']);

  }
  next(){
    this.router.navigate(['generation']);


  }
   

}
