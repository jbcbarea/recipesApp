import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FullRecipePageRoutingModule } from './full-recipe-routing.module';
import { FullRecipePage } from './full-recipe.page';
import { RecipeService } from 'src/app/services/recipes.service';
import { HttpClientModule } from '@angular/common/http';
import { FavouriteRecipesService } from 'src/app/services/favourite-recipes.service';
import { ScoringRecipesService } from 'src/app/services/scoring-recipes.service';
import { GeneratePdfService } from 'src/app/services/generate-pdf.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullRecipePageRoutingModule,
    HttpClientModule, 
  ],
  providers: [RecipeService,FavouriteRecipesService,ScoringRecipesService,GeneratePdfService],
  declarations: [FullRecipePage],
})
export class FullRecipePageModule {}
