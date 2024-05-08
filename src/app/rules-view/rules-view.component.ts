import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { DataService } from '../Data/data.service';

@Component({
  selector: 'app-rules-view',
  templateUrl: './rules-view.component.html',
  styleUrls: ['../home/home.component.css']
})
export class RulesViewComponent  {

  SharedData : Data;// this.SharedData.parametres liste qui contein t les nom des parametrre 
  //  this.SharedData.parametres[id].valeurs  liste contenant les valeur pour chaque paramettre en corelation avec la liste Parametre

  constructor(private router: Router, private dataService: DataService) { 
   this.SharedData = dataService.getSharedData();
  }
  
 edit(){
   this.router.navigate(['rules']);

 }
 next(){
   this.router.navigate(['rules-box']);


 }
}
