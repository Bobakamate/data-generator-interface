import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../Data/data.service';
import { Condition, Data, injections } from '../Data/DataModel';

@Component({
  selector: 'app-injection',
  templateUrl: './injection.component.html',
  styleUrls: ['../home/home.component.css']
})
export class InjectionComponent  {
  id :number = 0;

  SharedData : Data;
  RulesList : injections[];
  ParamId: number[];
  paramName:String[];
  @ViewChildren('parameter') parameterInputs: QueryList<ElementRef<HTMLSelectElement>>;
  @ViewChildren('operator') operatorInputs: QueryList<ElementRef<HTMLSelectElement>>;
  @ViewChildren('value') valueInputs: QueryList<ElementRef<HTMLInputElement>>;

  

  constructor(private route: ActivatedRoute,private router: Router, private dataService: DataService) {
    this.SharedData = dataService.getSharedData();
    this.paramName = dataService.getparamName();
    console.log("les om de parametre ",this.paramName);
    console.log("les om de parametre data service  ",dataService.getparamName());
    this.ParamId = dataService.getParamId();
    this.RulesList = this.SharedData.injections;
   }
  NewLine(){
    let newRule = {
      id : 0,
      parametreName: "",
      parametreId :0,
      operator: "add",
      value: "" ,
      conditions:[]
  
    }
    this.RulesList = [];
    // Récupérer les éléments HTML à partir des QueryLists
    const parameterInputs = this.parameterInputs.toArray();
    const operatorInputs = this.operatorInputs.toArray();
    const valueInputs = this.valueInputs.toArray();
    

    // Parcourir toutes les règles
    for (let i = 0; i < parameterInputs.length; i++) {
        // Vérifier si RulesList[i] existe
  
          // Récupérer les valeurs des éléments HTML correspondant à chaque règle
          const parameterValue = parameterInputs[i].nativeElement.value;
          const operatorValue = operatorInputs[i].nativeElement.value;
          const value = valueInputs[i].nativeElement.value;
          
             const rule = {
              id : i,
              parametreName: parameterValue,
              operator: operatorValue,
              parametreId :this.getIdByName(parameterValue) +1,
              value: value,
              conditions:[]
          };
          this.RulesList.push(rule);
          this.SharedData.injections =  this.RulesList ;
          this.dataService.setSharedData(this.SharedData);


           
       
    }
    this.RulesList.push(newRule);


  }
  SaveData() {
    this.RulesList = [];
    // Récupérer les éléments HTML à partir des QueryLists
    const parameterInputs = this.parameterInputs.toArray();
    const operatorInputs = this.operatorInputs.toArray();
    const valueInputs = this.valueInputs.toArray();
    

    // Parcourir toutes les règles
    for (let i = 0; i < parameterInputs.length; i++) {
        // Vérifier si RulesList[i] existe
  
          // Récupérer les valeurs des éléments HTML correspondant à chaque règle
          const parameterValue = parameterInputs[i].nativeElement.value;
          const operatorValue = operatorInputs[i].nativeElement.value;
          const value = valueInputs[i].nativeElement.value;
          
             const rule = {
              id : i,
              parametreName: parameterValue,
              operator: operatorValue,
              parametreId :this.getIdByName(parameterValue) +1,
              value: value,
              conditions:[]
          };
          this.RulesList.push(rule);
          this.SharedData.injections =  this.RulesList ;
          this.dataService.setSharedData(this.SharedData);


           
       
    }

    // Afficher les règles mises à jour
    console.log("RulesList mise à jour :", this.RulesList);
    this.router.navigate(['injection-box']);
}

  Deletes(id :number){
    this.dataService.deleteRuleByIndexInjection(id);
    this.SharedData = this.dataService.getSharedData();
    this.RulesList = this.SharedData.injections;
    

  }
  getIdByName(name: string): number {
     const index = this.paramName.indexOf(name);
     return index;
}
AddConditions(id :number){
     this.router.navigate(['conditions'], { queryParams: { id: id } });  }


}
 

