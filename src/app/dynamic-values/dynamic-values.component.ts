import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { DataService } from '../Data/data.service';
import { Data, dynamicParameter } from '../Data/DataModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dynamic-values',
  templateUrl: './dynamic-values.component.html',
  styleUrls: ['../home/home.component.css']
})
export class DynamicValuesComponent implements OnInit {
  paramName: String[];
  dynamicParameters: dynamicParameter[] = [];
  sharedData: Data;

  @ViewChildren('parameter') parameterSelects: QueryList<ElementRef>;
  @ViewChildren('paramInput') paramInputs: QueryList<ElementRef>;
  @ViewChildren('fonction') fonctionSelects: QueryList<ElementRef>;
  @ViewChildren('limite') limiteSelects: QueryList<ElementRef>;

  constructor(private dataService: DataService, private router :Router) { }

  ngOnInit(): void {
    this.sharedData = this.dataService.getSharedData();
    this.dynamicParameters = this.sharedData.injectionsLine.dynamicParameter;
    this.paramName = this.dataService.getparamName();
  }

  NewLine(): void {
    const newItem: dynamicParameter = {
      id: 0,
      parametreName: '',
      parametreId: 0,
      value: ['', '', ''] // Initialiser avec des chaînes vides
    };
    this.dynamicParameters.push(newItem);
  }

  SaveData(): void {
    this.dynamicParameters = [];
    const parameterSelectArray = this.parameterSelects.toArray();
    const paramInputArray = this.paramInputs.toArray();
    const fonctionSelectArray = this.fonctionSelects.toArray();
    const limiteSelectArray = this.limiteSelects.toArray();

    parameterSelectArray.forEach((parameterSelect, index) => {
      const parametreName = parameterSelect.nativeElement.value;
      const value = paramInputArray[index].nativeElement.value;
      const fonctionValue = fonctionSelectArray[index].nativeElement.value;
      const limiteValue = limiteSelectArray[index].nativeElement.value;

      const newParameter: dynamicParameter = {
        id: index + 1, // or you can assign id according to your requirement
        parametreName,
        parametreId: this.paramName.indexOf(parametreName) + 1, // assuming ids start from 1
        value: [value, fonctionValue, limiteValue]
      };

      this.dynamicParameters.push(newParameter);
    });

    this.sharedData.injectionsLine.dynamicParameter = this.dynamicParameters;
    this.dataService.setSharedData(this.sharedData);
    console.log(this.sharedData.injectionsLine);
    this.router.navigate(['injection-line']);
  }
  Deletes(index : number){
    this.dataService.deleteDynamicValueByIndex(index);
    this.dynamicParameters = this.dataService.getSharedData().injectionsLine.dynamicParameter


  }

}
