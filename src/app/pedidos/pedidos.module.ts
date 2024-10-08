import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Combinar FormsModule y ReactiveFormsModule
import { IonicModule } from '@ionic/angular';
import { PedidosPageRoutingModule } from './pedidos-routing.module';
import { PedidosPage } from './pedidos.page';
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule

@NgModule({
  declarations: [PedidosPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosPageRoutingModule,
    ReactiveFormsModule,  // Mantén ReactiveFormsModule
    HttpClientModule  // Añade HttpClientModule aquí
  ]
})
export class PedidosPageModule {}
