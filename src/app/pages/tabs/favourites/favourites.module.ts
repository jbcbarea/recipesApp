import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouritesPageRoutingModule } from './favourites-routing.module';

import { FavouritesPage } from './favourites.page';
import { HttpClientModule } from '@angular/common/http';
import { RecipeService } from 'src/app/services/recipes.service';
import { FavouriteRecipesService } from 'src/app/services/favourite-recipes.service';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavouritesPageRoutingModule,
    HttpClientModule,
    ComponentsModule
  ],
  providers: [RecipeService,FavouriteRecipesService],
  declarations: [FavouritesPage]
})
export class FavouritesPageModule {}
