import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { async } from 'rxjs';
import { AbstractQuestionComponent } from '../abstract-question.component';
import { IngridientsService } from 'src/app/services/ingridients.service';

enum SpliDelimiter {
  firstLevel = '$',
}

enum ExtraFromQuestionProperties {
  extraFile = 0,
  extraKey = 1,
}

interface AccordionRowData {
  name: string;
  calories: string;
  fats: string;
  proteins: string;
  checked:boolean;
}

@Component({
  selector: 'app-list-accordion',
  templateUrl: './list-accordion.component.html',
  styleUrls: ['./list-accordion.component.scss'],
})
export class ListAccordionComponent
  extends AbstractQuestionComponent
  implements OnInit
{
  extraKey!: string;
  ingridientsFromServer: any[];
  check_box:boolean;
  accordionRowData: AccordionRowData[] = [];
  ingridients: any[] = [];
  initConfiguration: any;
  //parentForm: FormGroup;

  constructor(
    private http: HttpClient,
    private ingridientsService: IngridientsService
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    console.log(this.question);
    await this.getIngridientsFromServer(this.extraKey);
    this.parentForm.valueChanges.subscribe(() => {
      // Aquí checkBox!!
      if (this.parentForm.controls[this.question.name].value === null) {
        for(let i=0;i<this.accordionRowData.length;i++) {
          this.accordionRowData[i].checked = false;
        }
      }
    });

  }

  public onCheckboxChange(item: string, event: any) {
    if (event.detail.checked) {
      this.ingridients.push(item);
      this.parentForm.controls[this.question.name].setValue(this.ingridients);
    } else {
      // Quita el elemento del array de selecciones
      const index = this.ingridients.indexOf(item);
      if (index !== -1) {
        this.ingridients.splice(index, 1);
      }
    }
  }

  private async getIngridientsFromServer(extraKey: string): Promise<void> {
    this.ingridientsService.getIngridients().subscribe((data: any) => {
      this.ingridientsFromServer = { ...data.ingredientes };

      for (const accordionItems of (this.ingridientsFromServer as any)[
        this.question.name]) {
        const rowAccordionData: AccordionRowData = {
          name: accordionItems.nombre,
          calories: accordionItems.calorias_por_100g,
          fats: accordionItems.grasas_por_100g,
          proteins: accordionItems.proteinas_por_100g,
          checked: false
        };
        this.accordionRowData.push(rowAccordionData);
      }
    });
  }
}
