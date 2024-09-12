import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

// Definimos la interfaz Product
interface Product {
  name: string;
  quantity: number;
  description: string;
}

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.page.html',
  styleUrls: ['./bodega.page.scss'],
})
export class BodegaPage {

  // Array de productos, cada uno siguiendo la interfaz Product
  products: Product[] = [
    { name: 'Agua 20L', quantity: 10, description: 'Botella de agua de 20 litros' },
    { name: 'Envases', quantity: 50, description: 'Envases vacíos para rellenar' }
  ];

  constructor(private alertController: AlertController) {}

  // Función para agregar un producto
  async addProduct() {
    const alert = await this.alertController.create({
      header: 'Agregar Producto',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Nombre del producto' },
        { name: 'quantity', type: 'number', placeholder: 'Cantidad' },
        { name: 'description', type: 'text', placeholder: 'Descripción' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Agregar',
          handler: (data) => {
            // Añadimos el nuevo producto al array de productos
            this.products.push({
              name: data.name,
              quantity: +data.quantity,  // Convertimos a número
              description: data.description
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // Función para editar un producto
  async editProduct(product: Product) {
    const alert = await this.alertController.create({
      header: 'Editar Producto',
      inputs: [
        { name: 'name', type: 'text', value: product.name, placeholder: 'Nombre del producto' },
        { name: 'quantity', type: 'number', value: product.quantity, placeholder: 'Cantidad' },
        { name: 'description', type: 'text', value: product.description, placeholder: 'Descripción' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            // Actualizamos los datos del producto editado
            product.name = data.name;
            product.quantity = +data.quantity;
            product.description = data.description;
          }
        }
      ]
    });

    await alert.present();
  }

  // Función para eliminar un producto
  async deleteProduct(product: Product) {
    const alert = await this.alertController.create({
      header: 'Eliminar Producto',
      message: `¿Seguro que deseas eliminar ${product.name}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            // Filtramos el array de productos para eliminar el seleccionado
            this.products = this.products.filter(p => p !== product);
          }
        }
      ]
    });

    await alert.present();
  }
}
