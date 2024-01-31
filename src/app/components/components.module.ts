import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractFormGroupDirective,
  FormControl,
  FormControlDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ListAccordionComponent } from './list-accordion/list-accordion.component';
import { HttpClient } from '@angular/common/http';
import { SelectListComponent } from './select-list/select-list.component';
import { AbstractQuestionComponent } from './abstract-question.component';
import { ListRecipesComponent } from './list-recipes/list-recipes.component';
import { IonicModule } from '@ionic/angular';
import { LogOutComponent } from './log-out/log-out.component';
import { CreateIngredientsComponent } from './create-ingredients/create-ingredients.component';
import { CheckListComponent } from './check-list/check-list.component';
import { MessageComponent } from './message/message.component';
import { IngridientsService } from '../services/ingridients.service';
import { SelectListPhotoComponent } from './select-list-photo/select-list-photo.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { InputRecipeNameComponent } from './input-recipe-name/input-recipe-name.component';
import { CreateRecipeStepsComponent } from './create-recipe-steps/create-recipe-steps.component';
import { FormQuestionsComponent } from './form-questions/form-questions';
import { IngredientFeaturesComponent } from './ingredient-features/ingredient-features.component';

//TODO: Mirar aquí poner todos los módulos de los componentes para poder reutilizarlos en otras paginas o donde sea!! Venga anda
//TODO: Los exporto los que quiera y después en imports de otros componentes o paginas llamo a este módulo ok??
@NgModule({
  declarations: [
    AbstractQuestionComponent,
    ListAccordionComponent,
    SelectListComponent,
    LogOutComponent,
    CreateIngredientsComponent,
    CheckListComponent,
    MessageComponent,
    ListRecipesComponent,
    SelectListPhotoComponent,
    SearchBarComponent,
    InputRecipeNameComponent,
    CreateRecipeStepsComponent,
    FormQuestionsComponent,
    IngredientFeaturesComponent
  ],
  exports: [
    ListAccordionComponent,
    SelectListComponent,
    LogOutComponent,
    CreateIngredientsComponent,
    CheckListComponent,
    MessageComponent,
    ListRecipesComponent,
    SelectListPhotoComponent,
    SearchBarComponent,
    InputRecipeNameComponent,
    CreateRecipeStepsComponent,
    FormQuestionsComponent,
    IngredientFeaturesComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IonicModule],
  providers: [HttpClient, IngridientsService],
})
export class ComponentsModule {}
