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
    this.router.navigate(['rules']);

  }
  next(){
    this.router.navigate(['visualisation']);


  }

}
