import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Question } from '../models/interfaces/questions.interface';

@Component({
  selector: 'app-abstract-question',
  template: '',
})
export class AbstractQuestionComponent {
  
  @Input() question: any;
  @Input() parentForm: FormGroup;
  @Input() formDirective: FormGroupDirective;
  @Input() showError:boolean;
  @Input() ing:string[];
  @Input() ingAc:any[];

  get name(): FormControl {
    return this.parentForm.controls[this.question.name] as FormControl;
  }
}
