import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';  // Importar NavigationExtras para pasar datos a otras rutas
import { ModalController } from '@ionic/angular';  // Importar ModalController para manejar modales

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  // Variables para almacenar los datos ingresados por el usuario y manejar los mensajes de error
  username: string = '';  // Almacena el nombre de usuario ingresado
  password: string = '';  // Almacena la contraseña ingresada
  email: string = '';  // Almacena el correo electrónico ingresado para la recuperación
  errorMessage: string = '';  // Mensaje de error en caso de problemas con el login
  errorCorreo: string = '';  // Mensaje de error si el correo es inválido
  recoveryEmail: string = '';  // Almacena el correo para la recuperación de la contraseña

  constructor(private router: Router, private modalController: ModalController) {}

  ngOnInit() {}

  // Función que se ejecuta cuando el usuario hace clic en el botón de login
  login() {
    // Expresión regular para validar que la contraseña tenga al menos 4 números, 3 letras y 1 mayúscula
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[0-9]).{7,}$/;

    if (passwordRegex.test(this.password)) {
      // Si la contraseña es válida, limpiar cualquier mensaje de error previo
      this.errorMessage = '';  

      // Crear el objeto NavigationExtras para pasar el nombre de usuario a la siguiente página
      let navigationExtras: NavigationExtras = {
        state: { username: this.username }  // Asignar el valor de 'username' en el estado
      };

      // Navegar a la página de Home y pasar el estado con el nombre de usuario
      this.router.navigate(['/home'], navigationExtras);
    } else {
      // Si la contraseña no es válida, mostrar un mensaje de error debajo del campo de contraseña
      this.errorMessage = 'La contraseña debe tener al menos 4 números, 3 letras y 1 mayúscula.';
    }
  }

  // Función para cerrar el modal
  async dismissModal() {
    await this.modalController.dismiss();  // Cierra el modal actual
  }

  // Función que se ejecuta cuando el formulario de recuperación de contraseña es enviado
  onSubmit() {
    // Expresión regular para validar que el formato del correo electrónico sea correcto
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (emailRegex.test(this.email)) {
      // Si el correo electrónico es válido, limpiar cualquier mensaje de error previo
      this.errorCorreo = '';  

      // Mostrar un mensaje de éxito al usuario
      alert('Instrucciones enviadas. Ahora serás redirigido al login.');

      // Cierra el modal de recuperación de contraseña
      this.dismissModal();

      // Redirigir al usuario a la página de login
      this.router.navigate(['/login']);
    } else {
      // Si el correo electrónico no es válido, mostrar un mensaje de error debajo del campo de correo
      this.errorCorreo = 'Por favor, ingresa una dirección de correo electrónico válida. El formato debe ser similar a: TuCorreo@gmail.com';
    }
  }
}
