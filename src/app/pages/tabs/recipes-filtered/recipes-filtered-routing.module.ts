import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesFilteredPage } from './recipes-filtered.page';

const routes: Routes = [
  {
    path: '',
    component: RecipesFilteredPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesFilteredPageRoutingModule {}
