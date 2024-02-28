import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { questionGroup } from 'src/app/models/interfaces/question-group.interface';
import { FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormUtils } from 'src/app/utils/form.utils';
import { IngridientsService } from 'src/app/services/ingridients.service';
import { SharedDataService } from 'src/app/services/shared-data-service.service';

@Component({
  selector: 'app-recipes-ingridients',
  templateUrl: './recipes-ingridients.page.html',
  styleUrls: ['./recipes-ingridients.page.scss'],
})
export class RecipesIngridientsPage implements OnInit {
  // @Input() question: any;
  // @Input() parentForm: FormGroup;
  // @Input() formDirective: FormGroupDirective;

  ingridientTypes: string[] = [
    'carnes',
    'vegetales',
    'frutas',
    'lacteos',
    'frutosSecos',
    'pescados',
  ];
  elementsSelected: boolean = false;
  timeError: boolean = false;
  ingridientsParams: string[] = [];
  ingridientParamGood: string[] = [];
  timeConsumeParams: string;
  ingridientsFromServer: any[];
  userEmail: string;
  showError: boolean = false;
  dynamicForm: FormGroup;
  @ViewChild('form') form: NgForm;
  initConfiguration: questionGroup;
  selectedUploadFile: any;
  formValueChangesSubscription: any;

  constructor(
    private readonly http: HttpClient,
    private readonly formUtils: FormUtils,
    private readonly router: Router,
    private readonly ingridientsService: IngridientsService,
    private sharedDataService: SharedDataService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userEmail = localStorage.getItem('userEmail');
    this.initConfiguration = await this.getDataFromFileConfiguration();
    console.log('initConfigurayion', this.initConfiguration);
    this.dynamicForm = await this.formUtils.buildForm(this.initConfiguration);

    this.formValueChangesSubscription = this.dynamicForm.valueChanges.subscribe(
      (async) => {
        this.checkListAccordionIngridients();
      }
    );
  }

  async ionViewWillEnter(): Promise<void> {
    if (this.sharedDataService.mensaje === 'IngCreado') {
      await this.ngOnInit();
      this.sharedDataService.mensaje = '';
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from form value changes to prevent memory leaks
    if (this.formValueChangesSubscription) {
      this.formValueChangesSubscription.unsubscribe();
    }
  }

  public async filterRecipes(): Promise<void> {
    this.checkListAccordionIngridientsParams();
    console.log(this.dynamicForm);
    this.orderTimeConsumeData();
    console.log('EOOOO', this.elementsSelected);
    console.log('a ver que hace esto!!!', this.ingridientParamGood);
    if (
      this.dynamicForm.valid &&
      this.ingridientParamGood.length >= 1 &&
      this.dynamicForm.controls['restricciones-alimentarias'].value !==
        undefined &&
      this.ingridientParamGood
    ) {
      this.showError = false;
   
      const params: any = {
        tipoReceta: this.timeConsumeParams,
        tiempoPreparacion: this.dynamicForm.controls['prep-time'].value,
        dificultad: this.dynamicForm.controls['difficulty'].value,
        tipoRecetaMundo: this.dynamicForm.controls['world-recipes'].value,
        ingredientes: this.ingridientParamGood,
        puntuacion: this.dynamicForm.controls['score'].value,
        restric_alimentaria:
          this.dynamicForm.controls['restricciones-alimentarias'].value,
        comensales: this.dynamicForm.controls['guest-number'].value,
      };
      this.router.navigate(['/tabs/recipes-filtered'], { queryParams: params });
    } else {
      this.showError = true;
      this.setErrorTime();
      //setTimeout(() =>{
      //  this.showError = false;
      //},3000);
    }
  }

  public showErrorMsg(): boolean {
    return this.showError;
  }

  private setErrorTime(): void {
    setTimeout(() => {
      this.timeError = false;
    }, 3000);
    this.timeError = true;
  }
  private async getDataFromFileConfiguration(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`assets/configurations/recipes-ingridients.json`).subscribe(
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

  private checkListAccordionIngridients(): void {
    for (const ingridients of this.ingridientTypes) {
      if (Array.isArray(this.dynamicForm.controls[ingridients].value)) {
        this.ingridientsParams = this.ingridientsParams.concat(
          this.dynamicForm.controls[ingridients].value
        );
      }
    }
  }
  private checkListAccordionIngridientsParams(): void {
    const uniqueIngridients = new Set<string>();
    for (const ingridients of this.ingridientTypes) {
      if (Array.isArray(this.dynamicForm.controls[ingridients].value)) {
        this.dynamicForm.controls[ingridients].value.forEach(
          (ingredient: string) => {
            uniqueIngridients.add(ingredient);
          }
        );
      }
    }
    this.ingridientParamGood = Array.from(uniqueIngridients);
  }

  //TODO: Funcionar que esto funciona correctamente si no cambiar por el otro vale???
  //TODO: Lo dejo aqui pero lo de android cámara y que te guarded el nombre del user en el localStorage de Android donde sea
  public orderTimeConsumeData(): void {
    const timeConsumeArray = this.dynamicForm.controls['time-consume'].value;
    console.log(timeConsumeArray);
    if (timeConsumeArray && timeConsumeArray.length > 1) {
      this.elementsSelected = true;
      // Ordenar el array de objetos en función del campo 'order'
      timeConsumeArray.sort((a, b) => a.order - b.order);
      console.log(timeConsumeArray);
      this.timeConsumeParams = '';
      //TODO: Siempre que valga algo a ver amigui
      for (const element of timeConsumeArray) {
        if (element.value && element.value !== 'no-aply') {
          this.timeConsumeParams += element.value + ',';
        }
      }
      if (
        this.timeConsumeParams === '' ||
        this.timeConsumeParams === undefined
      ) {
        this.timeConsumeParams = 'no-aply';
      } else {
        this.timeConsumeParams = this.timeConsumeParams.slice(0, -1);
      }
    } else {
      this.timeConsumeParams = 'no-aply';
      this.elementsSelected = false;
    }

    //this.timeConsumeParams ='no-aply';
    /*
    const orderedArray = timeConsumeArray.filter(element => element.order).map(element => {
        console.log('Entro y aquí ya ordeno y meto en array de params');
        return element;
    });
  */
  }

  //TODO: Para recibir que la imágenes se va a guardar en el server si la imágenen se recibe bien subo a la base de datos todo lo demás!
  public onFileUploaded(fileName: string) {
    this.selectedUploadFile = fileName;
  }
}
