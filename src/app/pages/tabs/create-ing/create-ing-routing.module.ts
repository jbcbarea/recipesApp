import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateIngPage } from './create-ing.page';

const routes: Routes = [
  {
    path: '',
    component: CreateIngPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateIngPageRoutingModule {}
