import { Injectable } from '@angular/core';
import { ClUsuario } from './model/ClUsuario';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';


const apiUrl = "http://192.168.1.88:3000/usuario";  // URL de la API para usuarios
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

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

  
  // Método para agregar un nuevo pedido
  addUsuario(usuario: ClUsuario): Observable<ClUsuario> {
    // Generar un ID único si no tiene uno
    if (!usuario.id) {
      usuario.id = this.generateUniqueId();
    }

    console.log("Enviando Pedido con ID generado:", usuario);  // Log del pedido con ID
    return this.http.post<ClUsuario>(apiUrl, usuario, httpOptions)
      .pipe(
        tap((nuevoPedido: ClUsuario) => console.log(`Pedido agregado: ${nuevoPedido}`)),
        catchError(this.handleError<ClUsuario>('addPedidos'))  // Manejar error
      );
  }
  

  // Obtener todos los usuarios
  getUsuarios(): Observable<ClUsuario[]> {
    console.log("Obteniendo usuarios...");
    return this.http.get<ClUsuario[]>(apiUrl)
      .pipe(
        tap(usuarios => console.log('Usuarios obtenidos:', usuarios)),
        catchError(this.handleError<ClUsuario[]>('getUsuarios', []))
      );
  }

  // Obtener un usuario por ID
  getUsuario(id: string): Observable<ClUsuario> {
    console.log(`Obteniendo usuario con ID: ${id}`);
    return this.http.get<ClUsuario>(`${apiUrl}/${id}`)
      .pipe(
        tap(usuario => console.log(`Usuario obtenido id=${id}`, usuario)),
        catchError(this.handleError<ClUsuario>(`getUsuario id=${id}`))
      );
  }

  // Eliminar un usuario por ID
  deleteUsuario(id: string): Observable<any> {
    const url = `${apiUrl}/${id.toString()}`;  // Convertimos el id a string para la URL
    return this.http.delete(url, httpOptions).pipe(
      tap(_ => console.log(`Usuario eliminado id=${id}`)),
      catchError(this.handleError<any>('deleteUsuario'))
    );
  }

  // Actualizar un usuario por ID
  updateUsuario(id: string, usuario: ClUsuario): Observable<ClUsuario> {
    console.log(`Actualizando usuario con ID: ${id}`);
    return this.http.put<ClUsuario>(`${apiUrl}/${id}`, usuario, httpOptions)
      .pipe(
        tap(_ => console.log(`Usuario actualizado id=${id}`)),
        catchError(this.handleError<any>('updateUsuario'))
      );
  }
}
