import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoServiceService } from '../pedidos-service.service';
import { ClPedido } from '../model/ClPedido';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-agregar-pedido',
  templateUrl: './agregar-pedido.page.html',
  styleUrls: ['./agregar-pedido.page.scss'],
})
export class AgregarPedidoPage implements OnInit {

  pedidoForm!: FormGroup;  // Formulario reactivo

  constructor(
    private formBuilder: FormBuilder,
    private pedidoService: PedidoServiceService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    // Inicializamos el formulario reactivo
    this.pedidoForm = this.formBuilder.group({
      nombre_cliente: ['', Validators.required],
      direccion: ['', Validators.required],
      detalle_pedido: ['', Validators.required],
      total_a_pagar: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],  // Validación para números
      horario_entrega: ['', Validators.required],
      telefono: ['', Validators.required],
      medio_pago: ['', Validators.required]
    });
  }

  // Método para enviar el formulario de pedido
  onFormSubmit() {
    if (this.pedidoForm.valid) {
      const nuevoPedido: ClPedido = new ClPedido(this.pedidoForm.value);
      
      // Llamada al servicio para agregar el pedido
      this.pedidoService.addPedidos(nuevoPedido).subscribe(response => {
        console.log('Pedido enviado correctamente:', response);
        this.pedidoForm.reset();  // Reiniciar el formulario tras el envío
        this.dismissModal();  // Cerrar el modal tras el envío
      }, error => {
        console.error('Error al enviar el pedido:', error);
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  // Método para cerrar el modal
  async dismissModal() {
    await this.modalController.dismiss();
  }
}
