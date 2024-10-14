import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storage: Storage, private router: Router) {
    this.init();  // Inicializar el Storage
  }

  async init() {
    await this.storage.create();  // Asegurarse de que el Storage esté creado
  }

  async canActivate(): Promise<boolean> {
    // Verificar si el usuario está autenticado
    const isAuthenticated = await this.storage.get('isAuthenticated');
    console.log('Estado de autenticación:', isAuthenticated);  // Debugging

    if (isAuthenticated) {
      return true;  // Permitir acceso si está autenticado
    } else {
      console.log('No autenticado, redirigiendo al login');  // Debugging
      this.router.navigate(['/login']);  // Redirigir al login si no está autenticado
      return false;
    }
  }
}
