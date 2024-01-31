import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecipesIngridientsPageRoutingModule } from './recipes-ingridients-routing.module';

import { RecipesIngridientsPage } from './recipes-ingridients.page';
import { ListAccordionComponent } from 'src/app/components/list-accordion/list-accordion.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormQuestionsComponent } from 'src/app/components/form-questions/form-questions';
import { SelectListComponent } from 'src/app/components/select-list/select-list.component';
import { FormUtils } from 'src/app/utils/form.utils';
import { ComponentsModule } from 'src/app/components/components.module';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { RecipeService } from 'src/app/services/recipes.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipesIngridientsPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
  ],
  declarations: [RecipesIngridientsPage],
  providers: [HttpClient,FormUtils]
})
export class RecipesIngridientsPageModule {}
