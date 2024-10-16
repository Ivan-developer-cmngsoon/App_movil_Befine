import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule
import { IonicStorageModule } from '@ionic/storage-angular';  // Importa IonicStorageModule
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Importa SQLite
import { Network } from '@awesome-cordova-plugins/network/ngx'; // Importa Network para la detección de la red

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,  // Añade HttpClientModule aquí
    IonicStorageModule.forRoot()  // Inicializa el Storage aquí
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite,  // Añadir SQLite a los providers
    Network  // Añadir Network para la detección de red
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
