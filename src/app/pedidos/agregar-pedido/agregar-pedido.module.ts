import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarPedidoPageRoutingModule } from './agregar-pedido-routing.module';

import { AgregarPedidoPage } from './agregar-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AgregarPedidoPageRoutingModule
  ],
  declarations: [AgregarPedidoPage]
})
export class AgregarPedidoPageModule {}
