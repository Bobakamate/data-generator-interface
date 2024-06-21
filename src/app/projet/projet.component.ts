import { ChangeDetectorRef, Component } from '@angular/core';
import { Application, Data, Projet } from '../Data/DataModel';
import { ApplicationService, DataService } from '../Data/data.service';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

 

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent {
  appData : Application;
  sharedData :Data;
  projetItem : Projet[]
   
 
  constructor(private appService :ApplicationService,private data : DataService,private router :Router,private apiService :ApiServiceService,private cdr: ChangeDetectorRef){
    this.appData = appService.getApplication();
    this.sharedData = data.getSharedData();
    this.projetItem = this.appData.projects;
    
    console.log("SHared data ::::::::::::::::::::::::::::::::::::::::::::::");
    console.log(this.sharedData);
    



  }

  

  modalOuvert = false; // Déclaration de la propriété modalOuvert
  ajouterProjet(nom: string, description: string) {
    if (nom && description) {
      let project :Projet = {
        titre: nom, description: description, data: {
          parametres: [],
          regles: [],
          injections: [],
          injectionsColunm: [],
          injectionsLine:{ 
            parameters: [], 
            dynamicParameter: [], 
            reference: [
              [],
              []
            ] 
          }  
        },
        id: this.appService.getMaxProjectIndex() + 1 
      };
      this.appData.projects.push(project);
      this.projetItem  =  this.appData.projects;
      this.appService.saveApplication(this.appData);
       this.apiService.addProjectToUser(project).subscribe(
        (response) => {
          console.log('Projet ajouté avec succès:', response);
          this.cdr.detectChanges()
          // Réactualiser la liste des projets ou effectuer d'autres actions après l'ajout
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du projet:', error);
          // Gérer les erreurs
        }
      );
      console.log(this.apiService.addProjectToUser(project));
      
      this.fermerModal(); // Ferme le modal après avoir ajouté un projet
      this.router.navigate(['/app/projets']);
    }
  }

  deleteP(projet: Projet) {
    const confirmation = window.confirm(`Êtes-vous sûr de vouloir supprimer le projet "${projet.titre}" ?`);
     
    if (confirmation) {
      this.deleteProject(projet.id.toString());//mongo db
      this.appService.deleteProjectById(projet.id);//page 
      this.projetItem  =  this.appData.projects;
      this.router.navigate(['/app/refresh']);
    }
  }

  deleteProject(projectId: string) {
    const userId = 'some-user-id'; // Replace with actual user ID
    this.apiService.deleteProjectFromUser(projectId).subscribe(
      (response) => {
        this.cdr.detectChanges()
        console.log('Projet Surpimer avec succès:', response);
        // Réactualiser la liste des projets ou effectuer d'autres actions après l'ajout
      },
      (error) => {
        console.error('Erreur lors de supresion du projet:', error);
        // Gérer les erreurs
      }
    );
  }

  downloadJsonFile(data :Projet): void {
    
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = data.titre + '.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.readFile(file);
    }
  }

  readFile(file: File): void {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const jsonText: string = e.target.result;
      try {
        const jsonObj: any = JSON.parse(jsonText);
        const projet = jsonObj as Projet 
        projet.id = this.appService.getMaxProjectIndex() +1 ;
        console.log('Fichier JSON chargé :', projet);
         

        this.sharedData = projet.data;
        this.appService.addProject(projet);
        this.apiService.addProjectToUser(projet);
        this. fermerModal() ;
        
       } catch (err) {
        console.error('Erreur de parsing du fichier JSON', err);
      }
    };
    reader.readAsText(file);
  }


  ouvrirModal() {
    this.modalOuvert = true;
  }

  fermerModal() {
    this.modalOuvert = false;
  }

  ouvrirProjet(projet: Projet) {
    this.data.setSharedData(projet.data);
    this.appService.saveNumber(projet.id);
    this.router.navigate(['/app/data-generation']);


    // Ici vous pouvez implémenter l'action d'ouvrir un projet spécifique
    console.log('Projet ouvert:', projet);
    // Par exemple, naviguer vers une autre page ou afficher les détails du projet
  }
}
