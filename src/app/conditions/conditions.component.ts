import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { DataService } from '../Data/data.service';
import { injections, Parameter } from '../Data/DataModel';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['../home/home.component.css']
})
export class ConditionsComponent  {

  id: number;
  numberOfInputs: String[] ;
  paramName:String[];
  SharedData : Data;
  selectedParametre :injections;
  @ViewChildren('baseInput') baseInputs: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChildren('typeSelect') typeSelects: QueryList<ElementRef<HTMLSelectElement>>;
  @ViewChildren('parameter') parameterInputs: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChildren('operator') operatorSelects: QueryList<ElementRef<HTMLSelectElement>>;
  
  constructor(private route: ActivatedRoute,private router: Router, private dataService: DataService) {
    this.SharedData = dataService.getSharedData();

    this.paramName = dataService.getparamName();
    console.log("constructor ::CONDITION : paam names list",this.paramName);
   }

  ngOnInit(): void {

    let idstring: string = this.route.snapshot.queryParamMap.get('id');
    this.id = +idstring;
    this.selectedParametre = this.dataService.getInjectionById(this.id);
    console.log("parametre selectionne : ",this.selectedParametre);
    console.log("id : ",this.id);
    console.log("Shared data : ",this.dataService.getSharedData())
  }

  SaveData() {
    this.selectedParametre.conditions =[];
    console.log("click save data");
    this.baseInputs.forEach((baseInput, index) => {
      const baseValue = baseInput.nativeElement.value;
      const typeValue = this.typeSelects.toArray()[index].nativeElement.value;
      const parameterValue = this.parameterInputs.toArray()[index].nativeElement.value;
      const operatorTypeValue = this.operatorSelects.toArray()[index].nativeElement.value;

      const liste = [parameterValue,operatorTypeValue,baseValue, typeValue];
      this.selectedParametre.conditions.push(liste);
      console.log("voila la liste :", liste);
      this.dataService.updateInjection(this.selectedParametre);
    });
    this.selectedParametre = this.dataService.getInjectionById(this.id);
    this.router.navigate(['injection'],);  

  }

  NewLine() {
    this.selectedParametre.conditions.push(["", "Nombre", "", "Nombre"]);
  }
  Deletes(id :number){
    console.log("click sur delete ::",id)
    this.dataService.deleteInjectionValueById(id,this.id);
    this.selectedParametre = this.dataService.getInjectionById(this.id)

  }
}
