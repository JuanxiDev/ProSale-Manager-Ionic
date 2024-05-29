import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoListaPageRoutingModule } from './producto-lista-routing.module';

import { ProductoListaPage } from './producto-lista.page';

import { ComponentsModule } from 'src/app/Components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoListaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ProductoListaPage]
})
export class ProductoListaPageModule {}
