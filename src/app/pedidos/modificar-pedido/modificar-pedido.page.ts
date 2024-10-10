import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoServiceService } from '../pedidos-service.service';
import { ClPedido } from '../model/ClPedido';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-modificar-pedido',
  templateUrl: './modificar-pedido.page.html',
  styleUrls: ['./modificar-pedido.page.scss'],
})
export class ModificarPedidoPage implements OnInit {
  pedido: ClPedido | null = null;  // Pedido que vamos a modificar

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoServiceService,
    private navCtrl: NavController  // Inyectamos NavController
  ) {}

  ngOnInit() {
    const pedidoId = this.route.snapshot.paramMap.get('id');  // Ya es string
    if (pedidoId) {
      this.loadPedido(pedidoId);  // Corregimos para que use un string como ID
    }
  }

  // Cargar los detalles del pedido
  loadPedido(id: string) {  // Usamos string para el ID
    this.pedidoService.getPedido(id).subscribe({
      next: (pedido) => {
        this.pedido = pedido;
      },
      error: (error) => {
        console.error('Error al cargar el pedido:', error);
      }
    });
  }

  // Función para guardar los cambios en el pedido
  guardarCambios() {
    if (this.pedido && this.pedido.id) {  // Verificamos que el pedido y el id estén definidos
      const id = this.pedido.id.toString();  // Convertimos a string si fuera necesario
      this.pedidoService.updatePedido(id, this.pedido).subscribe({
        next: (response) => {
          console.log('Pedido modificado correctamente:', response);
          // Redirigir a la página de mostrar pedidos después de modificar
          this.navCtrl.navigateBack('/mostrar-pedidos');  // Aquí redirigimos
        },
        error: (error) => {
          console.error('Error al modificar el pedido:', error);
        }
      });
    } else {
      console.error('El ID del pedido no está definido.');
    }
  }

}
