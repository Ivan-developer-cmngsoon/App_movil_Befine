import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';  // Importar HttpClient para manejar las peticiones HTTP
import { Storage } from '@ionic/storage-angular';  // Importar Storage para manejar la sesión

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';  // Almacena el nombre de usuario ingresado
  password: string = '';  // Almacena la contraseña ingresada
  email: string = '';  // Almacena el correo electrónico para la recuperación de contraseña
  errorMessage: string = '';  // Mensaje de error en caso de problemas con el login
  errorCorreo: string = '';  // Mensaje de error si el correo para la recuperación es inválido

  // Variables para manejar la visibilidad de la contraseña
  passwordType: string = 'password';  // Tipo del input de contraseña (password o text)
  passwordIcon: string = 'eye-off';   // Ícono para mostrar u ocultar la contraseña

  constructor(
    private router: Router,
    private http: HttpClient,  // Inyectar HttpClient
    private storage: Storage  // Inyectar Storage para manejar la sesión
  ) {}

  async ngOnInit() {
    // Inicializar el Storage para poder guardar los datos
    await this.storage.create();
  }

  // Función que se ejecuta cuando el usuario hace clic en el botón de login
  login() {
    if (this.email && this.username && this.password) {
      // Realizar la solicitud HTTP a json-server para validar el correo, nombre de usuario y la contraseña
      this.http.get<any[]>(`http://localhost:3000/usuarios?email=${this.email}&username=${this.username}&password=${this.password}`)
        .subscribe({
          next: async (response) => {
            if (response.length > 0) {
              // Si las credenciales son correctas, guardar la sesión en el Storage
              await this.storage.set('isAuthenticated', true);
              await this.storage.set('username', this.username);
              this.router.navigate(['/home']);
              // Limpiar mensajes de error
              this.errorMessage = '';

              // Navegar a la página de inicio
              let navigationExtras: NavigationExtras = {
                state: { username: this.username }
              };
              this.router.navigate(['/home'], navigationExtras);
            } else {
              // Si las credenciales son incorrectas, mostrar un mensaje de error
              this.errorMessage = 'Correo, nombre de usuario o contraseña incorrectos.';
            }
          },
          error: () => {
            // Si hay un error en la solicitud HTTP, mostrar un mensaje de error genérico
            this.errorMessage = 'Error al conectar con el servidor. Inténtalo de nuevo.';
          }
        });
    } else {
      // Si los campos están vacíos, mostrar un mensaje de error
      this.errorMessage = 'Por favor, ingrese todos los campos.';
    }
  }

  // Función para manejar el envío del formulario de recuperación de contraseña
  onSubmit() {
    if (this.email) {
      alert('Instrucciones enviadas para recuperar tu contraseña.');
      this.dismissModal();  // Cerrar el modal
    } else {
      this.errorCorreo = 'Por favor ingresa un correo válido.';
    }
  }

  // Función para cerrar el modal de recuperación de contraseña
  async dismissModal() {
    console.log('Modal cerrado');
  }

  // Función para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';  // Cambiar a tipo texto para mostrar la contraseña
      this.passwordIcon = 'eye';   // Cambiar el ícono a "mostrar"
    } else {
      this.passwordType = 'password';  // Cambiar a tipo password para ocultar la contraseña
      this.passwordIcon = 'eye-off';   // Cambiar el ícono a "ocultar"
    }
  }
}
