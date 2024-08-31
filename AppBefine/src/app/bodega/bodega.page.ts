import { Component } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/product.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.page.html',
  styleUrls: ['./bodega.page.scss'],
})
export class BodegaPage {
  productos: Producto[] = [];
  newProducto: Producto = { id: 0, nombre: '', cantidad: 0, descripcion: '' };

  constructor(private productoService: ProductoService, private alertController: AlertController) {}

  ionViewWillEnter() {
    this.productos = this.productoService.getProducts();
  }

  addProduct() {
    this.productoService.addProduct(this.newProducto);
    this.newProducto = { id: 0, nombre: '', cantidad: 0, descripcion: '' };
    this.productos = this.productoService.getProducts();
  }

  async editProduct(producto: Producto) {
    const alert = await this.alertController.create({
      header: 'Modificar Producto',
      inputs: [
        { name: 'nombre', type: 'text', placeholder: 'Nombre', value: producto.nombre },
        { name: 'cantidad', type: 'number', placeholder: 'Cantidad', value: producto.cantidad.toString() },
        { name: 'descripcion', type: 'text', placeholder: 'Descripción', value: producto.descripcion }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            const updatedProduct = { ...producto, ...data, cantidad: +data.cantidad };
            this.productoService.updateProduct(updatedProduct);
            this.productos = this.productoService.getProducts();
          }
        }
      ]
    });

    await alert.present();
  }

  deleteProduct(id: number) {
    this.productoService.deleteProduct(id);
    this.productos = this.productoService.getProducts();
  }
}
