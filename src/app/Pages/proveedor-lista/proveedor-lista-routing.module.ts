import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProveedorListaPage } from './proveedor-lista.page';

const routes: Routes = [
  {
    path: '',
    component: ProveedorListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProveedorListaPageRoutingModule {}
