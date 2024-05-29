import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserListaPageRoutingModule } from './user-lista-routing.module';

import { UserListaPage } from './user-lista.page';

import { ComponentsModule } from 'src/app/Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserListaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UserListaPage]
})
export class UserListaPageModule {}
