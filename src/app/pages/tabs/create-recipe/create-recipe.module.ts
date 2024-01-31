import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CreateRecipePageRoutingModule } from './create-recipe-routing.module';
import { CreateRecipePage } from './create-recipe.page';
import { LogOutComponent } from 'src/app/components/log-out/log-out.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { CreateRecipeService } from 'src/app/services/create-recipe.service';
import { HttpClientModule } from '@angular/common/http';
import { FormQuestionsComponent } from 'src/app/components/form-questions/form-questions';
import { FileUploadComponent } from 'src/app/components/file-upload/file-upload.component';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FormUtils } from 'src/app/utils/form.utils';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateRecipePageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    HttpClientModule
  ],
  declarations: [CreateRecipePage,FileUploadComponent],
  providers: [CreateRecipeService,FileUploadService,FormUtils]
 
})
export class CreateRecipePageModule {}
