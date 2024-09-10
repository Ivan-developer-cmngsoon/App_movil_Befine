import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportistasPageRoutingModule } from './transportistas-routing.module';

import { TransportistasPage } from './transportistas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransportistasPageRoutingModule
  ],
  declarations: [TransportistasPage]
})
export class TransportistasPageModule {}
