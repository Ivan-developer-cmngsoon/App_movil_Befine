import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarPedidoPageRoutingModule } from './eliminar-pedido-routing.module';

import { EliminarPedidoPage } from './eliminar-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarPedidoPageRoutingModule
  ],
  declarations: [EliminarPedidoPage]
})
export class EliminarPedidoPageModule {}
