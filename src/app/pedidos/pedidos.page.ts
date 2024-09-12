import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as $ from 'jquery';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    // Asegurarse de que el DOM esté listo usando la función correcta en jQuery
    $(function() {
      // Validación simple para "Total a pagar" (solo números)
      $('#total-pagar').on('input', function() {
        const value = $(this).val() as string;
        if (isNaN(Number(value))) {
          $(this).css('border', '1px solid red');
          $('#warning-total').show();  // Mostrar mensaje de advertencia
        } else {
          $(this).css('border', '');
          $('#warning-total').hide();  // Ocultar mensaje de advertencia
        }
      });

      // Validación para "Medio de pago" (debe ser "tarjeta" o "efectivo")
      $('#medio-pago').on('input', function() {
        const value = $(this).val()?.toString().toLowerCase() || '';
        if (value !== 'tarjeta' && value !== 'efectivo') {
          $(this).css('border', '1px solid red');
          $('#warning-pago').show();  // Mostrar advertencia
        } else {
          $(this).css('border', '');
          $('#warning-pago').hide();  // Ocultar advertencia
        }
      });
    });
  }
    // pequeña modificacion para nuevo merge


  // Método para cerrar el modal
  async dismissModal() {
    await this.modalController.dismiss();
  }
}