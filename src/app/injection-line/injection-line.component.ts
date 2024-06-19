import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { DataService } from '../Data/data.service';
import {  Router } from '@angular/router';
import { InjectionLineParameter ,Data} from '../Data/DataModel';

@Component({
  selector: 'app-injection-line',
  templateUrl: './injection-line.component.html',
  styleUrls: ['../home/home.component.css']
})
export class InjectionLineComponent implements OnInit {
  paramName: string[];
  selectedParameters: InjectionLineParameter[] = [];
  sharedData : Data;
  paramInput : String[];

  @ViewChildren('parameter') parameterSelects: QueryList<ElementRef>;
  @ViewChildren('paramInput') paramInputs: QueryList<ElementRef>;

  constructor(private dataService: DataService, private router: Router) {
    this.sharedData = dataService.getSharedData();
    this.selectedParameters = this.sharedData.injectionsLine.parameters; 
  }

  ngOnInit(): void {
    this.paramName = this.dataService.getparamName();
    
  }

  SaveData(): void {
    this.selectedParameters =[];
    const parameterSelectArray = this.parameterSelects.toArray();
    const paramInputArray = this.paramInputs.toArray();

    parameterSelectArray.forEach((parameterSelect, index) => {
      const parameterName = parameterSelect.nativeElement.value;
      const value = paramInputArray[index].nativeElement.value;
      const id = this.selectedParameters.length + 1; // or you can assign id according to your requirement
      const parametreId = this.paramName.indexOf(parameterName) + 1; // assuming ids start from 1

      const newParameter: InjectionLineParameter = {
        id,
        parametreName: parameterName,
        parametreId,
        value
      };

      this.selectedParameters.push(newParameter);
     });
     this.sharedData.injectionsLine.parameters = this.selectedParameters;
     this.dataService.setSharedData(this.sharedData);
     console.log(this.sharedData.injectionsLine);
     this.router.navigate(['/app/injection-box']);
  }

  removeParameter(index: number): void {
    this.selectedParameters.splice(index, 1);
  }

  dynamicValues(): void {
    this.router.navigate(['/app/dynamic-values']);
  }

  reference(): void {
    this.router.navigate(['/app/reference']);
  }
}

 
