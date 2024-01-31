import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecipesFilteredPageRoutingModule } from './recipes-filtered-routing.module';
import { RecipesFilteredPage } from './recipes-filtered.page';
import { RecipeService } from 'src/app/services/recipes.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipesFilteredPageRoutingModule,
    HttpClientModule,
    ComponentsModule
  ],
  declarations: [RecipesFilteredPage],
  providers: [RecipeService],
})
export class RecipesFilteredPageModule {}
