import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-dynamic-container',
  templateUrl: './dynamic-container.component.html',
  styleUrls: ['./dynamic-container.component.css']
})
export class DynamicContainerComponent  {
  username :String;
  constructor(private apiService :ApiServiceService) { 
    this.username = apiService.geUsername() ;

  }

  

}
