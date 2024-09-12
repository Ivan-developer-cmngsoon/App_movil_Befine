import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'; // controlador de modal

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  showWarningMessage: boolean = false; // Variable para controlar la visualización del mensaje de números
  showPaymentWarning: boolean = false; // Variable para controlar la visualización del mensaje de medio de pago

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  // Método para verificar si solo se están ingresando números
  validateNumbers(event: any) {
    const value = event.target.value;
    // Si el valor contiene algo que no sea un número, muestra el mensaje
    if (isNaN(Number(value))) {
      this.showWarningMessage = true;
    } else {
      this.showWarningMessage = false;
    }
  }

  // Método para verificar si el medio de pago es "Tarjeta" o "Efectivo"
  validatePaymentMethod(event: any) {
    const value = event.target.value.toLowerCase();
    // Si el valor no es "tarjeta" ni "efectivo", muestra el mensaje
    if (value !== 'tarjeta' && value !== 'efectivo') {
      this.showPaymentWarning = true;
    } else {
      this.showPaymentWarning = false;
    }
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }
}
