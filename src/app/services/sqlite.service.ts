import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {

  private dbInstance: SQLiteObject | null = null;

  constructor(private sqlite: SQLite) {}

  // Método para inicializar la base de datos SQLite
  async initializeDatabase(): Promise<void> {
    try {
      this.dbInstance = await this.sqlite.create({
        name: 'befine.db',  // Nombre de tu base de datos
        location: 'default'
      });

      console.log('Base de datos creada/inicializada');
      await this.createTables();
    } catch (error) {
      console.error('Error inicializando la base de datos SQLite:', error);
    }
  }

  // Método para crear las tablas si no existen
  async createTables(): Promise<void> {
    if (!this.dbInstance) return;

    try {
      const sql = `
        CREATE TABLE IF NOT EXISTS pedidos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre_cliente TEXT,
          direccion TEXT,
          detalle_pedido TEXT,
          total_a_pagar REAL,
          horario_entrega TEXT,
          telefono TEXT,
          medio_pago TEXT,
          is_synced INTEGER DEFAULT 0  -- Añadimos esta columna para gestionar la sincronización (0 no sincronizado, 1 sincronizado)
        );
      `;
      await this.dbInstance.executeSql(sql, []);
      console.log('Tabla pedidos creada correctamente');
    } catch (error) {
      console.error('Error al crear la tabla pedidos:', error);
    }
  }

  // Método para agregar un pedido
  async addPedido(pedido: any): Promise<void> {
    if (!this.dbInstance) return;

    try {
      const sql = `INSERT INTO pedidos (nombre_cliente, direccion, detalle_pedido, total_a_pagar, horario_entrega, telefono, medio_pago, is_synced) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, 0)`;  // El valor inicial de is_synced será 0 (no sincronizado)
      const values = [
        pedido.nombre_cliente,
        pedido.direccion,
        pedido.detalle_pedido,
        pedido.total_a_pagar,
        pedido.horario_entrega,
        pedido.telefono,
        pedido.medio_pago
      ];
      await this.dbInstance.executeSql(sql, values);
      console.log('Pedido agregado correctamente (no sincronizado)');
    } catch (error) {
      console.error('Error al agregar el pedido:', error);
    }
  }

  // Método para obtener todos los pedidos (sin filtrar por sincronización)
  async getPedidos(): Promise<any[]> {
    if (!this.dbInstance) return [];

    try {
      const res = await this.dbInstance.executeSql('SELECT * FROM pedidos', []);
      const pedidos = [];
      for (let i = 0; i < res.rows.length; i++) {
        pedidos.push(res.rows.item(i));
      }
      return pedidos;
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
      return [];
    }
  }

  // Método para obtener pedidos no sincronizados
  async getNonSyncedPedidos(): Promise<any[]> {
    if (!this.dbInstance) return [];

    try {
      const res = await this.dbInstance.executeSql('SELECT * FROM pedidos WHERE is_synced = 0', []);  // Solo pedidos no sincronizados
      const pedidos = [];
      for (let i = 0; i < res.rows.length; i++) {
        pedidos.push(res.rows.item(i));
      }
      return pedidos;
    } catch (error) {
      console.error('Error al obtener los pedidos no sincronizados:', error);
      return [];
    }
  }

  // Método para actualizar el estado de sincronización de un pedido
  async markAsSynced(id: number): Promise<void> {
    if (!this.dbInstance) return;

    try {
      const sql = 'UPDATE pedidos SET is_synced = 1 WHERE id = ?';  // Marcar el pedido como sincronizado
      await this.dbInstance.executeSql(sql, [id]);
      console.log(`Pedido con ID ${id} marcado como sincronizado`);
    } catch (error) {
      console.error(`Error al marcar el pedido con ID ${id} como sincronizado:`, error);
    }
  }

  // Método para eliminar un pedido por ID
  async deletePedido(id: number): Promise<void> {
    if (!this.dbInstance) return;

    try {
      const sql = 'DELETE FROM pedidos WHERE id = ?';
      await this.dbInstance.executeSql(sql, [id]);
      console.log(`Pedido con ID ${id} eliminado correctamente`);
    } catch (error) {
      console.error(`Error al eliminar el pedido con ID ${id}:`, error);
    }
  }
}
