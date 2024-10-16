import { Injectable } from '@angular/core';
import { ClPedido } from './model/ClPedido';
import { Observable, of, from } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SqliteService } from './../services/sqlite.service';


const apiUrl = "http://localhost:3000/pedidos";  // API JSON Server en puerto 3000
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class PedidoServiceService {
  constructor(private http: HttpClient, private sqliteService: SqliteService) { }

  // Método para generar un ID único
  private generateUniqueId(): string {
    return Date.now().toString() + Math.random().toString(36).substring(2, 9);
  }

  // Manejo de errores para todas las solicitudes HTTP
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // Método para agregar un nuevo pedido (lo agrega a SQLite primero y luego lo intenta sincronizar con JSON-server)
  addPedidos(pedido: ClPedido): Observable<ClPedido> {
    if (!pedido.id) {
      pedido.id = this.generateUniqueId();  // Generar un ID único
    }

    console.log("Enviando Pedido con ID generado:", pedido);

    // Agregamos primero el pedido en SQLite
    return from(this.sqliteService.addPedido(pedido)).pipe(
      switchMap(() => {
        // Intentamos sincronizar con JSON-server
        return this.syncPendingPedidos();
      }),
      tap(() => console.log('Pedido agregado y sincronizado correctamente')),
      catchError(this.handleError<ClPedido>('addPedidos'))
    );
  }

  // Obtener todos los pedidos desde el servidor JSON-server
  getPedidos(): Observable<ClPedido[]> {
    console.log("Obteniendo pedidos desde JSON-server...");
    return this.http.get<ClPedido[]>(apiUrl)
      .pipe(
        tap(pedidos => console.log('Pedidos obtenidos desde JSON-server:', pedidos)),
        catchError(this.handleError<ClPedido[]>('getPedidos', []))
      );
  }

  // Obtener un pedido por ID desde JSON-server
  getPedido(id: string): Observable<ClPedido> {
    console.log(`Obteniendo pedido con ID: ${id} desde JSON-server`);
    return this.http.get<ClPedido>(`${apiUrl}/${id}`)
      .pipe(
        tap(pedido => console.log(`Pedido obtenido id=${id}`, pedido)),
        catchError(this.handleError<ClPedido>(`getPedido id=${id}`))
      );
  }

  // Eliminar un pedido por ID en el servidor JSON-server
  deletePedido(id: string): Observable<ClPedido> {
    console.log(`Eliminando pedido con ID: ${id} en JSON-server`);
    return this.http.delete<ClPedido>(`${apiUrl}/${id}`, httpOptions)
      .pipe(
        tap(_ => console.log(`Pedido eliminado id=${id}`)),
        catchError(this.handleError<ClPedido>('deletePedido'))
      );
  }

  // Actualizar un pedido por ID en JSON-server
  updatePedido(id: string, pedido: ClPedido): Observable<ClPedido> {
    console.log(`Actualizando pedido con ID: ${id} en JSON-server`);
    return this.http.put<ClPedido>(`${apiUrl}/${id}`, pedido, httpOptions)
      .pipe(
        tap(_ => console.log(`Pedido actualizado id=${id}`)),
        catchError(this.handleError<any>('updatePedido'))
      );
  }

  // Método para sincronizar los pedidos que no han sido sincronizados en SQLite
  syncPendingPedidos(): Observable<any> {
    console.log("Sincronizando pedidos pendientes con JSON-server...");

    // Obtenemos los pedidos no sincronizados desde SQLite
    return from(this.sqliteService.getNonSyncedPedidos()).pipe(
      switchMap(pedidosNoSincronizados => {
        const syncObservables = pedidosNoSincronizados.map(pedido => {
          return this.http.post<ClPedido>(apiUrl, pedido, httpOptions).pipe(
            tap(() => {
              // Marcamos el pedido como sincronizado en SQLite
              this.sqliteService.markAsSynced(pedido.id);
              console.log(`Pedido con ID ${pedido.id} sincronizado correctamente`);
            }),
            catchError(this.handleError<any>('syncPendingPedidos'))
          );
        });
        // Combinamos las solicitudes HTTP para ejecutarlas
        return syncObservables.length > 0 ? of(syncObservables) : of([]);
      })
    );
  }
}
