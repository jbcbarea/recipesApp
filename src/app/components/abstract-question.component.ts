import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-abstract-question',
  template: '',
})
export class AbstractQuestionComponent {
    //tipar a Question!!
  @Input() question: any;
  @Input() parentForm: FormGroup;
  @Input() formDirective: FormGroupDirective;
  @Input() showError:boolean;

  get name(): FormControl {
    return this.parentForm.controls[this.question.name] as FormControl;
  }
}
