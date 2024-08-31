import { Injectable } from '@angular/core';
import { Producto } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productos: Producto[] = [];
  private nextId = 1;

  constructor() {}

  // Obtener la lista de productos
  getProducts(): Producto[] {
    return [...this.productos];
  }

  // Añadir un nuevo producto
  addProduct(producto: Producto) {
    producto.id = this.nextId++;
    this.productos.push(producto);
  }

  // Actualizar un producto existente
  updateProduct(updatedProduct: Producto) {
    const index = this.productos.findIndex(producto => producto.id === updatedProduct.id);
    if (index > -1) {
      this.productos[index] = updatedProduct;
    }
  }

  // Eliminar un producto por su ID
  deleteProduct(id: number) {
    this.productos = this.productos.filter(producto => producto.id !== id);
  }
}
