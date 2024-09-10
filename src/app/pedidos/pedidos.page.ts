import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'; // Importamos el controlador del modal

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  constructor(private modalController: ModalController) { } // Inyectamos el controlador del modal

  ngOnInit() { }

  /**
   * Método para cerrar el modal
   * Este método se ejecuta cuando el usuario hace clic en el botón "Enviar" dentro del modal.
   */
  async dismissModal() {
    await this.modalController.dismiss(); // Cierra el modal
  }
}
