import { Component, OnInit } from '@angular/core';
import { PedidoServiceService } from '../pedidos-service.service'; // Importa el servicio de pedidos
import { ClPedido } from '../model/ClPedido'; // Importa el modelo de pedidos
import { NavController, AlertController } from '@ionic/angular';  // Importa NavController para la navegación y AlertController para las alertas

@Component({
  selector: 'app-mostrar-pedidos',
  templateUrl: './mostrar-pedidos.page.html',
  styleUrls: ['./mostrar-pedidos.page.scss'],
})
export class MostrarPedidosPage implements OnInit {

  pedidos: ClPedido[] = []; // Variable para almacenar los pedidos
  errorMessage: string | null = null; // Variable para manejar errores

  // Agregar NavController y AlertController al constructor
  constructor(
    private pedidoService: PedidoServiceService, 
    private navCtrl: NavController,
    private alertController: AlertController  // Para mostrar alertas
  ) {}

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

  // Método para redirigir a la página de modificar pedido
  modifyPedido(id: string) {
    this.navCtrl.navigateForward(`/modificar-pedido/${id}`);  // Redirigir con el ID del pedido
  }

  // Método para eliminar un pedido
  async deletePedido(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este pedido?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            // Llamar al servicio para eliminar el pedido
            this.pedidoService.deletePedido(id).subscribe({
              next: () => {
                console.log('Pedido eliminado correctamente.');
                this.showPedidos(); // Volver a cargar la lista de pedidos
              },
              error: (error: any) => {
                console.error('Error al eliminar el pedido:', error);
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
