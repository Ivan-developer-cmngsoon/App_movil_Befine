import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';  // Importar Ionic Storage

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {  // Implementar OnInit
  isAuthenticated: boolean = false;

  constructor(private router: Router, private storage: Storage) {
    this.initStorage();  // Inicializar el Storage en el constructor
  }

  async initStorage() {
    // Asegurarse de que el Storage está inicializado antes de usarlo
    await this.storage.create();
  }

  ngOnInit() {
    this.checkAuthStatus();  // Verificar el estado de autenticación en ngOnInit
  }

  async checkAuthStatus() {
    const isAuthenticated = await this.storage.get('isAuthenticated');
    this.isAuthenticated = isAuthenticated || false;  // Guardar el estado de autenticación
    console.log('Estado de autenticación desde Storage:', this.isAuthenticated);  // Verificar el valor de autenticación
  }

  async logout() {
    await this.storage.remove('isAuthenticated');
    await this.storage.remove('username');
    this.isAuthenticated = false;  // Cambiar el estado a no autenticado
    this.router.navigate(['/login']);  // Redirigir al login
  }
}
