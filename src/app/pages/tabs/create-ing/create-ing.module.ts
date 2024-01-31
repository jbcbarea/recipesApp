import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateIngPageRoutingModule } from './create-ing-routing.module';

import { CreateIngPage } from './create-ing.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormUtils } from 'src/app/utils/form.utils';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateIngPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  //TODO: Importante que importe los módulos de formularios Reactivos por que si no no trufa!!
  //TODO: meter los providers el FormsUtilsy el HttpClient
  declarations: [CreateIngPage],
  providers: [HttpClient,FormUtils]
})
export class CreateIngPageModule {}
