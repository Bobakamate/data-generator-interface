import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Data, Router } from '@angular/router';
import { ApplicationService } from '../Data/data.service';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent  {

  username: string;
  password: string;
  sharedData :Data;

  constructor(private authService: AuthService,private appService:ApplicationService, private router: Router, private dataService: ApiServiceService) { }

  login() {
    this.loginUser(this.username, this.password);
     
  }

  loginUser(username: string, password: string) {
    this.dataService.createUser(username, password).subscribe(response => {
      console.log("Projet ",response.projects);
      console.log("Token ",response.token);


      console.log('User logged in', response);
      this.dataService.setToken(response.token);
    //  this.getUserProjects(response.user._id);
      this.appService.saveApplication(
        {
          projects:response.projects
        }
      )
       
      this.router.navigate(['/login']);
    }, error => {
      alert("Username deja utiliser");
      console.log('create error', error);
    });
  }

  getUserProjects(userId: string) {
    this.dataService.getUserProjects(userId).subscribe(response => {
      console.log('User projects', response);
    }, error => {
      console.log('Error fetching user projects', error);
    });
  }
}
