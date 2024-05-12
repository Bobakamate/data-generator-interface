import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../Data/data.service';
import { Data } from '../Data/DataModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['../home/home.component.css']
})
export class ReferenceComponent implements OnInit {
  paramName: String[];
  sharedData: Data;

  @ViewChild('injectionFrequence') injectionFrequenceSelect: ElementRef;
  @ViewChild('statue') statueSelect: ElementRef;
  @ViewChild('parameter') parameterSelect: ElementRef;
  @ViewChild('fonction') fontionSelect: ElementRef;
  @ViewChild('raison') raison: ElementRef;


  constructor(private dataService: DataService,private router :Router) {}

  ngOnInit(): void {
    this.paramName = this.dataService.getparamName();
    this.sharedData = this.dataService.getSharedData();
  }

  SaveData(): void {
    const injectionFrequence = this.injectionFrequenceSelect.nativeElement.value;
    const statue = this.statueSelect.nativeElement.value;
    const parameter = this.parameterSelect.nativeElement.value;
    const fontion = this.fontionSelect.nativeElement.value;
    const raison = this.raison.nativeElement.value;

    const newReference: string[][] = [[injectionFrequence, statue,] ,[parameter, fontion,raison]];
    this.sharedData.injectionsLine.reference = newReference;
    this.dataService.setSharedData(this.sharedData);
    console.log(this.sharedData.injectionsLine.reference);
    this.router.navigate(['injection-line']);

  }
}
