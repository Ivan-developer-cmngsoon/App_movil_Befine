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
  isModalOpen = false;  // Controlar la visibilidad del modal

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
      telefono: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      medio_pago: ['', [Validators.required, Validators.pattern('^(tarjeta|efectivo)$')]],
    });
  }

  // Método para enviar el formulario de pedido
  onFormSubmit() {
    if (this.pedidoForm.valid) {
      const formData = this.pedidoForm.value;
      const nuevoPedidoData = formData;
      const nuevoPedido: ClPedido = new ClPedido(nuevoPedidoData);  // Creamos un nuevo pedido
    
      this.pedidoService.addPedidos(nuevoPedido).subscribe({
        next: (response) => {
          console.log('Pedido enviado correctamente:', response);
          this.pedidoForm.reset();  // Reiniciar el formulario tras el envío
          this.openModal();  // Abrir el modal tras el envío
        },
        error: (error) => {
          console.error('Error al enviar el pedido:', error);
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  // Método para abrir el modal
  openModal() {
    this.isModalOpen = true;
  }

  // Método para cerrar el modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Método para manejar el cierre del modal
  onModalDismiss() {
    this.isModalOpen = false;  // Asegurarse de que el modal esté cerrado
  }

  // Método para verificar si el campo 'total_a_pagar' tiene un error
  isTotalPagarInvalid(): boolean {
    const control = this.pedidoForm.get('total_a_pagar');
    return control ? control.invalid && control.touched : false;  // Verifica si el control existe
  }
}
