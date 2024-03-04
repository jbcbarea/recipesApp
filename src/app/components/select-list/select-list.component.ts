import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { AbstractQuestionComponent } from '../abstract-question.component';

interface DependenciesValues {
  name: string;
  value: string;
}

interface Test {
  name: string;
  order: number;
  questions: Question[];
}

interface Question {
  id: number;
  name: string;
  label: string;
  questionTypeId: number;
  order: number;
  required: boolean;
  cols: string;
  extra: string;
  choices: {
    key: string;
    value: string;
    order: number;
  }[];
}


@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss'],
})
export class SelectListComponent extends AbstractQuestionComponent implements OnInit {

  //TODO: Crear la classe abstractQuestionComponent y que hereden de ella .....
  public disable = true;
  //tipar a Choices
  auxChoices: any[];
  value: string;
  dependenciesValues: DependenciesValues[] = [];
  pruebasArray:Test[]=[
            {
                "name": "1.Entrada de datos",
                "order": 1,
                "questions": [
                    {
                        "id": 331,
                        "name": "ccaa-331",
                        "label": "Régimen de la SS",
                        "questionTypeId": 3,
                        "order": 9,
                        "required": true,
                        "cols": "col-md-6 col-xl-3;col-12;col-12",
                        "extra": "concat",
                        "choices": [
                            {
                                "key": "01",
                                "value": "Régimen General de la Seguridad Social",
                                "order": 1
                            },
                            {
                                "key": "05",
                                "value": "Régimen Especial de Trabajadores Autónomos",
                                "order": 2
                            },
                            {
                                "key": "08",
                                "value": "Régimen Especial de Trabajadores del Mar",
                                "order": 3
                            },
                            {
                                "key": "09",
                                "value": "Régimen Especial de la Minería del Carbón",
                                "order": 4
                            },
                            {
                                "key": "Se desconoce",
                                "value": "Se desconoce",
                                "order": 5
                            }
                        ]
                    },
                    {
                        "id": 332,
                        "name": "ccaa-332",
                        "label": "Situación profesional",
                        "questionTypeId": 3,
                        "order": 10,
                        "required": true,
                        "cols": "col-md-6 col-xl-3;col-12;col-12",
                        "extra": "concat",
                        "choices": [
                            {
                                "key": "1",
                                "value": "Asalariado sector privado",
                                "order": 1
                            },
                            {
                                "key": "2",
                                "value": "Asalariado sector público",
                                "order": 2
                            },
                            {
                                "key": "3",
                                "value": "Autónomo sin asalariados",
                                "order": 3
                            },
                            {
                                "key": "4",
                                "value": "Autónomo con asalariados",
                                "order": 4
                            },
                            {
                                "key": "Se desconoce",
                                "value": "Se desconoce",
                                "order": 5
                            }
                        ]
                    }
                ]  
            },
            {
                "name": "4. Datos del accidente",
                "order": 4,
                "questions": [
                    {
                        "id": 345,
                        "name": "ccaa-345",
                        "label": "Lugar del accidente",
                        "questionTypeId": 3,
                        "order": 1,
                        "required": true,
                        "cols": "col-md-6 col-xl-3;col-12;col-12",
                        "extra": "concat",
                        "choices": [
                            {
                                "key": "1",
                                "value": "En el centro de trabajo habitual",
                                "order": 1
                            },
                            {
                                "key": "2",
                                "value": "En desplazamiento",
                                "order": 2
                            },
                            {
                                "key": "3",
                                "value": "Al ir o volver del trabajo",
                                "order": 3
                            },
                            {
                                "key": "4",
                                "value": "En otro centro de trabajo",
                                "order": 4
                            }
                        ]
                    }
                ]
            }
       ]
            
    
  constructor() {super()}

  async ngOnInit(): Promise<void> {

  }

  validField(): boolean {
    return (this.name?.invalid && (this.name?.dirty || this.name.touched)) || (this.parentForm.controls[this.question.name]?.invalid);
  }
  
}

