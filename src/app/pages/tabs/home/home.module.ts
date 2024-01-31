import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { BannerComponent } from 'src/app/components/banner/banner.component';
import { ListRecipesComponent } from 'src/app/components/list-recipes/list-recipes.component';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RecipeService } from 'src/app/services/recipes.service';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule,
    ComponentsModule 
  ],
  providers:[RecipeService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [HomePage,BannerComponent]
})
export class HomePageModule {}
