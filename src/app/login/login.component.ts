

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ApiServiceService } from '../api-service.service';
import { Data } from '../Data/DataModel';
import { ApplicationService } from '../Data/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;
  sharedData :Data;

  constructor(private authService: AuthService,private appService:ApplicationService, private router: Router, private dataService: ApiServiceService) { }

  login() {
    this.loginUser(this.username, this.password);
     
  }

  loginUser(username: string, password: string) {
    this.dataService.loginUser(username, password).subscribe(response => {
      console.log("Projet ",response.user);
      this.dataService.setUsername(response.user.username);
      console.log("getUsername get ::::::::::::",this.dataService.geUsername())
      console.log("Token ",response.token);
      this.dataService.setId(response.user._id);
      


      console.log('User logged in', response);
      this.dataService.setToken(response.token);
      console.log("TOkken get eget  ::::::::::::",this.dataService.getToken())

    //  this.getUserProjects(response.user._id);
      this.appService.saveApplication(
        {
          projects:response.projects
        }
      )
       
      this.router.navigate(['/app']);
    }, error => {
      alert('Username ou mot de passe incorrect');
      console.log('Login error', error);
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

