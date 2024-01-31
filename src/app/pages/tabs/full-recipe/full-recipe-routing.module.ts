import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullRecipePage } from './full-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: FullRecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullRecipePageRoutingModule {}
