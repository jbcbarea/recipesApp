import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractQuestionComponent } from '../abstract-question.component';

@Component({
  selector: 'app-input-recipe-name',
  templateUrl: './input-recipe-name.component.html',
  styleUrls: ['./input-recipe-name.component.scss'],
})
export class InputRecipeNameComponent extends AbstractQuestionComponent implements OnInit {

  dynamicForm: FormGroup;
  constructor() {
    super();
  }

  ngOnInit() {}

  validField(): boolean {
    return (this.name?.invalid && (this.name?.dirty || this.name.touched)) || (this.parentForm.controls[this.question.name]?.invalid);
  }

}
