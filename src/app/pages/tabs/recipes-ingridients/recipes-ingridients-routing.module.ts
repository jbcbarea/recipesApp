import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesIngridientsPage } from './recipes-ingridients.page';

const routes: Routes = [
  {
    path: '',
    component: RecipesIngridientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesIngridientsPageRoutingModule {}
