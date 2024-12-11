import { Component, OnInit } from '@angular/core';
import { PedidoServiceService } from '../pedidos/pedidos-service.service';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Estado } from '../pedidos/model/estado.model';

@Component({
  selector: 'app-transporte',
  templateUrl: './transporte.page.html',
  styleUrls: ['./transporte.page.scss'],
})
export class TransportePage implements OnInit {
  pedidos: any[] = []; // Lista de pedidos cargados desde el servicio
  estados: Estado[] = []; // Lista de estados cargados desde el servicio

  constructor(private pedidoService: PedidoServiceService) {}

  ngOnInit() {
    this.cargarTodosLosPedidos();
    this.cargarEstados();
    this.configurarNotificaciones();
  }

  /**
   * Carga los pedidos desde el servicio
   */
  cargarTodosLosPedidos() {
    this.pedidoService.getPedidos().subscribe((pedidos) => {
      this.pedidos = pedidos; // Carga los pedidos tal cual desde el servicio
    });
  }

  /**
   * Carga los estados desde el servicio
   */
  cargarEstados() {
    this.pedidoService.getEstados().subscribe((estados) => {
      this.estados = estados; // Carga los estados desde el servicio
    });
  }

  /**
   * Obtiene el estado completo para un pedido dado
   * @param estadoId ID del estado asociado al pedido
   * @returns Objeto de estado completo o un estado por defecto
   */
  obtenerEstado(estadoId: number): Estado {
    return (
      this.estados.find((estado) => estado.id === estadoId) || {
        id: 0,
        nombre: 'Desconocido',
        color: 'medium',
      }
    );
  }

  /**
   * Configuración de notificaciones para nuevos pedidos
   */
  async configurarNotificaciones() {
    const permiso = await LocalNotifications.requestPermissions();
    if (permiso.display === 'granted') {
      LocalNotifications.addListener('localNotificationReceived', (notification) => {
        alert('Nuevo pedido recibido: ' + notification.title);
      });
    }
  }

  /**
   * Envía una notificación cuando llega un nuevo pedido
   * @param pedido Pedido que generará la notificación
   */
  async notificarNuevoPedido(pedido: any) {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Nuevo Pedido',
          body: `Pedido #${pedido.id} ha sido agregado.`,
          id: pedido.id,
          schedule: { at: new Date(Date.now() + 1000) },
          sound: 'default',
        },
      ],
    });
  }
  /**
 * Cambiar el estado de un pedido.
 * 
 * @param pedidoId {number} - El ID del pedido.
 * @param estadoId {number} - El ID del nuevo estado.
 */
cambiarEstado(pedidoId: number, estadoId: number) {
  this.pedidoService.updateEstadoPedido(pedidoId, estadoId).subscribe(() => {
    console.log(`Pedido ${pedidoId} actualizado a estado ${estadoId}`);
    // Refrescar la lista de pedidos para reflejar los cambios
    this.cargarTodosLosPedidos();
  });
}

}
