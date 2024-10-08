import { Component, OnInit } from '@angular/core';
import { PedidoServiceService } from '../pedidos-service.service'; // Importa el servicio de pedidos
import { ClPedido } from '../model/ClPedido'; // Importa el modelo de pedidos

@Component({
  selector: 'app-mostrar-pedidos',
  templateUrl: './mostrar-pedidos.page.html',
  styleUrls: ['./mostrar-pedidos.page.scss'],
})
export class MostrarPedidosPage implements OnInit {

  pedidos: ClPedido[] = []; // Variable para almacenar los pedidos
  errorMessage: string | null = null; // Variable para manejar errores

  constructor(private pedidoService: PedidoServiceService) {}

  ngOnInit() {
    // Cargar los pedidos cuando se inicialice la página
    this.showPedidos();
  }

  // Método para obtener y mostrar los pedidos
  showPedidos() {
    this.pedidoService.getPedidos().subscribe({
      next: (pedidos: ClPedido[]) => {
        this.pedidos = pedidos;
        this.errorMessage = null; // Limpiar mensaje de error si la carga es exitosa
        console.log('Pedidos cargados:', pedidos);
      },
      error: (error: any) => {
        this.errorMessage = 'Error al cargar los pedidos.';
        console.error('Error al cargar los pedidos:', error);
      },
      complete: () => {
        console.log('Carga de pedidos completa');
      }
    });
  }
}
