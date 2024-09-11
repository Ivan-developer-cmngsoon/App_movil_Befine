import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RecuperarContrasenaComponent } from '../recuperar-contrasena/recuperar-contrasena.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  username: string = '';
  password: string = '';
  errorMessage: string = '';  // Aquí almacenaremos el mensaje de error

  constructor(private router: Router, private modalController: ModalController) {}

  login() {
    // Validar que la contraseña tenga al menos 4 números, 3 letras y 1 mayúscula
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;

    if (passwordRegex.test(this.password)) {
      // Limpiar el mensaje de error al iniciar sesión correctamente
      this.errorMessage = '';  
      // Redirigir a la página Home
      this.router.navigate(['/home']);
    } else {
      // Si la contraseña es incorrecta, mostrar un mensaje de error debajo del campo de contraseña
      this.errorMessage = 'La contraseña debe tener al menos 4 números, 3 letras y 1 mayúscula.';
    }
  }
}
