import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransportistasPage } from './transportistas.page';

const routes: Routes = [
  {
    path: '',
    component: TransportistasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportistasPageRoutingModule {}
