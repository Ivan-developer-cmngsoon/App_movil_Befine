import { Component, OnInit } from '@angular/core';
import { PedidoServiceService } from '../pedidos/pedidos-service.service';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-transporte',
  templateUrl: './transporte.page.html',
  styleUrls: ['./transporte.page.scss'],
})
export class TransportePage implements OnInit {
  pedidos: any[] = [];

  constructor(private pedidoService: PedidoServiceService) {}

  ngOnInit() {
    this.cargarTodosLosPedidos();
    this.configurarNotificaciones();
  }

  // Método para cargar todos los pedidos desde el servicio
  cargarTodosLosPedidos() {
    this.pedidoService.getPedidos().subscribe((pedidos) => {
      this.pedidos = pedidos;
    });
  }

  // Configuración de notificaciones para nuevos pedidos
  async configurarNotificaciones() {
    const permiso = await LocalNotifications.requestPermissions();
    if (permiso.display === 'granted') {
      LocalNotifications.addListener('localNotificationReceived', (notification) => {
        alert('Nuevo pedido recibido: ' + notification.title);
      });
    }
  }

  // Método para enviar una notificación cuando llega un nuevo pedido
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
}

