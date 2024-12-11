// pedido-sync.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoSyncService {
  private apiUrl = 'http://localhost:3000/pedidos'; // URL de tu JSON server

  constructor(private http: HttpClient, private sqliteService: SqliteService) {}

  // Método para sincronizar pedidos
  async sincronizarPedidos() {
    if (navigator.onLine) { // Verifica si hay conexión
      try {
        const pedidosNoSincronizados = await this.sqliteService.getNonSyncedPedidos();
        
        for (const pedido of pedidosNoSincronizados) {
          try {
            // Enviar el pedido al JSON server
            const response = await this.http.post(this.apiUrl, pedido).toPromise();
            
            // Si la sincronización es exitosa, marca el pedido como sincronizado
            if (response) {
              await this.sqliteService.markAsSynced(pedido.id);
              console.log(`Pedido con ID ${pedido.id} sincronizado exitosamente`);
            }
          } catch (error) {
            console.error(`Error al sincronizar el pedido con ID ${pedido.id}:`, error);
          }
        }
      } catch (error) {
        console.error('Error obteniendo pedidos no sincronizados:', error);
      }
    } else {
      console.log('Sin conexión a internet. Los pedidos se guardarán localmente.');
    }
  }
}
