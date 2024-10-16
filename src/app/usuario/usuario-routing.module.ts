import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioPage } from './usuario.page';

const routes: Routes = [
  {
    path: '',
    component: UsuarioPage
  },  {
    path: 'agregar-usuario',
    loadChildren: () => import('./agregar-usuario/agregar-usuario.module').then( m => m.AgregarUsuarioPageModule)
  },
  {
    path: 'modificar-usuario',
    loadChildren: () => import('./modificar-usuario/modificar-usuario.module').then( m => m.ModificarUsuarioPageModule)
  },
  {
    path: 'eliminar-usuario',
    loadChildren: () => import('./eliminar-usuario/eliminar-usuario.module').then( m => m.EliminarUsuarioPageModule)
  },
  {
    path: 'listar-usuarios',
    loadChildren: () => import('./listar-usuarios/listar-usuarios.module').then( m => m.ListarUsuariosPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioPageRoutingModule {}
