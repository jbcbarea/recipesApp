import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Injectable } from '@angular/core';
import { QuestionTypes } from '../models/Question-types.enums';

@Injectable()
export class FormUtils {
  constructor() {}
  //Tipar esto despues
  public async buildForm(configuration: any): Promise<FormGroup> {
    const result = new FormGroup({});
    for (const group of configuration.groups) {
      if (group.questions) {
        group.questions.sort((a: any, b: any) => a.order - b.order);
        for (const question of group.questions) {
          this.buildQuestions(result, question);
        }
      }
    }
    return result;
  }

  //Tipar question con Question
  buildQuestions(parentForm: FormGroup, question: any): void {
    if (question.choices) {
      //tipar con choice
      question.choices.sort((a: any, b: any) => a.order - b.order);
    }
    parentForm.addControl(
      question.name,
      new FormControl(
        this.initValueFromType(question),
        this.getFormControlForItem(question)
      )
    );
  }

  //tipar item con Question
  private initValueFromType(item: any): string | null {
    if (item.defaultValue) {
      return item.defaultValue;
    }
    switch (item.questionTypeId) {
      case QuestionTypes.CHECK_LIST_MULTI_SELECTION:
        return 'no-aply';
      case QuestionTypes.COMBO_SELECTION:
      case QuestionTypes.MESSAGE:
        return '';
      default:
        return null;
    }
  }
 //TODO: esto creo que me sobrsa ya que las validaciones estánen cada componente por separado!!
  public getFormControlForItem(item: any): ValidatorFn[] {
    const lstValidators: ValidatorFn[] = [];
    if (item.required) {
      lstValidators.push(Validators.required);
    }
    if (item.questionTypeId === QuestionTypes.INPUT_TEXT_NUMBER) {
        lstValidators.push(Validators.minLength(1));
    }
    return lstValidators;
  }
}
