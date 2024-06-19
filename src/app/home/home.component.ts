import { Component, ViewChildren, QueryList } from '@angular/core';
import {  Router } from '@angular/router';
import { DataService } from '../Data/data.service';
import { Data, Parameter } from '../Data/DataModel';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
   sharedDataParam :Parameter[];
  @ViewChildren('paramInput') paramInputs: QueryList<any>; // Récupère une liste de références aux éléments input
  sharedData : Data ;
 
  constructor(private router: Router, private dataService: DataService) { 
    this.sharedData = dataService.getDataFromStorage();
    console.log("this sared data from projet ::::::::::::::::::::::::::::::::::::::::::::::");
    console.log(this.sharedData);
    this.sharedDataParam = [];
  
    this.sharedDataParam = this.sharedData.parametres;
  }

  addValues( id :number ): void {
    this.router.navigate(['/app/add-values'], { queryParams: { id: id } });  }


  Deletes( id :number ): void {
      this.dataService.removeParameter(id);
      this.sharedData = this.dataService.getSharedData();
      this.sharedDataParam = this.sharedData.parametres;
     
    }

  addParametre(parametres : Parameter[]): void {
  
    // Récupère les valeurs des éléments input
    const inputValues = this.paramInputs.map(input => input.nativeElement.value);
    for (let i = 0; i < inputValues.length; i++) {
      const valeurInput = inputValues[i];
      parametres[i].parametreName = valeurInput;
        
   }
   console.log("liste des parametre :: paramet fonction",parametres);
     this.sharedData.parametres = parametres;
     this.dataService.setSharedData(this.sharedData);

     this.sharedDataParam = parametres;
     console.log(" shared data param :",this.sharedDataParam)


    console.log("que conteint ce input value wesh ::", inputValues)
    
    // Affiche les valeurs dans la console (à des fins de démonstration)
     
    const parameter: Parameter = {
      id: this.dataService.maxIndex() + 1,
      parametreName: "",
      valeurs: []
    };
   
    this.sharedDataParam.push(parameter) ;

   

 
    
 
    }
    next(){
      this.router.navigate(['/app/rules-box'])
      
    }
}
