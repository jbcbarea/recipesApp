import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractQuestionComponent } from '../abstract-question.component';

interface RecipeSteps {
  step:string
}
@Component({
  selector: 'app-create-recipe-steps',
  templateUrl: './create-recipe-steps.component.html',
  styleUrls: ['./create-recipe-steps.component.scss'],
})
export class CreateRecipeStepsComponent extends AbstractQuestionComponent  implements OnInit {

  @Output() validFieldEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  //recipeSteps:RecipeSteps [] = [{step:'Paso 1: '}];
  recipeSteps:RecipeSteps [] = [{step:''}];
  steps:number = 2;
  constructor() {
    super();
  }

  ngOnInit() {
    if(this.recipeSteps) {
      this.parentForm.controls[this.question.name].setValue(this.recipeSteps);
    }
    this.parentForm.valueChanges.subscribe(() => {
      if (this.parentForm.controls[this.question.name].value === null) {
        //this.recipeSteps = [{step:'Paso 1: '}];
        this.recipeSteps= [{step:''}];
        this.parentForm.controls[this.question.name].setValue(this.recipeSteps);
      }
    });
  }

  addStep() {
    this.recipeSteps.push({step:''});
    if (this.parentForm && this.question && this.parentForm.controls[this.question.name]) {
      this.parentForm.controls[this.question.name].setValue(this.recipeSteps);
    }
  }
  
  removeStep() {
    if(this.recipeSteps.length > 1) {
      //this.steps--;
      this.recipeSteps.splice(this.recipeSteps.length-1, 1);
      this.parentForm.controls[this.question.name].setValue(this.recipeSteps);
    }
  }

  validField(index: number): boolean {
    const formValue = this.parentForm.controls[this.question.name]?.value;
    const isValid = !formValue || !formValue[index] || formValue[index].step.length <= 9;
    this.validFieldEvent.emit(isValid); // Emitir el valor
    return isValid;
  }
}