import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListaPage } from './user-lista.page';

const routes: Routes = [
  {
    path: '',
    component: UserListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserListaPageRoutingModule {}
