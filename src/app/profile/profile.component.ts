import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../Data/data.service';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username : String

  constructor(private appService :ApiServiceService) {
   this.username =  appService.geUsername()


   }

  ngOnInit(): void {
  }

}
