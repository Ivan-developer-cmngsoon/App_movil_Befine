import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MostrarPedidosPageRoutingModule } from './mostrar-pedidos-routing.module';

import { MostrarPedidosPage } from './mostrar-pedidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MostrarPedidosPageRoutingModule
  ],
  declarations: [MostrarPedidosPage]
})
export class MostrarPedidosPageModule {}
