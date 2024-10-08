import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostrarPedidosPage } from './mostrar-pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarPedidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MostrarPedidosPageRoutingModule {}
