import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CreateRecipeService } from 'src/app/services/create-recipe.service';
import { IngridientsService } from 'src/app/services/ingridients.service';
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
  timeError: boolean = false;
  serverError: string = '';
  recipeStep: string[];
  resetInputFileOnSubmitted: boolean = false;
  dynamicForm: FormGroup;
  initConfiguration: any;
  userEmail: string;
  selectedUploadFile: string = '';
  formValueChangesSubscription: any;
  isFieldValid: boolean;
  ingredientsData:string[]  = [];

  constructor(
    private readonly http: HttpClient,
    private readonly formUtils: FormUtils,
    private readonly router: Router,
    private createRecipeService: CreateRecipeService,
    private toastController: ToastController,
    private ingredientsService: IngridientsService
  ) {}

  async ngOnInit(): Promise<void> {
    //TODO: Para controlar que no hay datos en el servidor....
    this.userEmail = localStorage.getItem('userEmail');
    this.initConfiguration = await this.getDataFromFileConfiguration();
    this.dynamicForm = await this.formUtils.buildForm(this.initConfiguration);
    //Creo que esto no sirve parta nada echar un ojo por si acaso
    // this.formValueChangesSubscription = this.dynamicForm.valueChanges.subscribe((async) => {
    //this.checkListAccordionIngridients();
    // });
  }

  async ionViewWillEnter(): Promise<void> {
    this.serverError = '';
    this.ingredientsService.getIngridientsByName().subscribe(
      (data: any) => {
        this.ingredientsData = data.sort((a, b) => a.localeCompare(b));
      },
      (error) => {
        if (error) {
       
          this.showError = true;
          this.serverError = error;
        } else {
    
        }
        //this.errorMessage = error;
        // Aquí puedes mostrar el mensaje de error al usuario, por ejemplo, en una alerta o en el HTML
      
      }
    );
  }
  
  ngOnDestroy(): void {
    // Unsubscribe from form value changes to prevent memory leaks
    if (this.formValueChangesSubscription) {
      this.formValueChangesSubscription.unsubscribe();
    }
  }
  //TODO: Poner un Toast para indicar que se ha creado y resetear el formulario
  public async createRecipes(): Promise<void> {
    
    this.recipeStep = [];
  
    this.dynamicForm.controls['recipe-steps'].value.forEach((element) => {
      this.recipeStep.push(element.step);
    });

    
    this.orderTimeConsumeData();

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
      
      this.showError = true;
      this.setErrorTime();
    }
  }

  private setErrorTime(): void {
    setTimeout(() => {
      this.timeError = false;
    }, 3000);
    this.timeError = true;
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
    this.resetInputFileOnSubmitted = true;
  }

  public validFieldEventHandler(isValid: boolean): void {
    this.isFieldValid = isValid;
  }


  private orderTimeConsumeData(): void {
    const timeConsumeArray = this.dynamicForm.controls['time-consume'].value;
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
  }

  //TODO: Para recibir que la imágenes se va a guardar en el server si la imágenen se recibe bien subo a la base de datos todo lo demás!
  public onFileUploaded(fileName: string) {
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
