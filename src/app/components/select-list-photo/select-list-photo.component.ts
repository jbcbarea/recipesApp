import { Component, OnInit } from '@angular/core';
import { AbstractQuestionComponent } from '../abstract-question.component';

@Component({
  selector: 'app-select-list-photo',
  templateUrl: './select-list-photo.component.html',
  styleUrls: ['./select-list-photo.component.scss'],
})
export class SelectListPhotoComponent  extends AbstractQuestionComponent implements OnInit {

  selectedChoice!:string;
  constructor() {
    super();
  }

  ngOnInit() {}

  public onRadioSelect(): void {
    this.parentForm.controls[this.question.name].setValue(this.selectedChoice);
  }

  public validField():boolean {
    if(this.selectedChoice) {
      return false;
    }else{
      return true;
    }

  }
}
