import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  
  constructor(private navCtrl: NavController) {}

  // Método para manejar el enrutamiento después de un clic en el botón de login
  onLogin() {
    // Redirige directamente a la página de inicio (home)
    this.navCtrl.navigateForward('/home');
  }
}
