import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { SqliteService } from './services/sqlite.service';
import { PedidoSyncService } from './services/pedido-sync.service'; // Importa el servicio de sincronización

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private storage: Storage,
    private sqliteService: SqliteService,
    private pedidoSyncService: PedidoSyncService // Inyecta el servicio de sincronización
  ) {
    this.initStorageAndDB();
  }

  async initStorageAndDB() {
    // Asegurarse de que el Storage está inicializado antes de usarlo
    await this.storage.create();
    console.log('Storage inicializado correctamente');

    // Inicializar la base de datos SQLite
    try {
      await this.sqliteService.initializeDatabase();
      console.log('Base de datos SQLite inicializada correctamente');
      
      // Intentar sincronizar los pedidos después de inicializar la base de datos
      await this.pedidoSyncService.sincronizarPedidos();
    } catch (error) {
      console.error('Error al inicializar la base de datos SQLite:', error);
    }
  }

  ngOnInit() {
    this.checkAuthStatus();

    // Sincronizar los pedidos cada vez que la app se inicia
    this.syncPedidosOnStart();
  }

  // Método para verificar el estado de autenticación
  async checkAuthStatus() {
    try {
      const isAuthenticated = await this.storage.get('isAuthenticated');
      this.isAuthenticated = isAuthenticated || false;
      console.log('Estado de autenticación desde Storage:', this.isAuthenticated);  
    } catch (error) {
      console.error('Error al verificar el estado de autenticación:', error);
    }
  }

  // Método para cerrar sesión
  async logout() {
    try {
      await this.storage.remove('isAuthenticated');
      await this.storage.remove('username');
      this.isAuthenticated = false;
      console.log('Sesión cerrada correctamente');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error);
    }
  }

  // Método para sincronizar pedidos al iniciar la app
  async syncPedidosOnStart() {
    try {
      await this.pedidoSyncService.sincronizarPedidos();
    } catch (error) {
      console.error('Error al sincronizar los pedidos al inicio:', error);
    }
  }
}
