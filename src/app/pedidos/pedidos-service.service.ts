import { Injectable } from '@angular/core';
import { ClPedido } from './model/ClPedido';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const apiUrl = "http://localhost:3000/pedidos";  // API JSON Server en puerto 3000
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class PedidoServiceService {
  constructor(private http: HttpClient) { }

  // Manejo de errores para todas las solicitudes HTTP
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);  // Log del error
      return of(result as T);
    };
  }

  // Método para agregar un nuevo pedido
  addPedidos(pedido: ClPedido): Observable<ClPedido> {
    console.log("Enviando Pedido :", pedido);  // Log del pedido que se enviará
    return this.http.post<ClPedido>(apiUrl, pedido, httpOptions)
      .pipe(
        tap((nuevoPedido: ClPedido) => console.log(`Pedido agregado: ${nuevoPedido}`)),
        catchError(this.handleError<ClPedido>('addPedidos'))  // Manejar error
      );
  }

  // Obtener todos los pedidos
  getPedidos(): Observable<ClPedido[]> {
    console.log("Obteniendo pedidos...");
    return this.http.get<ClPedido[]>(apiUrl)
      .pipe(
        tap(pedidos => console.log('Pedidos obtenidos:', pedidos)),
        catchError(this.handleError<ClPedido[]>('getPedidos', []))
      );
  }

  // Obtener un pedido por ID
  getPedido(id: string): Observable<ClPedido> {
    console.log(`Obteniendo pedido con ID: ${id}`);
    return this.http.get<ClPedido>(`${apiUrl}/${id}`)
      .pipe(
        tap(pedido => console.log(`Pedido obtenido id=${id}`, pedido)),
        catchError(this.handleError<ClPedido>(`getPedido id=${id}`))
      );
  }

  // Eliminar un pedido por ID
  deletePedido(id: String): Observable<ClPedido> {
    console.log(`Eliminando pedido con ID: ${id}`);
    return this.http.delete<ClPedido>(`${apiUrl}/${id}`, httpOptions)
      .pipe(
        tap(_ => console.log(`Pedido eliminado id=${id}`)),
        catchError(this.handleError<ClPedido>('deletePedido'))
      );
  }

  // Actualizar un pedido por ID
  updatePedido(id: string, pedido: ClPedido): Observable<ClPedido> {
    console.log(`Actualizando pedido con ID: ${id}`);
    return this.http.put<ClPedido>(`${apiUrl}/${id}`, pedido, httpOptions)
      .pipe(
        tap(_ => console.log(`Pedido actualizado id=${id}`)),
        catchError(this.handleError<any>('updatePedido'))
      );
  }
}
