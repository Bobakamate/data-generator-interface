import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rules-box',
  templateUrl: './rules-box.component.html',
  styleUrls: ['../home/home.component.css']
})
export class RulesBoxComponent {

  constructor(private router: Router) { }


  add(){
    this.router.navigate(['/app/rules']);

  }
  next(){
    this.router.navigate(['/app/visualisation']);


  }
  injection(){
    this.router.navigate(['/app/injection-box']);


  }
  echantillon(){
    this.router.navigate(['/app/echantillonnage']);


  }
  

}
