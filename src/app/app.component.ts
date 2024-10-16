import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';  // Importar Ionic Storage
import { SqliteService } from './services/sqlite.service';  // Importar el servicio de SQLite

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
    private sqliteService: SqliteService  // Inyectar el servicio de SQLite
  ) {
    this.initStorageAndDB();  // Inicializar el Storage y SQLite en el constructor
  }

  async initStorageAndDB() {
    // Asegurarse de que el Storage está inicializado antes de usarlo
    await this.storage.create();
    console.log('Storage inicializado correctamente');

    // Inicializar la base de datos SQLite
    try {
      await this.sqliteService.initializeDatabase();
      console.log('Base de datos SQLite inicializada correctamente');
    } catch (error) {
      console.error('Error al inicializar la base de datos SQLite:', error);
    }
  }

  ngOnInit() {
    this.checkAuthStatus();  // Verificar el estado de autenticación en ngOnInit
  }

  async checkAuthStatus() {
    try {
      // Verificar si el usuario está autenticado desde el Storage
      const isAuthenticated = await this.storage.get('isAuthenticated');
      this.isAuthenticated = isAuthenticated || false;
      console.log('Estado de autenticación desde Storage:', this.isAuthenticated);  
    } catch (error) {
      console.error('Error al verificar el estado de autenticación:', error);
    }
  }

  async logout() {
    try {
      // Remover el estado de autenticación del Storage
      await this.storage.remove('isAuthenticated');
      await this.storage.remove('username');
      this.isAuthenticated = false;  // Cambiar el estado a no autenticado
      console.log('Sesión cerrada correctamente');
      this.router.navigate(['/login']);  // Redirigir al login
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error);
    }
  }
}
