import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosPage } from './pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosPage
  },
  {
    path: 'agregar-pedido',
    loadChildren: () => import('./agregar-pedido/agregar-pedido.module').then(m => m.AgregarPedidoPageModule)
  },
  {
    path: 'agregar-pedido',
    loadChildren: () => import('./agregar-pedido/agregar-pedido.module').then( m => m.AgregarPedidoPageModule)
  },
  {
    path: 'modificar-pedido',
    loadChildren: () => import('./modificar-pedido/modificar-pedido.module').then( m => m.ModificarPedidoPageModule)
  },
  {
    path: 'mostrar-pedidos',
    loadChildren: () => import('./mostrar-pedidos/mostrar-pedidos.module').then( m => m.MostrarPedidosPageModule)
  },
  {
    path: 'eliminar-pedido',
    loadChildren: () => import('./eliminar-pedido/eliminar-pedido.module').then( m => m.EliminarPedidoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosPageRoutingModule {}
