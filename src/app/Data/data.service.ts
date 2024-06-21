import { Injectable } from '@angular/core';
import { Application, Data, Parameter, ParameterInjection,Projet,injections } from './DataModel';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private appData: Application;
 

  constructor() { 
    this.appData = this.getApplication();
  }
  saveNumber(num: number): void {
    sessionStorage.setItem('storedNumber', num.toString());
  }

  getSavedNumber(): number  {
    const storedNumber = sessionStorage.getItem('storedNumber');
    return storedNumber ? parseInt(storedNumber, 10) : -1;
  }

  saveApplication(application: Application): void {
    sessionStorage.setItem('application', JSON.stringify(application));
  }

  getApplication(): Application  {
    const storedApplication = sessionStorage.getItem('application');
    return storedApplication ? JSON.parse(storedApplication) as Application :{
       projects: [
        {
        id:0,
        data :{ 
          parametres: [], 
          regles: [], 
          injections: [], 
          injectionsColunm: [], 
          injectionsLine: { 
            parameters: [], 
            dynamicParameter: [], 
            reference: [
              [],
              []
            ] 
          } 
        },
        titre:"Projet 1",
        description:"Description du projet 1"
        },
        {
          id:1,
          data :{ 
            parametres: [], 
            regles: [], 
            injections: [], 
            injectionsColunm: [], 
            injectionsLine: { 
              parameters: [], 
              dynamicParameter: [], 
              reference: [
                [],
                []
              ] 
            } 
          },
          titre:"Projet 2",
          description:"Description du projet 2"
          }
       ] 
      }; ;
  }

  clearApplication(): void {
    sessionStorage.removeItem('application');
  }

  // Fonction pour récupérer un projet par son ID
  getProjectById(projectId: number): Projet | null {
    const application = this.getApplication();
    if (application) {
      return application.projects.find(proj => proj.id === projectId) || null;
    }
    return null;
  }

  // Fonction pour récupérer l'index maximal des projets
  getMaxProjectIndex(): number {
    const application = this.getApplication();
    if (application) {
      return application.projects.reduce((maxIndex, proj) => proj.id > maxIndex ? proj.id : maxIndex, -1);
    }
    return -1;
  }

  // Fonction pour ajouter un projet à l'application
  addProject(project: Projet): void {
    const application = this.getApplication();
    if (application) {
      application.projects.unshift(project);
      this.saveApplication(application);
    }
  }

  // Fonction pour supprimer un projet de l'application par son ID
  deleteProjectById(projectId: number): void {
    const application = this.getApplication();
    if (application) {
      application.projects = application.projects.filter(proj => proj.id !== projectId);
      this.saveApplication(application);
    }
  }



}


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private sharedData: Data;

  constructor() {
    // Initialisation des données partagées depuis les variables de session
    const storedData = sessionStorage.getItem('sharedData');
    console.log("appelele du constructer ",storedData);
    this.sharedData = storedData ? JSON.parse(storedData) : { 
      parametres: [], 
      regles: [], 
      injections: [], 
      injectionsColunm: [], 
      injectionsLine: { 
        parameters: [], 
        dynamicParameter: [], 
        reference: [
          [],
          []
        ] 
      } 
    };
      }
  maxIndex(): number {
    if (this.sharedData.parametres.length === 0) {
        return 0; // Si la liste de paramètres est vide, retourne -1
    } else {
        return this.sharedData.parametres.reduce((maxIndex, param) => {
            return (param.id > maxIndex) ? param.id : maxIndex;
        }, -Infinity);
    }
}
maxIndexInjection(): number {
  if (this.sharedData.injectionsColunm.length === 0) {
      return 0; // Si la liste de paramètres est vide, retourne -1
  } else {
      return this.sharedData.injectionsColunm.reduce((maxIndex, param) => {
          return (param.id > maxIndex) ? param.id : maxIndex;
      }, -Infinity);
  }
}


  getSharedData(): Data {
    
    return this.sharedData;
  }
  getDataFromStorage(): Data {
    const data = sessionStorage.getItem('sharedData');
    if (data) {
      console.log("c est la bonne recuperartion;::::::::::::::::::::::::::::::::::::: ");
      return  this.sharedData = JSON.parse(data);
      
    }
    return this.sharedData ;
     
  }
  

  setSharedData(data: Data): void {
    this.sharedData = data;
    console.log("enregistrement data :", this.sharedData.parametres);
    console.log("enregistrement data RUles  :", this.sharedData.regles);

    // Stockage des données dans les variables de session
    sessionStorage.setItem('sharedData', JSON.stringify(data));
  }

  addParameter(parameter: Parameter): void {
    this.sharedData.parametres.push(parameter);
    this.setSharedData(this.sharedData); // Mise à jour des données partagées
  }
  getParameterById(id: number): Parameter {
    return this.sharedData.parametres.find(parametre => parametre.id === id);
}
getInjectionById(id: number): injections {
  return this.sharedData.injections.find(parametre => parametre.id === id);
}
getParameterByIdInjectionColunm(id: number): ParameterInjection {
  return this.sharedData.injectionsColunm.find(parametre => parametre.id === id);
}


  addParameters(parametreNames: string[]): void {
    this.sharedData.parametres = [];
    parametreNames.forEach((parametreName, index) => {
      const parameter: Parameter = {
        id: index,
        parametreName: parametreName,
        valeurs: []
      };
 

      // Ajoute le nouveau paramètre à l'index spécifié dans la liste existante
      this.sharedData.parametres.push(parameter);
    });

    this.setSharedData(this.sharedData); // Mise à jour des données partagées
  }

  removeParameter(parameterId: number): void {
      this.sharedData.parametres = this.sharedData.parametres.filter(param => param.id !== parameterId);
    this.setSharedData(this.sharedData); // Mise à jour des données partagées
   }
   removeParameterInjection(parameterId: number): void {
    this.sharedData.injectionsColunm = this.sharedData.injectionsColunm.filter(param => param.id !== parameterId);
  this.setSharedData(this.sharedData); // Mise à jour des données partagées
 }

  updateParameter(parameter: Parameter): void {
    const index = this.sharedData.parametres.findIndex(param => param.id === parameter.id);
    if (index !== -1) {
      this.sharedData.parametres[index] = parameter;
      this.setSharedData(this.sharedData); // Mise à jour des données partagées
    }
   }
   updateInjection(parameter: injections): void {
    const index = this.sharedData.injections.findIndex(param => param.id === parameter.id);
    if (index !== -1) {
      this.sharedData.injections[index] = parameter;
      this.setSharedData(this.sharedData); // Mise à jour des données partagées
    }
   }
   deleteValueById(id: number, parametreId: number): void {
    console.log("ID de la valeur à supprimer :", id);
    console.log("Avant la suppression :", this.getParameterById(parametreId));
    
    const parametre = this.sharedData.parametres.find(param => param.id === parametreId);
    if (parametre) {
        const valeurIndex = id;
        if (valeurIndex !== -1) {
            parametre.valeurs.splice(valeurIndex, 1); // Supprimer la valeur du tableau
            console.log("Après la suppression :", this.getParameterById(parametreId));
            this.setSharedData(this.sharedData); // Mise à jour des données partagées
        } else {
            console.log("La valeur avec l'ID spécifié n'a pas été trouvée.");
        }
    } else {
        console.log("Le paramètre avec l'ID spécifié n'a pas été trouvé.");
    }
}
deleteInjectionValueById(id: number, parametreId: number): void {
  console.log("ID de la valeur à supprimer injections :", id);
  console.log("Avant la suppression Injections :....", this.getInjectionById(parametreId));
  
  const parametre = this.sharedData.injections.find(param => param.id === parametreId);
  if (parametre) {
      const valeurIndex = id;
      if (valeurIndex !== -1) {
          parametre.conditions.splice(valeurIndex, 1); // Supprimer la valeur du tableau
          console.log("Après la suppression :", this.getParameterById(parametreId));
          this.setSharedData(this.sharedData); // Mise à jour des données partagées
      } else {
          console.log("La valeur avec l'ID spécifié n'a pas été trouvée.");
      }
  } else {
      console.log("Le paramètre avec l'ID spécifié n'a pas été trouvé.");
  }
}
getparamName(): string[] {
  return this.sharedData.parametres.map(param => param.parametreName);
}

