import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { AbstractQuestionComponent } from '../abstract-question.component';
import { QuestionTypes } from 'src/app/models/Question-types.enums';

@Component({
  selector: 'app-form-questions',
  templateUrl: './form-questions.html',
  styleUrls: ['./form-questions.scss'],
})
export class FormQuestionsComponent extends AbstractQuestionComponent implements OnInit {

  @Output() validField: EventEmitter<boolean> = new EventEmitter<boolean>();

  value: string;
  questionTypes = QuestionTypes;
  isFieldValid: boolean;
  
  constructor() {super()}

  ngOnInit(): void {


    /*
    if (this.question.dependencies) {
      if (this.question.dependencies.some((dependency: Dependency) => dependency.dependencyTypeId === DependencyType.DISABLED)) {
        if (!this.question.enable) {
          this.name.clearValidators();
        }
        const name = this.question.dependencies[0].questionName;
        this.parentForm.get(name)?.valueChanges.subscribe((val: string) => {
          if (this.value !== val && !this.isDisabled) {
            this.value = val;
            this.question.enable = !this.dependenciesService.dependencyAccomplished(this.question, this.parentForm, true);
            if (!this.question.enable) {
              this.name.reset();
              this.name.clearValidators();
            } else {
              this.name.setValidators(this.formUtils.getFormControlForItem(this.question));
            }
            if (this.question.questionTypeId === QuestionTypes.SELECT_LIST || this.question.questionTypeId === QuestionTypes.CHECK_LIST || this.question.questionTypeId === QuestionTypes.CHECK_LIST_MULTI) {
              this.name.setValue('');
            } else {
              this.name.setValue(null);
            }
          }
        });
        */
}

public validFieldEventHandler(isValid: boolean): void {
  this.isFieldValid = isValid;
  this.validField.emit(this.isFieldValid);
}
    }
