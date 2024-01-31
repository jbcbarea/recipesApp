import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserUpdatePageRoutingModule } from './user-update-routing.module';

import { UserUpdatePage } from './user-update.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthUsersService } from 'src/app/services/auth-users.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UserUpdatePageRoutingModule,
    ComponentsModule,
    HttpClientModule 
  ],
  declarations: [UserUpdatePage],
  providers:[AuthUsersService]
})
export class UserUpdatePageModule {}
