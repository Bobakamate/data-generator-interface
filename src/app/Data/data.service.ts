import { Injectable } from '@angular/core';
import { Data, Parameter } from './DataModel';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private sharedData: Data;

  constructor() {
    // Initialisation des données partagées depuis les variables de session
    const storedData = sessionStorage.getItem('sharedData');
    console.log("appelele du constructer ",storedData);
    this.sharedData = storedData ? JSON.parse(storedData) : { parametres: [], regles: [] };
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


  getSharedData(): Data {
    return this.sharedData;
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

  updateParameter(parameter: Parameter): void {
    const index = this.sharedData.parametres.findIndex(param => param.id === parameter.id);
    if (index !== -1) {
      this.sharedData.parametres[index] = parameter;
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
 


 }