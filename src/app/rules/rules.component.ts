import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../Data/data.service';
import { Condition } from '../Data/DataModel';
import { Data } from '../Data/DataModel'; 


@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['../home/home.component.css']
})
export class RulesComponent  {
  SharedData : Data;
  RulesList : Condition[];
  ParamId: number[];
  paramName:String[];
  @ViewChildren('parameter') parameterInputs: QueryList<ElementRef<HTMLSelectElement>>;
  @ViewChildren('operator') operatorInputs: QueryList<ElementRef<HTMLSelectElement>>;
  @ViewChildren('value') valueInputs: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChildren('next') nextInputs: QueryList<ElementRef<HTMLSelectElement>>;

  constructor(private route: ActivatedRoute,private router: Router, private dataService: DataService) {
    this.SharedData = dataService.getSharedData();
    this.paramName = dataService.getparamName();
    console.log("les om de parametre ",this.paramName);
    console.log("les om de parametre data service  ",dataService.getparamName());
    this.ParamId = dataService.getParamId();
    this.RulesList = this.SharedData.regles;
   }
  NewLine(){
    let newRule = {
      id : 0,
      parametreName: "",
      parametreId :0,
      operator: "add",
      value: "" ,
      NextId: 0,
      NextName: ""
  
    }
    this.RulesList.push(newRule);


  }
  SaveData() {
    this.RulesList = [];
    // Récupérer les éléments HTML à partir des QueryLists
    const parameterInputs = this.parameterInputs.toArray();
    const operatorInputs = this.operatorInputs.toArray();
    const valueInputs = this.valueInputs.toArray();
    const nextInputs = this.nextInputs.toArray();

    // Parcourir toutes les règles
    for (let i = 0; i < parameterInputs.length; i++) {
        // Vérifier si RulesList[i] existe
  
          // Récupérer les valeurs des éléments HTML correspondant à chaque règle
          const parameterValue = parameterInputs[i].nativeElement.value;
          const operatorValue = operatorInputs[i].nativeElement.value;
          const value = valueInputs[i].nativeElement.value;
          const nextValue = nextInputs[i].nativeElement.value;
            const rule = {
              id : i,
              parametreName: parameterValue,
              operator: operatorValue,
              parametreId :this.getIdByName(parameterValue),
              value: value,
              NextId: this.getIdByName(nextValue),
              NextName: nextValue
          };
          this.RulesList.push(rule);
          this.SharedData.regles =  this.RulesList ;
          this.dataService.setSharedData(this.SharedData);


           
       
    }

    // Afficher les règles mises à jour
    console.log("RulesList mise à jour :", this.RulesList);
    this.router.navigate(['/app/rules-views']);
}

  Deletes(id :number){
    this.dataService.deleteRuleByIndex(id);
    this.SharedData = this.dataService.getSharedData();
    this.RulesList = this.SharedData.regles;
    

  }
  getIdByName(name: string): number {
     const index = this.paramName.indexOf(name);
     return index;
}

 

}
