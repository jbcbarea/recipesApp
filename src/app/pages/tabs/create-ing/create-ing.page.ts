import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IngridientsService } from 'src/app/services/ingridients.service';
import { FormUtils } from 'src/app/utils/form.utils';

@Component({
  selector: 'app-create-ing',
  templateUrl: './create-ing.page.html',
  styleUrls: ['./create-ing.page.scss'],
})
export class CreateIngPage implements OnInit {
  showError: boolean = false;
  timeError: boolean = false;
  dynamicForm: FormGroup;
  userEmail: string;
  @ViewChild('form') form: NgForm;
  initConfiguration: any;
  formValueChangesSubscription: any;

  constructor(
    private readonly http: HttpClient,
    private readonly formUtils: FormUtils,
    private readonly router: Router,
    private readonly ingredientService: IngridientsService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userEmail = localStorage.getItem('userEmail');
    this.initConfiguration = await this.getDataFromFileConfiguration();
    this.dynamicForm = await this.formUtils.buildForm(this.initConfiguration);
  }


  //TODO: Aquí me falta hacer lo de los TOast al crear el ingrediente vale?? Acuerdate amigo!

  public async createNewIngredient(): Promise<void> {
    if (this.dynamicForm.valid) {
      const params: any = {
        tipo: this.dynamicForm.controls['ing-group'].value,
        nombre: this.dynamicForm.controls['ingredient-name'].value,
        calorias: this.dynamicForm.controls['ing-feature'].value[0].calories,
        grasas: this.dynamicForm.controls['ing-feature'].value[0].fat,
        proteinas: this.dynamicForm.controls['ing-feature'].value[0].protein,
      };
      this.addNewIngredient(params);
    } else {
      this.showError = true;
      this.setErrorTime();
    }
  }

  private addNewIngredient(params: any): void {
    this.ingredientService.addNewIngredient(params).subscribe((data: any) => {
      console.log(data);
    });
  }

  //TODO: LLevar a los otros formularios para que se quite con el tiempo
  private setErrorTime(): void {
    setTimeout(() => {
      this.timeError = false;
    }, 3000);
    this.timeError = true;
  }

  public showErrorMsg(): boolean {
    return this.showError;
  }

  //TODO: si da tiempo llevarlo a un servicio ya que se usa varias veces!
  private async getDataFromFileConfiguration(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`assets/configurations/create-ing.json`).subscribe(
        (c: any) => {
          resolve(c);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public cleanForm(): void {
    this.dynamicForm.reset();
    this.showError = false;
    this.timeError = false;
  }
}
