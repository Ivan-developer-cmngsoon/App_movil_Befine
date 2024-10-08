import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarPedidoPage } from './eliminar-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarPedidoPageRoutingModule {}
