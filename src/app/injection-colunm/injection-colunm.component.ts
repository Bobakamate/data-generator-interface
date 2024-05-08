import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Data, ParameterInjection } from '../Data/DataModel';
import { DataService } from '../Data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-injection-colunm',
  templateUrl: './injection-colunm.component.html',
  styleUrls: ['../home/home.component.css']
})
export class InjectionColunmComponent  {

  sharedDataParam :ParameterInjection[];
  @ViewChildren('paramInput') paramInputs: QueryList<any>; // Récupère une liste de références aux éléments input
  sharedData : Data ;
 
  constructor(private router: Router, private dataService: DataService) { 
    this.sharedData = dataService.getSharedData();
    this.sharedDataParam = [];
  
    this.sharedDataParam = this.sharedData.injectionsColunm;
  }

  addValues( id :number ): void {
    this.router.navigate(['injection-add-values'], { queryParams: { id: id } });  }


  Deletes( id :number ): void {
      this.dataService.removeParameterInjection(id);
      this.sharedData = this.dataService.getSharedData();
      this.sharedDataParam = this.sharedData.injectionsColunm;
     
    }

  addParametre(parametres : ParameterInjection[]): void {
  
    // Récupère les valeurs des éléments input
    const inputValues = this.paramInputs.map(input => input.nativeElement.value);
    for (let i = 0; i < inputValues.length; i++) {
      const valeurInput = inputValues[i];
      parametres[i].parametreName = valeurInput;
        
   }
   console.log("liste des parametre :: paramet fonction",parametres);
     this.sharedData.injectionsColunm = parametres;
     this.dataService.setSharedData(this.sharedData);

     this.sharedDataParam = parametres;
     console.log(" shared data param :",this.sharedDataParam)


    console.log("que conteint ce input value wesh ::", inputValues)
    
    // Affiche les valeurs dans la console (à des fins de démonstration)
     
    const parameter: ParameterInjection = {
      id: this.dataService.maxIndexInjection() + 1,
      parametreName: "",
      valeurs: []
    };
   
    this.sharedDataParam.push(parameter) ;

   

 
    
 
    }
    next(parametres : ParameterInjection[]){
      const inputValues = this.paramInputs.map(input => input.nativeElement.value);
      for (let i = 0; i < inputValues.length; i++) {
        const valeurInput = inputValues[i];
        parametres[i].parametreName = valeurInput;
          
     }
        this.sharedData.injectionsColunm = parametres;
       this.dataService.setSharedData(this.sharedData);
  
       this.sharedDataParam = parametres;
       
      this.router.navigate(['injection-box'])
      
    }
}
