import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CreateRecipeService } from 'src/app/services/create-recipe.service';
import { FormUtils } from 'src/app/utils/form.utils';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.page.html',
  styleUrls: ['./create-recipe.page.scss'],
})
export class CreateRecipePage implements OnInit {
  // @Input() question: any;
  // @Input() parentForm: FormGroup;
  // @Input() formDirective: FormGroupDirective;

  @ViewChild('form') form: NgForm;
  timeConsumeParams: string;
  showError: boolean = false;
  recipeStep: string[];
  resetInputFileOnSubmitted: boolean = false;
  dynamicForm: FormGroup;
  initConfiguration: any;
  userEmail: string;
  selectedUploadFile: string = '';
  formValueChangesSubscription: any;
  isFieldValid: boolean;

  constructor(
    private readonly http: HttpClient,
    private readonly formUtils: FormUtils,
    private readonly router: Router,
    private createRecipeService: CreateRecipeService,
    private toastController: ToastController
  ) {}

  async ngOnInit(): Promise<void> {
    this.userEmail = localStorage.getItem('userEmail');
    this.initConfiguration = await this.getDataFromFileConfiguration();
    this.dynamicForm = await this.formUtils.buildForm(this.initConfiguration);
    //Creo que esto no sirve parta nada echar un ojo por si acaso
    // this.formValueChangesSubscription = this.dynamicForm.valueChanges.subscribe((async) => {
    //this.checkListAccordionIngridients();
    // });
  }

  ngOnDestroy(): void {
    // Unsubscribe from form value changes to prevent memory leaks
    if (this.formValueChangesSubscription) {
      this.formValueChangesSubscription.unsubscribe();
    }
  }
  //TODO: Poner un Toast para indicar que se ha creado y resetear el formulario
  public async createRecipes(): Promise<void> {
    console.log(this.dynamicForm);
    this.recipeStep = [];
    console.log(this.dynamicForm.controls['recipe-steps'].value.step);
    this.dynamicForm.controls['recipe-steps'].value.forEach((element) => {
      this.recipeStep.push(element.step);
    });

    console.log('recipeStep', this.recipeStep);
    this.orderTimeConsumeData();
    console.log(this.timeConsumeParams);
    console.log(
      'Ingredientes',
      this.dynamicForm.controls['recipe-ingredients'].value.length
    );
    console.log('STEPS:', this.recipeStep.length);
    console.log(
      'FORM:',
      this.dynamicForm.valid,
      'FILE:',
      this.selectedUploadFile,
      'STEPS,INGREDE:',
      this.ingredientsStepsValid()
    );
    if (
      this.dynamicForm.valid &&
      this.selectedUploadFile &&
      this.ingredientsStepsValid() &&
      this.dynamicForm.controls['time-consume'].value.length > 1 &&
      !this.isFieldValid
    ) {
      const params: any = {
        tipo_receta: this.timeConsumeParams,
        tipo_receta_mundo: this.dynamicForm.controls['world-recipes'].value,
        tiempo_preparacion: this.dynamicForm.controls['prep-time'].value,
        fecha_creacion: new Date().toISOString().split('T')[0],
        dificultad: this.dynamicForm.controls['difficulty'].value,
        comensales: this.dynamicForm.controls['guest-number'].value,
        creado_por: localStorage.getItem('userEmail'),
        nombreReceta: this.dynamicForm.controls['recipe-name'].value,
        imagenReceta: this.selectedUploadFile,
        pasos_receta: this.recipeStep,
        ingredientes: this.dynamicForm.controls['recipe-ingredients'].value,
      };

      this.createRecipeService.createRecipe(params).subscribe(
        (data: any) => {
          console.log(
            'Datos de la respuesta del server al crear la receta!!!!',
            data
          );
          this.presentSuccessToast();
          this.dynamicForm.reset();
          this.resetInputFileOnSubmitted = true;
          this.showError = false;
        },
        (error: any) => {
          console.error(error);
          this.presentErrorToast();
        }
      );
    } else {
      //TODO: HA¡acer con setTime out que se ve unos segundos y despues que desaparezca como los otros
      console.log('por aqui a ver que pasa');
      this.showError = true;
    }
  }

  private ingredientsStepsValid(): boolean {
    if (
      this.dynamicForm.controls['recipe-ingredients'].value.length >= 1 &&
      this.recipeStep.length >= 1
    ) {
      return true;
    } else {
      return false;
    }
  }
  public showErrorMsg(): boolean {
    return this.showError;
  }

  private async getDataFromFileConfiguration(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`assets/configurations/recipes-create.json`).subscribe(
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
  }

  public validFieldEventHandler(isValid: boolean): void {
    this.isFieldValid = isValid;
    console.log('VALIDACION DEL CAMPO!!', this.isFieldValid);
  }

  private orderTimeConsumeData(): void {
    const timeConsumeArray = this.dynamicForm.controls['time-consume'].value;
    console.log(timeConsumeArray);
    if (timeConsumeArray) {
      if (timeConsumeArray.some((element) => element.order)) {
        timeConsumeArray.sort((a, b) => (a.order || 0) - (b.order || 0));
        this.timeConsumeParams = '';
        for (const element of timeConsumeArray) {
          if (element.value && element.value !== 'no-aply') {
            this.timeConsumeParams += element.value + ',';
          }
        }
        this.timeConsumeParams = this.timeConsumeParams.slice(0, -1);
      } else {
        this.timeConsumeParams = 'no-aply';
      }
    }
    console.log(this.timeConsumeParams);
  }

  //TODO: Para recibir que la imágenes se va a guardar en el server si la imágenen se recibe bien subo a la base de datos todo lo demás!
  public onFileUploaded(fileName: string) {
    console.log('FileName', fileName);
    this.selectedUploadFile = `images/img/${fileName}`;
  }

  private async presentSuccessToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Receta creada exitosamente',
      duration: 2000, // Duración del toast en milisegundos
      position: 'bottom', // Posición del toast en la pantalla ('top', 'middle' o 'bottom')
    });
    toast.present();
  }

  private async presentErrorToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Error al crear la receta',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
