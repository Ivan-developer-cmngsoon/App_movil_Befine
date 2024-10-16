import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';  // Importar NavController

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

  // Método para navegar a la página de agregar usuario
  addUsuario() {
    this.navCtrl.navigateForward('/agregar-usuario');
  }
  
  // Método para navegar a la página de mostrar todos los usuarios
  showUsuarios() {
    this.navCtrl.navigateForward('/listar-usuarios');
  }

  // Método para navegar a la página de eliminar usuario
  deleteUsuario() {
    this.navCtrl.navigateForward('/eliminar-usuario');
  }
}
