import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { HomePage } from '../home/home.page';
import { PedidosPage } from '../pedidos/pedidos.page';
import { BodegaPage } from '../bodega/bodega.page';

const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'pedidos', component: PedidosPage },
  { path: 'bodega', component: BodegaPage },

  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
