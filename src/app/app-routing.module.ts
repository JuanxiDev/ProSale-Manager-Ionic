import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Pages/home',
    pathMatch: 'full'
  },
  {
    path: 'proveedor-lista',
    loadChildren: () => import('./Pages/proveedor-lista/proveedor-lista.module').then( m => m.ProveedorListaPageModule)
  },
  {
    path: 'producto-lista',
    loadChildren: () => import('./Pages/producto-lista/producto-lista.module').then( m => m.ProductoListaPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'user-lista',
    loadChildren: () => import('./Pages/user-lista/user-lista.module').then( m => m.UserListaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
