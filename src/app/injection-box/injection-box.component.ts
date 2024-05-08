import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-injection-box',
  templateUrl: './injection-box.component.html',
  styleUrls: ['../home/home.component.css']
})
export class InjectionBoxComponent  {
  constructor(private router: Router) { }    

  Edit(){
    this.router.navigate(['injection']);
  }
  NewLine(){
    this.router.navigate(['injection-line']);


  }
  NewColunm(){
    this.router.navigate(['injection-colunm']);

  }
  Back(){
    this.router.navigate(['rules-box']);

  }

  
}
