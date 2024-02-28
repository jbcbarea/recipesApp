import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractQuestionComponent } from '../abstract-question.component';

interface cuisineType_Time {
  value:string,
  order?:number
}
@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss'],
})
export class CheckListComponent
  extends AbstractQuestionComponent
  implements OnInit
{
  choicesImages: boolean;
  cusineType: cuisineType_Time[] = [{value:'no-aply'}];
  constructor() {
    super();
  }

  async ngOnInit(): Promise<void> {
    this.choicesImages = this.hasImages(this.question.choices ?? []);
    this.parentForm.controls[this.question.name].setValue(this.cusineType);
    this.parentForm.valueChanges.subscribe(() => {
      // Aquí checkBox!!
      if (this.parentForm.controls[this.question.name].value === null) {
        this.cusineType = [{value:'no-aply'}];
        this.question.choices?.forEach(choice => {
          choice.checked = false;
        });
      }
    });
  }

  public hasImages(choices: any[]): boolean {
    return choices.some(
      (choice) => choice.img !== undefined && choice.img !== null
    );
  }

  public validField(): boolean {

    if(this.cusineType.length >= 2) {
      return false;
    } else {
      return true;
    }
  }

  public onCheckboxChange(item: string, order: number, event: any) {
    const cuisineTimeItem = { value: item, order: order };
    
    if (event.detail.checked) {
      this.cusineType.push(cuisineTimeItem);
    } else {
      const index = this.cusineType.findIndex(c => c.value === item && c.order === order);
      if (index !== -1) {
        this.cusineType.splice(index, 1);
      }
    }
    this.parentForm.controls[this.question.name].setValue(this.cusineType);
  }
 
}
