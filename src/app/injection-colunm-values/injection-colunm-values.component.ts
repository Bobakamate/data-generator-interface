import { Component, ElementRef, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../Data/data.service';
import { Data, injections ,ParameterInjection} from '../Data/DataModel';

@Component({
  selector: 'app-injection-colunm-values',
  templateUrl: './injection-colunm-values.component.html',
  styleUrls: ['../home/home.component.css',"./injection-colunm-values.component.css"]
})
export class InjectionColunmValuesComponent  {

  SharedData : Data;
  RulesList : injections[];
  ParamId: number[];
  paramName:String[];
  id:number;
  selectedParametre :ParameterInjection;
  
  @ViewChildren('parameter') parameterInputs: QueryList<ElementRef<HTMLSelectElement>>;
  @ViewChildren('operator') operatorInputs: QueryList<ElementRef<HTMLSelectElement>>;
  @ViewChildren('value') valueInputs: QueryList<ElementRef<HTMLInputElement>>;

  @ViewChildren('parameterAction') parameterAction: QueryList<ElementRef<HTMLSelectElement>>;
  @ViewChildren('operatorAction') operatorAction: QueryList<ElementRef<HTMLSelectElement>>;
  @ViewChildren('valueAction') valueAction: QueryList<ElementRef<HTMLInputElement>>;

  constructor(private route: ActivatedRoute,private router: Router, private dataService: DataService) {
    let idstring: string = this.route.snapshot.queryParamMap.get('id');
    this.id = +idstring;
    this.SharedData = dataService.getSharedData();
    this.paramName = dataService.getparamName();
   
    console.log("les om de parametre data service  ",dataService.getparamName());
    this.ParamId = dataService.getParamId();
    this.selectedParametre = this.dataService.getParameterByIdInjectionColunm(this.id);
    console.log("les om de parametre ",this.selectedParametre);
  

   }
   NewLine() {
    let injectionVar :injections =  {
      id : 0,
      parametreName: "",
      operator: "",
      parametreId :0,
      value: "",
      conditions:[
        ["","",""]
      ]
  };
    let newRule: ParameterInjection = {
        id: 0,
        parametreName: "",
        valeurs: []// Initialiser avec un tableau vide
    };

    this.selectedParametre.valeurs.push(injectionVar);
}

  SaveData() {
    this.selectedParametre.valeurs = [];
    // Récupérer les éléments HTML à partir des QueryLists
    const parameterInputs = this.parameterInputs.toArray();
    const operatorInputs = this.operatorInputs.toArray();
    const valueInputs = this.valueInputs.toArray();
    const parameterAction = this.parameterAction.toArray() ;
    const operatorAction =  this.operatorAction.toArray();
    const valueAction =  this.valueAction.toArray();

    // Parcourir toutes les règles
    for (let i = 0; i < parameterInputs.length; i++) {
        // Vérifier si RulesList[i] existe
  
          // Récupérer les valeurs des éléments HTML correspondant à chaque règle
          const parameterValue = parameterInputs[i].nativeElement.value;
          const operatorValue = operatorInputs[i].nativeElement.value;
          const value = valueInputs[i].nativeElement.value;
          const parameterActionValue = parameterAction[i].nativeElement.value ;
          const operatorActionValue =  operatorAction[i].nativeElement.value;
          const valueActionValue =  valueAction[i].nativeElement.value;
          
             let injectionVar :injections =  {
              id : i,
              parametreName: parameterValue,
              operator: operatorValue,
              parametreId :this.getIdByName(parameterValue),
              value: value,
              conditions:[[
                parameterActionValue,
                operatorActionValue,
                valueActionValue

              ]
              ]
          };
          
          this.selectedParametre.valeurs.push(injectionVar);
          


           
       
    }
    const structure = this.SharedData.injectionsColunm.find(
      (colunm) => colunm.id === this.id
    );
    structure.valeurs = this.selectedParametre.valeurs;

     this.dataService.setSharedData(this.SharedData);

    // Afficher les règles mises à jour
    console.log("RulesList mise à jour :", this.RulesList);
    this.router.navigate(['/app/injection-box']);
}

  Deletes(id :number){
    this.dataService.deleteRuleByIndexInjectionColunm(id,this.id);
    this.SharedData = this.dataService.getSharedData();
    const structure = this.SharedData.injectionsColunm.find(
      (colunm) => colunm.id === this.id
    );
    this.selectedParametre.valeurs = structure.valeurs;
    

  }
  getIdByName(name: string): number {
     const index = this.paramName.indexOf(name);
     return index;
}
}
