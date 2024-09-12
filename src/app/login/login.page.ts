import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username: string = '';
  password: string = '';
  email: string = ''; // Almacena el valor del correo electrónico
  errorMessage: string = '';  // Aquí almacenaremos el mensaje de error
  errorCorreo: string = '';
  recoveryEmail: string = '';  // Para capturar el email de recuperación

  constructor(private router: Router, private modalController: ModalController) {}

  ngOnInit() {}
  
  login() {
    // Validar que la contraseña tenga al menos 4 números, 3 letras y 1 mayúscula
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[0-9]).{7,}$/;

    if (passwordRegex.test(this.password)) {
      // Limpiar el mensaje de error al iniciar sesión correctamente
      this.errorMessage = '';  
      // Redirigir a la página Home y pasar el nombre de usuario
      this.router.navigate(['/home'], {
        state: { username: this.username } // Pasar el nombre de usuario
      });
    } else {
      // Si la contraseña es incorrecta, mostrar un mensaje de error debajo del campo de contraseña
      this.errorMessage = 'La contraseña debe tener al menos 4 números, 3 letras y 1 mayúscula.';
    }
  }
  
  async dismissModal() {
    await this.modalController.dismiss();
  }
   // Mostrar el modal de recuperación de contraseña

  // Función que se ejecuta cuando se envía el formulario
  onSubmit() {
    // Validar que el correo electrónico esté en el formato correcto
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  
    if (emailRegex.test(this.email)) {
      // Limpiar el mensaje de error al enviar correctamente el correo de recuperación
      this.errorCorreo = '';  
      // Mostrar mensaje de éxito
      alert('Instrucciones enviadas. Ahora serás redirigido al login.');
  
      // Cierra el modal
      this.dismissModal();
  
      // Redirige al login
      this.router.navigate(['/login']);
    } else {
      // Si el correo es incorrecto, mostrar un mensaje de error debajo del campo de correo
      this.errorCorreo = 'Por favor, ingresa una dirección de correo electrónico válida. El formato debe ser similar a: TuCorreo@gmail.com';
    }
  }

  
}
