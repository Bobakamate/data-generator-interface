import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Projet } from './Data/DataModel';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = 'http://localhost:3000/api';
  private token: string | null = null;
  private projects: Projet[] = [];
  private username : String = "";
  constructor(private http: HttpClient) {
    
   }

  // Create user
  createUser(username: string, password: string): Observable<any> {
    const user = { username, password, projects: [] };
    return this.http.post<{ user: any, token: string, projects: Projet[] }>(`${this.apiUrl}/users`, user)
      .pipe(
        map(response => {
          this.setToken(response.token);
          this.setProjects(response.projects || []);
          return response.user;
        }),
        catchError(this.handleError)
      );
  }
  deleteProjectFromUser(projectId: string): Observable<any> {
    const userId = this.getId(); // Obtenez l'ID utilisateur à partir du token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
  
    return this.http.delete(`${this.apiUrl}/users/${userId}/projects/${projectId}`, { headers })
      .pipe(catchError(this.handleError));
  }
  addProjectToUser(project: Projet): Observable<any> {
    const userId = this.getId();
    const token = this.getToken();

    console.log('User ID:', userId);
    console.log('Token:', token);
    console.log('Project:', project);

    if (!userId || !token) {
        return throwError('User ID or token is missing');
    }

    const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json');

 
    return this.http.put<any>(`${this.apiUrl}/users/${userId}/projects`, project, { headers, responseType: 'json' })
        .pipe(
            tap((responseData) => {
                console.log('Server Response:', responseData); // Log de la réponse du serveur
            }),
            catchError(this.handleError)
        );
}


    
  geUsername(){
    
      let username = localStorage.getItem('username');
      if(username){
        this.username = username
        return username;
      }else{
        return "vide";

      }
      
    
   }
  setUsername(username:string){
    this.username = username;
    localStorage.setItem('username', username);
  }

  // Login user
  loginUser(username: string, password: string): Observable<any> {
    return this.http.post<{ user: any, token: string, projects: Projet[] }>(`${this.apiUrl}/users/login`, { username, password })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Save token and projects
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }
  setId(id: string) {
 
    localStorage.setItem('userId', id);
  }
  getId(): string | null {
    
      let id =  localStorage.getItem('userId');
      return id;
    
   }

  // Save projects
  setProjects(projects: Projet[]) {
    this.projects = projects;
  }

  // Get token
  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  // Get projects
  getProjects(): Projet[] {
    return this.projects;
  }

  // Get user projects
  getUserProjects(userId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.get(`${this.apiUrl}/users/${userId}/projects`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Add project to user


  // Update project
  updateProject(projectId: string, project: Projet): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.put(`${this.apiUrl}/projects/${projectId}`, project, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error);
  }
}
