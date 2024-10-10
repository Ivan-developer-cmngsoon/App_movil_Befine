import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';  // Importar NavController

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

  // Método para navegar a la página de agregar pedido
  addPedido() {
    this.navCtrl.navigateForward('/agregar-pedido');
  }
  
  // Método para navegar a la página de mostrar todos los pedidos
  showPedidos() {
    this.navCtrl.navigateForward('/mostrar-pedidos');
  }

  // Método para navegar a la página de eliminar pedido
  deletePedido() {
    this.navCtrl.navigateForward('/eliminar-pedido');
  }
}
