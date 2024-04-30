import { Component, OnInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Data, Parameter } from '../Data/DataModel';
import { DataService } from '../Data/data.service';

@Component({
  selector: 'app-add-values',
  templateUrl: './add-values.component.html',
  styleUrls: ['../home/home.component.css']
})
export class AddValuesComponent implements OnInit {
  id: number;
  numberOfInputs: String[] ;
  SharedData : Data;
  selectedParametre :Parameter;
  @ViewChildren('baseInput') baseInputs: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChildren('typeSelect') typeSelects: QueryList<ElementRef<HTMLSelectElement>>;
  @ViewChildren('percentageInput') percentageInputs: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChildren('intervalTypeSelect') intervalTypeSelects: QueryList<ElementRef<HTMLSelectElement>>;
  
  constructor(private route: ActivatedRoute,private router: Router, private dataService: DataService) {
    this.SharedData = dataService.getSharedData();
   }

  ngOnInit(): void {
    let idstring: string = this.route.snapshot.queryParamMap.get('id');
    this.id = +idstring;
    this.selectedParametre = this.dataService.getParameterById(this.id);
    console.log("parametre selectionne : ",this.selectedParametre);
    console.log("id : ",this.id);
    console.log("Shared data : ",this.dataService.getSharedData())
  }

  SaveData() {
    this.selectedParametre.valeurs =[];
    console.log("click save data");
    this.baseInputs.forEach((baseInput, index) => {
      const baseValue = baseInput.nativeElement.value;
      const typeValue = this.typeSelects.toArray()[index].nativeElement.value;
      const percentageValue = this.percentageInputs.toArray()[index].nativeElement.value;
      const intervalTypeValue = this.intervalTypeSelects.toArray()[index].nativeElement.value;

      const liste = [baseValue, typeValue, percentageValue, intervalTypeValue];
      this.selectedParametre.valeurs.push(liste);
      console.log("voila la liste :", liste);
      this.dataService.updateParameter(this.selectedParametre);
    });
    this.selectedParametre = this.dataService.getParameterById(this.id);
    this.router.navigate([''],);  

  }

  NewLine() {
    this.selectedParametre.valeurs.push(["", "Nombre", "", "Nombre"]);
  }
  Deletes(id :number){
    console.log("click sur delete ::",id)
    this.dataService.deleteValueById(id,this.id);
    this.selectedParametre = this.dataService.getParameterById(this.id)

  }
}