getParamId(): number[] {
  return this.sharedData.parametres.map(param => param.id);
}

deleteRuleByIndex(index: number): void {
  if (index >= 0 && index < this.sharedData.regles.length) {
    // Supprimer la règle de la liste des règles
    this.sharedData.regles.splice(index, 1);
    // Mettre à jour les données partagées
    this.setSharedData(this.sharedData);
  } else {
    console.error(`Index ${index} hors des limites.`);
  }
}
deleteDynamicValueByIndex(index: number): void {
  if (index >= 0 && index < this.sharedData.injectionsLine.dynamicParameter.length) {
    // Supprimer la règle de la liste des règles
    this.sharedData.injectionsLine.dynamicParameter.splice(index, 1);
    // Mettre à jour les données partagées
    this.setSharedData(this.sharedData);
  } else {
    console.error(`Index ${index} hors des limites.`);
  }
}
deleteRuleByIndexInjection(index: number): void {
  if (index >= 0 && index < this.sharedData.injections.length) {
    // Supprimer la règle de la liste des règles
    this.sharedData.injections.splice(index, 1);
    // Mettre à jour les données partagées
    this.setSharedData(this.sharedData);
  } else {
    console.error(`Index ${index} hors des limites.`);
  }
}

deleteRuleByIndexInjectionColunm(index: number, id: number): void {
  // Rechercher la structure de données correspondant à l'ID donné
  const structure = this.sharedData.injectionsColunm.find(
    (colunm) => colunm.id === id
  );

  // Vérifier si la structure correspondante a été trouvée
  if (structure) {
    // Vérifier si l'index est valide pour la liste des valeurs de la structure
    if (index >= 0 && index < structure.valeurs.length) {
      // Supprimer la règle de la liste des règles de la structure
      structure.valeurs.splice(index, 1);
      console.log(
        "deleteRuleByIndexInjection ::::::: ",
        structure.valeurs
      );
      // Mettre à jour les données partagées
      this.setSharedData(this.sharedData);
    } else {
      console.error(`Index ${index} hors des limites pour l'ID ${id}.`);
    }
  } else {
    console.error(`Aucune structure de données trouvée pour l'ID ${id}.`);
  }
}



 }
