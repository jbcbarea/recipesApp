import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractQuestionComponent } from '../abstract-question.component';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { IngridientsService } from 'src/app/services/ingridients.service';
import { IonSelect } from '@ionic/angular';

interface IngridientsCreation {
  ingredient: string;
  quantity: number;
  measurement: string;
}

@Component({
  selector: 'app-create-ingredients',
  templateUrl: './create-ingredients.component.html',
  styleUrls: ['./create-ingredients.component.scss'],
})
export class CreateIngredientsComponent
  extends AbstractQuestionComponent
  implements OnInit
{
  @ViewChild('ingredientSelect') ingredientSelect: IonSelect;
  searchTerm: string = '';
 
  filteredIngredi:string[];
  ingredients: IngridientsCreation[] = [
    { ingredient: '', quantity: 1, measurement: '' },
  ];
  ingredi: string[] = [];
  filteredIngridients: string[] = [];
  unitMeasurement: string[] = ['g', 'ml'];

  constructor(private ingredientsService: IngridientsService) {
    super();
  }

  ngOnInit() {
    this.ingredientsService.getIngridientsByName().subscribe((data: any) => {
      this.ingredi = data.sort((a, b) => a.localeCompare(b));
    });

    if (this.ingredients) {
      this.parentForm.controls[this.question.name].setValue(this.ingredients);
    }
    this.parentForm.valueChanges.subscribe(() => {
      if (this.parentForm.controls[this.question.name].value === null) {
        this.ingredients = [{ ingredient: '', quantity: 1, measurement: '' }];
        this.parentForm.controls[this.question.name].setValue(this.ingredients);
      }
    });
  }

  public filterIngredients(event: any): void {
    const searchTerm = event.detail.value.toLowerCase();
    this.filteredIngridients = this.ingredi.filter((ingredient) =>
      ingredient.toLowerCase().includes(searchTerm)
    );
       // Abrir el ion-select al escribir
       this.ingredientSelect.open();
  }
  public addIngredient(): void {
    this.ingredients.push({ ingredient: '', quantity: 1, measurement: '' });
    if (this.ingredients) {
      this.parentForm.controls[this.question.name].setValue(this.ingredients);
    }
  }
  onSearchChange(event: any) {
    this.searchTerm = event.detail.value.toLowerCase();
    this.filteredIngredi = this.ingredi.filter(ingrediente =>
      ingrediente.toLowerCase().includes(this.searchTerm)
    );
  }


  public removeIngredient(): void {
    if (this.ingredients.length > 1) {
      this.ingredients.splice(this.ingredients.length - 1, 1);
      this.parentForm.controls[this.question.name].setValue(this.ingredients);
    }
  }

  public validField(index: number): boolean {
    const formValue = this.parentForm.controls[this.question.name]?.value;
    return (
      !formValue ||
      !formValue[index] ||
      !formValue[index].ingredient ||
      !formValue[index].quantity ||
      !formValue[index].measurement ||
      formValue[index].quantity === 0 ||
      formValue[index].quantity < 0
    );
  }
}
