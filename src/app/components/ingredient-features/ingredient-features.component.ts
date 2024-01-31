import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AbstractQuestionComponent } from '../abstract-question.component';

interface IngredientFeature {
  calories: number;
  fat: number;
  protein: number;
}
@Component({
  selector: 'app-ingredient-features',
  templateUrl: './ingredient-features.component.html',
  styleUrls: ['./ingredient-features.component.scss'],
})
export class IngredientFeaturesComponent
  extends AbstractQuestionComponent
  implements OnInit
{
  ingredientFeature: IngredientFeature[] = [
    { calories: null, fat: null, protein: null },
  ];
  constructor(private renderer: Renderer2, private el: ElementRef) {
    super();
  }

  ngOnInit() {
    if (this.ingredientFeature) {
      this.parentForm.controls[this.question.name].setValue(
        this.ingredientFeature
      );
    }
    this.parentForm.valueChanges.subscribe(() => {
      if (this.parentForm.controls[this.question.name].value === null) {
        this.ingredientFeature = [{ calories: null, fat: null, protein: null }];
      }
    });
  }

  public onFocus(event: any): void {
    event.preventDefault();
    // Manually scroll to the input element if needed
    const scrollContainer = this.el.nativeElement;
    if (scrollContainer) {
      scrollContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  public validField(index: number): boolean {
    const formValue = this.parentForm.controls[this.question.name]?.value;
    return (
      !formValue ||
      !formValue[index] ||
      !formValue[index].calories ||
      !formValue[index].fat ||

      !formValue[index].protein ||

        (formValue[index].calories === 0 || formValue[index].calories < 0
      ) ||
      (formValue[index].fat === 0 ||
      formValue[index].fat < 0) ||
      (formValue[index].protein === 0 ||
      formValue[index].protein < 0)
    );
  }
}
