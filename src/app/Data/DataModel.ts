export interface Value {
    id:number
    valeursBase: string[];
    
  }
  


export interface Parameter {
    id :number;
    parametreName: string;
    valeurs: string[][];
  }
  

  export interface Condition {
    id :number;
    parametreName: string;
    parametreId :number;
    operator: string;
    value: string;
    NextId: number;
    NextName: string;

  }
  export interface Data {
    parametres: Parameter[];
    regles: Condition[];
  }
  